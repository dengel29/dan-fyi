---

title: Using Tencent's Text Censorship API
date: 2018-10-05 09:04 UTC
tags:
layout: article_layout
slug: wechat-censorship

---

# msgSecCheck

<p class="subtitle">A Guide on How to Use WeChat’s Text Censorship API</p>

##  Intro: What is this and why
Me and <a class="highlight" href="http://thegraceyang.com/" target="_blank">@yaycake</a> made a miniprogram. Because of our circumstances – hosting on a friends server and with our miniprogram registered under another friend’s ID (as foreign developers without a company) – we felt a responsibility to secure our miniprogram. <br>
Our use case: we created a gif search app. We don’t control the content, since it pulls content from the Giphy API, so decided to redirect search queries that were inharmonious, only triggering the search if it passed the censorship API’s check.<br>
Below is the bit of information we learned while implementing it

## Before you Get to the Censoring…

WeChat’s text censorship API is called `msgSecCheck`.

If you go right to the page for [msgSecCheck](https://developers.weixin.qq.com/miniprogram/dev/api/msgSecCheck.html) you’ll see you must include something called an `ACCESS_TOKEN` in the parameters:<br>
`https://api.weixin.qq.com/wxa/msg_sec_check?access_token=ACCESS_TOKEN`.

So let’s get that access token.

[msgSecCheck API docs](https://developers.weixin.qq.com/miniprogram/dev/api/msgSecCheck.html)

## Getting your Access Token
You need an access token to trigger the msgSecCheck, as well as trigger some of WeChat’s  other APIs. If you have a server set up and developer account on mp.weixin.qq.com already, proceed to #3

### 1) Get your app_id and app_secret
If you’re reading this, you probably already have a WeChat MP account. If you don’t, register for a WeChat account on mp.weixin.qq.com (please read [this exhaustive walkthrough that we didn’t write](insert-good-registration-walkthorugh-here) for more info on how to register). This is the Open Platform website, it’s basically your dashboard for managing an MP project, accomplishing critical tasks like adding developers, publishing new versions, and lots more.

For now, you just need to get your WeChat `app_id` and `app_secret` from 设置 > 开发设置. This is the same page where you can whitelist your server and other domains you make calls to from your MP (note: another section _or_ another article?)

### 2) Set up a server to request the access token
You also need a backend server to make this request, since Tencent doesn’t want you putting your `app_id`or `app_secret` in the front-end. They enforce this by disallowing any api calls to api.weixin.qq.com.   If you try to add it to your whitelisted domains you will get an error that’s further explained:

> 如填写了“api.weixin.qq.com”会出现上述错误提示。出于安全考虑，为避免开发者将AppSecret放置在小程序的前端代码内，平台禁止设置此域名。
>
> Translation: if you enter “api.weixin.qq.com” [in the whitelist] you’ll see the above message [that it cannot be used]. For the sake of safety and to prevent developers placing the AppSecret in the miniprogram front end code, the platform prohibits whitelisting this domain.
> [source](http://kf.qq.com/faq/1706236NjINj1706236VRZBR.html)

The action that triggers this request for an `access_token`  can happen on the front end, Tencent just doesn’t want you putting the `app_secret` in the front end.

### 3) Request the access token
[Link to the access token API docs](https://developers.weixin.qq.com/miniprogram/dev/api/token.html#%E8%8E%B7%E5%8F%96-accesstoken)

With everything in place you can make your request for the access token.

Make a `GET` request to the address below, keeping the `grant_type=client_credential` parameter the same, but replacing  `APPID` and `APPSECRET` with your own.

 `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=APPID&secret=APPSECRET`

The response object will look like this:

<pre>
  <code class="json">
{
  "access_token": "ACCESS_TOKEN",
  "expires_in": 7200
}
  </code>
</pre>

Now you can grab the very long access token and send it to your msgSecCheck API request. As for the expiration (7200 seconds = 120 minutes) you can do with that what you will. We suggest caching the access token and requesting it again after its expired, rather than requesting an access token for every msgSecCheck request.

## Make the msgSecCheck request
[Link to msgSecCheck docs](https://developers.weixin.qq.com/miniprogram/dev/api/msgSecCheck.html)

Finally, we’re checking if our content is risky!

To call the msgSecCheck API, you’ll pass the `access_token` as a parameter in the url, and the content you’re checking as the payload. Below is how we implemented this (our server was written in Ruby, and the calls using the RestClient gem):

<pre>
  <code class="rb">
def censor_check(token, query)

    # Check if query is already in cached list
    censored = @cacher.get_censored
    return 'Censored term' if censored.include?(query)

    # Set payload to json format
    params = { "content": query }.to_json

    # Call api
    raw_res = RestClient.post("https://api.weixin.qq.com/wxa/msg_sec_check?access_token=#{token}", params, content_type: 'application/json', accept: 'application/json')
    res = JSON.parse(raw_res)

    if res['errcode'] == 0
      # errcode 0 means the content has passed the security check
      puts 'Okey dokey'
      return query

    elsif res['errcode'] == 87_014
      # errcode 87014 means the content in the payload is 'risky'

      # Add query to list of censored queries
      @cacher.add_censored(query)
      return 'risky content'

    elsif res['errcode'] == 44_001 || res['errorcode'] == 44_004
      # errcode 4401 means token is empty
      puts 'possibly empty'
      return query

    elsif res['errcode'] == 42_001
      # errcode 42001 means token expired

    # clear cache, get a new one, try again
      @cacher.set(key: 'cached_token', value: '')
      # get_access_token is a separate function
    token = get_access_token
    # retry msgSecCheck with refreshed access token
      censor_check(token, query)
  end
  </code>
</pre>

The response codes only tell the following things – it’s up to you to implement the logic that follows receiving each type of response.


> 0 = content is fine
>
> 87014 = content does not pass the test
>
> 44001 = content is empty, there is no data in the payload
>
> 42001 = access token has expired and needs to be fetched again

In our case, when the content did not pass the test, we simply replaced the risky search query with something more innocuous. The caching logic is not imperative, but it increased our miniprogram’s performance so we recommend considering something similar.

And that’s pretty much it! Go forth and make some harmonious miniprograms!

