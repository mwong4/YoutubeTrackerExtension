/*
Special version for posting on Stack
*/

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    parseUrl(changeInfo.url, tabId);
});

chrome.tabs.onActivated.addListener(function(activeInfo){
    chrome.tabs.get(activeInfo.tabId, function(tab) {
        parseUrl(tab.url, activeInfo.tabId);
    });
});

//process url data from tabs data (into time tracker)
function parseUrl(url, tabId) {
    if(url != undefined && url.substr(0, 23) == "https://www.youtube.com") {
        console.log("Using Youtube!");
        
    } else if (url != undefined) {
        console.log("Not Using Youtube!");
    }
}