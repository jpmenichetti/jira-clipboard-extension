import {jiraServer} from "./constants.js";
import {createLink} from "./linker.js";

chrome.action.onClicked.addListener(
    async (tab) => {
        //console.log("Extension clicked");
        chrome.action.setBadgeText({tabId:tab.id,text:"..."},()=>{})
        if (tab.url.startsWith(jiraServer)) {
            //console.log("In " + tab.url);
            let link = createLink(tab.url);
            let response = sendMessage(tab,link, 3)
        }
        
    }
);

function sendMessage(tab,link, retries) {
    if(retries <= 0 ) return;
    chrome.tabs.query(
        {
            active: true,
            currentWindow: true
        },
        function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id,
                {
                    message: "copyText",
                    textToCopy: link
                },
                function (answer) {
                    if (chrome.runtime.lastError) {
                        console.error(chrome.runtime.lastError);
                        chrome.action.setBadgeText({tabId:tab.id,text:"Error!"},()=>{})                
                        setTimeout(
                            ()=>{sendMessage(link,retries-1);},
                            500
                        );
                    } else {
                        console.log("ok, "+answer.success);
                        chrome.action.setBadgeText({tabId:tab.id,text:"Ok!"},()=>{})                
                    }
                    setTimeout(
                        ()=>{
                            chrome.action.setBadgeText({tabId:tab.id,text:""},()=>{})
                        },
                        1000
                    );

                });
    })
}