//For quick popup menu

let refreshData = document.getElementById("refreshData");
let progressBar = document.getElementById("proBar");
let timeLimit = 120;

//Dynamic text
let dynText = document.getElementById('display');
let timeClocked = 0;

chrome.storage.sync.get("timeClocked", (data) => {
    timeClocked = data.timeClocked;
    progressBar.value = (timeClocked/(timeLimit*60*1000))*100;
    dynText.innerHTML = `<h2>${(timeClocked/60000).toFixed(2)}/${timeLimit} mins</h2>`
});

chrome.storage.sync.get("timeLimit", (data) => {
    timeLimit = data.timeLimit;
});

//on page load
dynText.onload = function() {
    chrome.storage.sync.get("timeLimit", (data) => {
        timeLimit = data.timeLimit;
    });
    progressBar.value = (timeClocked/(timeLimit*60*1000))*100;
    dynText.innerHTML = `<h2>${(timeClocked/60000).toFixed(2)}/${timeLimit} mins</h2>`
}