//background script for test tutorial
//Followed this tutorial: https://developer.chrome.com/docs/extensions/mv3/getstarted/

let color = '#3aa757';

chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({ color });
    console.log('Default background color set to %cgreen', `colour: ${color}`)
});