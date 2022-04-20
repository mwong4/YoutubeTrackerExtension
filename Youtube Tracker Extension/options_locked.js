// For options menu, to config track/lock time, and do manual reset
// Entered after login

let passwordDisplay = document.getElementById("passwordDisplay");
let password = "Default";
let progressBar = document.getElementById("proBar");
let timeClocked = 0;
let timeDisplay = document.getElementById("timeDisplay");

//buttons
let manualRefresh = document.getElementById("manualRefresh");
let resetPassword = document.getElementById("resetPassword");

//update password
chrome.storage.sync.get("password", (data) => {
    password = data.password;
    passwordDisplay.innerHTML = `<h2>Current Password: ${password}</h2>`
});

//update time clocked
chrome.storage.sync.get("timeClocked", (data) => {
    timeClocked = data.timeClocked;
    progressBar.value = (timeClocked/7200000)*100;
    timeDisplay.innerHTML = `<h2>${(timeClocked/60000).toFixed(2)}/120 mins [${((timeClocked/7200000)*100).toFixed(2)}%]</h2>`
});


//Run when refresh button clicked
manualRefresh.addEventListener("click", async () => {
    console.log("Test");
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
