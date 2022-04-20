// For options menu, to config track/lock time, and do manual reset
// Entered after login

let passwordDisplay = document.getElementById("passwordDisplay");
let password = "Default";
let progressBar = document.getElementById("proBar");
let timeClocked = 0;
let timeDisplay = document.getElementById("timeDisplay");
let timeLimit = 120;
let mySlider = document.getElementById("mySlider");
let locked = false;
let limitDisplay = document.getElementById("limitDisplay");

//buttons
let manualRefresh = document.getElementById("manualRefresh");
let resetPassword = document.getElementById("resetPassword");

//update password
chrome.storage.sync.get("password", (data) => {
    password = data.password;
    passwordDisplay.innerHTML = `<h2>Current Password: ${password}</h2>`;
});

//Update time limit
chrome.storage.sync.get("timeLimit", (data) => {
    timeLimit = data.timeLimit;
    mySlider.value = timeLimit;
    limitDisplay.innerHTML = `<h4>Daily Limit: ${timeLimit}</h4>`;
});

//update time clocked
chrome.storage.sync.get("timeClocked", (data) => {
    timeClocked = data.timeClocked;
    progressBar.value = (timeClocked/(timeLimit*60*1000))*100;
    timeDisplay.innerHTML = `<h2>${(timeClocked/60000).toFixed(2)}/${timeLimit} mins [${((timeClocked/(timeLimit*60*1000))*100).toFixed(2)}%]</h2>`;
});



//slider trigger event
mySlider.oninput = function() {
    timeLimit = this.value;
    chrome.storage.sync.set({ timeLimit });
    window.location.href = "options_locked.html";
}

//Run when refresh button clicked
manualRefresh.addEventListener("click", async () => {
    console.log("Attempting to reset tracker");

    //run code to reset trackers
    timeClocked = 0;
    locked = false;
    chrome.storage.sync.set({ timeClocked });
    chrome.storage.sync.set({ locked });
    console.log("Tracker reset  - success");
    //window.location.href = "options_locked.html";
});

//Run when reset button clicked, randomizes password
resetPassword.addEventListener("click", async () => {
    password = makeid(10);
    chrome.storage.sync.set({ password });
    window.location.href = "options_locked.html";
});

//Used this string randomizer: https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
   return result;
}
