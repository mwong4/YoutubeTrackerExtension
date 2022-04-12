/*
TODO List

-Reset every 24 hours
-Track time on Youtube
-Lock out of Youtube
-Lock password
-Lock time customization


> Author: Max Wong
> Created: April 12, 2022
*/

let locked = false;
let timeClocked = 0;
let currentDay = 0;
let currentMonth = 0;
let currentDate = new Date();

//Function for manually resetting time
function updateTracker() {
    console.log("Attempting to reset tracker");
    currentDate = new Date();

    //It's a new day (resets at midnight)
    if(currentDay != currentDate.getDay() || currentMonth != currentDate.getMonth()) {
        
        //Update time trackers
        currentDay = currentDate.getDay(); 
        currentMonth = currentDate.getMonth();

        //run code to reset trackers
        timeClocked = 0;
        locked = false;
        console.log("Tracker reset  - success");
    }
}


//Run on install
chrome.runtime.onInstalled.addListener(() => {
    currentDay = currentDate.getDay();
    currentMonth = currentDate.getMonth();
    console.log(`Current day set to: ${currentDay}`)
});


//Run when refresh button clicked
manualRefresh.addEventListener("click", async () => {
    console.log("Test");
  });


