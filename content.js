//import {browseUrl} from "./constants.js";
const jiraServer = 'https://{company}.jira.com';
const browseUrl = jiraServer+'/browse/';
const selectedParam = 'selectedIssue';

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        console.log("Message received->"+request.message);
        if (request.message === "copyText"){
            copyToTheClipboard(request.textToCopy);
            sendResponse({success:true})
        }else{
            sendResponse({success:false})
        }
    }
);


async function copyToTheClipboard(textToCopy){
    console.log("Copying text "+ textToCopy);
    let tmpEl;
    tmpEl = document.createElement("div");
    tmpEl.innerHTML = textToCopy;
    tmpEl.style.opacity = 0;
    tmpEl.style.position = "absolute";//container.style.position = 'fixed'
    tmpEl.style.pointerEvents = "none";
    tmpEl.style.zIndex = -1; // nothing?
    document.body.appendChild(tmpEl);
    window.getSelection().removeAllRanges()
    var range = document.createRange();
    range.selectNode(tmpEl);
    window.getSelection().addRange(range);
    document.execCommand("copy");
    //document.execCommand("copy");
    console.log("Text copied "+ tmpEl.innerHTML);
    document.body.removeChild(tmpEl);

}