/*
TODO List

-Reset every 24 hours !
-Track time on Youtube
-Lock out of Youtube
-Lock password
-Lock time customization


> Author: Max Wong
> Created: April 12, 2022
*/

let locked = false;
let timeClocked = 0;
let date = new Date(0);
let savedTime = 0;


//Function for manually resetting time
function updateTracker() {
    console.log("Attempting to reset tracker");

    //run code to reset trackers
    timeClocked = 0;
    locked = false;
    console.log("Tracker reset  - success");
}


//Run on install
chrome.runtime.onInstalled.addListener(() => {
    console.log("Youtube Tracker Extension [Active]");

    chrome.alarms.create ("ytAlarm", {when: Date.now(), periodInMinutes: 1440}); //should be 1440
});


//Alarm event
chrome.alarms.onAlarm.addListener(updateTracker());



chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    //console.log(changeInfo.url);
    parseUrl(changeInfo.url);
});

chrome.tabs.onActivated.addListener(function(activeInfo){
    //how to fetch tab url using activeInfo.tabId

    chrome.tabs.get(activeInfo.tabId, function(tab) {
        //console.log(tab.url);
        parseUrl(tab.url);
    });
});


//process url data from tabs data (into time tracker)
function parseUrl(url) {

    if(url.substr(0, 23) == "https://www.youtube.com") {
        locked = true;
        
        if (savedTime == 0) {
            savedTime = Date.now();
        }
    } else {
        locked = false;

        if (savedTime != 0) {
            timeClocked += Date.now() - savedTime;
            savedTime = 0;
        } 
    }

    date = new Date(0);
    date.setUTCMilliseconds(Date.now());
    console.log(`[${date}] UYT: ${locked} | TT: ${timeClocked}`);
}