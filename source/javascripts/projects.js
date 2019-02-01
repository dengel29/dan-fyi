// projects.js

let detectUserAgent = function() {
  let ua = window.navigator.userAgent
  console.log(ua)
  if (ua.match(/Android/i)|| ua.match(/webOS/i) || ua.match(/iPhone/i) || ua.match(/iPad/i) || ua.match(/iPod/i) || ua.match(/BlackBerry/i) || ua.match(/Windows Phone/i)) {
    return "click"
  }
  else {
    return "mouseenter focus"
  }
}

let expandContent = function(e) {
  // console.log(e.target.parentNode.id)
  console.log(e.target)
  if ((e.target.parentNode.id) || (e.target.parentNode.parentNode.parentNode.id)) {

    let project = e.target.parentElement.parentNode.parentNode.id || e.target.parentElement.parentNode.id || e.target.parentNode.id
    let projEl = document.getElementById(project)
    projEl.children[1].classList.toggle('uncollapse')
  }

  // if e.target.parentNode.id ==
}

const projectsContainer = document.querySelector('.projects')
projectsContainer.addEventListener('click', expandContent)

// create the containing div for the tooltip
const container = document.createElement('div')

// create the simple label text
const label = document.createTextNode("Scan with WeChat to try!")
console.log(label)
// create the QR code image element
let stickerQR = new Image(150,150);
stickerQR.src = '../images/qr-wx-stickermachine.jpg';
stickerQR.setAttribute("style", "border-radius:5px")

container.appendChild(label)
container.insertBefore(stickerQR, label)


tippy('.tippy-qr', {
  content: container,
  hideOnClick: true,
  interactive: true,
  maxWidth:150,
  animation: "shift-toward",
  trigger: detectUserAgent(),
  placement: "right"
})
