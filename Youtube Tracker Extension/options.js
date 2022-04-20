// For options menu, to config track/lock time, and do manual reset

//button
let checkPassword = document.getElementById("checkPassword");
let input = document.getElementById("pword");
let password = "Default";

chrome.storage.sync.get("password", (data) => {
    password = data.password;

    if(password == "Default") {
        input.value = "First time, just submit";
    }
});

//Run when refresh button clicked
checkPassword.addEventListener("click", async () => { 
    if (input.value == password || password == "Default") {
        window.location.href = "options_locked.html";
    } else {
        input.value = "Incorrect Password";
    }
});