import {selectedParam} from "./constants.js";
import {browseUrl} from "./constants.js";

export function createLink(url){
    let link;
    let ticket;
    if(url.includes(`${selectedParam}=`)){
        ticket = url.split(`${selectedParam}=`)[1];
        if(ticket.includes("&")){
            ticket = ticket.split("&")[0];
        }
    }else{
        if(url.includes("?")){
            ticket=url.split("?")[0];
        }else{
            ticket = url;
        }
        let parts = ticket.split("/");
        ticket = parts[parts.length-1];
    }
    link = browseUrl+ticket;
    console.log(`For URL<${url}> --> ticket:${ticket} ; URL:${link}`);

    return `<a href="${link}">${ticket}</a>`;
    //return `[${ticket}](${url})`;
}
