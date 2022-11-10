const script = document.createElement('script');
script.setAttribute("type", "module");
//nonce="8IBTHwOdqNKAWeKl7plt8g=="
script.setAttribute("src", chrome.extension.getURL('processor.js'));
const head = document.head || document.getElementsByTagName("head")[0] || document.documentElement;
head.insertBefore(script, head.lastChild);