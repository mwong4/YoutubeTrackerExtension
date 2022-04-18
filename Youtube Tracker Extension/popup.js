//For quick popup menu


window.onload = function() {
    console.log("onload" + Date())
}

window.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded and parsed');
});

//Dynamic text
let dynText = document.getElementById('display');
let timeClocked = 0;
chrome.storage.sync.get("timeClocked", (data) => {
    console.log(`${data.timeClocked}`);
    timeClocked = data.timeClocked;
});

//test
dynText.innerHTML = `<h2>${timeClocked}/2 hours</h2>`


