//For quick popup menu

let refreshData = document.getElementById("refreshData");
let progressBar = document.getElementById("proBar");
let timeLimit = 0;

//Dynamic text
let dynText = document.getElementById('display');
let timeClocked = 1;

chrome.storage.sync.get("timeClocked", (data) => {
    timeClocked = data.timeClocked;
    progressBar.value = (timeClocked/(timeLimit*60*1000))*100;
    dynText.innerHTML = `<h2>${(timeClocked/60000).toFixed(2)}/${timeLimit} mins</h2>`
});

chrome.storage.sync.get("timeLimit", (data) => {
    timeLimit = data.timeLimit;
});

//on page load
document.addEventListener("DOMContentLoaded", function() {
    chrome.storage.sync.get("timeLimit", (data) => {
        timeLimit = data.timeLimit;
    });
    progressBar.value = (timeClocked/(timeLimit*60*1000))*100;
    dynText.innerHTML = `<h2>${(timeClocked/60000).toFixed(2)}/${timeLimit} mins</h2>`
    console.log(timeLimit);
});

//Run when refresh button clicked
refreshData.addEventListener("click", async () => {
    chrome.storage.sync.get("timeLimit", (data) => {
        timeLimit = data.timeLimit;
    });
    progressBar.value = (timeClocked/(timeLimit*60*1000))*100;
    dynText.innerHTML = `<h2>${(timeClocked/60000).toFixed(2)}/${timeLimit} mins</h2>`
    console.log(timeLimit);
});