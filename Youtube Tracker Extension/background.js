/*
TODO List

-Reset every 24 hours !
-Track time on Youtube ~
-Lock out of Youtube
-Lock password !
-Lock time customization


> Author: Max Wong
> Created: April 12, 2022
*/

let locked = false;
let timeClocked = 0;
let date = new Date(0);
let savedTime = Date.now();
let startPhase = true;
let password = "Default";
let timeLimit = 120;


//Function for manually resetting time
function updateTracker() {
    console.log("Attempting to reset tracker");

    //run code to reset trackers
    timeClocked = 0;
    locked = false;
    chrome.storage.sync.set({ timeClocked });
    chrome.storage.sync.set({ locked });
    console.log("Tracker reset  - success");
}


//Run on install
chrome.runtime.onInstalled.addListener(() => {
    console.log("Youtube Tracker Extension [Active]");

    chrome.alarms.create ("ytAlarm", {when: Date.now(), periodInMinutes: 1440}); //should be 1440

    chrome.storage.sync.set({ timeClocked });
    chrome.storage.sync.set({ password });
    chrome.storage.sync.set({ timeLimit });
    chrome.storage.sync.set({ locked });

    startPhase = false;
});

//Run on startup
chrome.runtime.onStartup.addListener(() => {
    chrome.storage.sync.get("timeClocked", (data) => {
        timeClocked = data.timeClocked;
    });
    console.log("Starting up");

    startPhase = false;
});

//Run when about to close
chrome.runtime.onSuspend.addListener(() => {
    chrome.storage.sync.set({ timeClocked });
});


//Alarm event
chrome.alarms.onAlarm.addListener(updateTracker());


chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    parseUrl(changeInfo.url);
});

chrome.tabs.onActivated.addListener(function(activeInfo){
    //how to fetch tab url using activeInfo.tabId

    chrome.tabs.get(activeInfo.tabId, function(tab) {
        parseUrl(tab.url);
    });
});


//process url data from tabs data (into time tracker)
function parseUrl(url) {
    chrome.storage.sync.get("timeLimit", (data) => {
        timeLimit = data.timeLimit;
    });
    chrome.storage.sync.get("locked", (data) => {
        locked = data.locked;
    });

    if (!startPhase) {
        if(url != null && url.substr(0, 23) == "https://www.youtube.com") {
            locked = true;
    
            if (savedTime == 0) {
                savedTime = Date.now();
            }
    
            timeClocked += Date.now() - savedTime;
            savedTime = Date.now();
            
        } else {
            locked = false;
    
            if (savedTime != 0) {
                timeClocked += Date.now() - savedTime;
                savedTime = 0;
            } 
        }
    
        //console log
        date = new Date(0);
        date.setUTCMilliseconds(Date.now());
        console.log(`[${date}] UYT: ${locked} | TT (minutes): ${(timeClocked/60000).toFixed(2)}`);
    
        //save data to cache
        chrome.storage.sync.set({ timeClocked });
    }
}