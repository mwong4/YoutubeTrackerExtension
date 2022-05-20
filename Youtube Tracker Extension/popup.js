//For quick popup menu

let refreshData = document.getElementById("refreshData");
let progressBar = document.getElementById("proBar");
let timeLimit = 1;

//Dynamic text
let dynText = document.getElementById('display');
let timeClocked = 1;

//redundant on load trigger
//updateDisplay();

//on page load
document.addEventListener("DOMContentLoaded", function() {
    console.log("Popup Loading");
    updateDisplay();
});

//Run when refresh button clicked
refreshData.addEventListener("click", async () => {
    console.log("Button Pressed");
    updateDisplay();
});


async function updateDisplay() {
    await getData();
    progressBar.value = (timeClocked/(timeLimit*60*1000))*100;
    dynText.innerHTML = `<h2>${(timeClocked/60000).toFixed(2)}/${timeLimit} mins</h2>`
}

//async function to get all the data
async function getData() {
    console.log("fetching data - popup");

    chrome.storage.sync.get("timeClocked", (data) => {
        timeClocked = data.timeClocked;
    });
    chrome.storage.sync.get("timeLimit", (data) => {
        timeLimit = data.timeLimit;
    });
    return;
}