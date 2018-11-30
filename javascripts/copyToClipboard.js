 // TODO

 // Listen for click, add element after clickable content to add the "copied successfully" message

 var clipboard = new ClipboardJS('.btn');
    clipboard.on('success', function(e) {
        console.log(e);
        document.elemeng
    });
    clipboard.on('error', function(e) {
        console.log(e);
    });
