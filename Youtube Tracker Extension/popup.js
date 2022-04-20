//For quick popup menu

let refreshData = document.getElementById("refreshData");
let progressBar = document.getElementById("proBar");

//Dynamic text
let dynText = document.getElementById('display');
let timeClocked = 0;
chrome.storage.sync.get("timeClocked", (data) => {
    timeClocked = data.timeClocked;
    progressBar.value = (timeClocked/7200000)*100;
    dynText.innerHTML = `<h2>${(timeClocked/60000).toFixed(2)}/120 mins</h2>`
});

//test
//Run when refresh button clicked
refreshData.addEventListener("click", async () => {
    progressBar.value = (timeClocked/7200000)*100;
    dynText.innerHTML = `<h2>${(timeClocked/60000).toFixed(2)}/120 mins</h2>`
});