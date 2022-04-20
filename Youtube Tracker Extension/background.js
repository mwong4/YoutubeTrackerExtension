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
let usingYT = false;
let password = "Default";
let timeLimit = 120;


//Function for manually resetting time
function updateTracker() {
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

    usingYT = false;
});

//Run on startup
chrome.runtime.onStartup.addListener(() => {
    chrome.storage.sync.get("timeClocked", (data) => {
        timeClocked = data.timeClocked;
    });
    console.log("Starting up");

    usingYT = false;
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

    if(url != undefined && url.substr(0, 23) == "https://www.youtube.com") {
        usingYT = true;

        if (savedTime == 0) {
            savedTime = Date.now();
        }

        timeClocked += Date.now() - savedTime;
        savedTime = Date.now();
        
    } else if (url != undefined) {
        usingYT = false;

        if (savedTime != 0) {
            timeClocked += Date.now() - savedTime;
            savedTime = 0;
        } 
    }

    //console log
    date = new Date(0);
    date.setUTCMilliseconds(Date.now());
    console.log(`[${date}] Using_YT: ${usingYT} | Tracked_Time_(minutes): ${(timeClocked/60000).toFixed(2)} | URL: ${url} `);

    //save data to cache
    chrome.storage.sync.set({ timeClocked });
}

//trigger event from message
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      console.log(sender.tab ?
                  "from a content script:" + sender.tab.url :
                  "from the extension");
      if (request.greeting === "refreshTracker")
        sendResponse({farewell: "Request Recieved"});
        updateTracker();
    }
  );