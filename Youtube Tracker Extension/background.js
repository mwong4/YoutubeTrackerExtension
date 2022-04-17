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
    console.log(changeInfo.url);
});

chrome.tabs.onActivated.addListener(function(activeInfo){
    //how to fetch tab url using activeInfo.tabId

    chrome.tabs.get(activeInfo.tabId, function(tab) {
        console.log(tab.url);
    });
});