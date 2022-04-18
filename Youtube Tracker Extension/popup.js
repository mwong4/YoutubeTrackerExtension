//For quick popup menu

let refreshData = document.getElementById("refreshData");

//Dynamic text
let dynText = document.getElementById('display');
let timeClocked = 0;
chrome.storage.sync.get("timeClocked", (data) => {
    console.log(`${data.timeClocked}`);
    timeClocked = data.timeClocked;
});

//test
//Run when refresh button clicked
refreshData.addEventListener("click", async () => {
    console.log("Test");
    dynText.innerHTML = `<h2>${(timeClocked/60000).toFixed(2)}/120 mins</h2>`
});