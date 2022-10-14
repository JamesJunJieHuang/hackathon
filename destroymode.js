// destroymode = chrome.extension.getBackgroundPage().destroymode;

function exec() {
    chrome.runtime.sendMessage({'myPopupIsOpen': true})
}

const destroytoggle = document.querySelector('#destroytoggle');
destroytoggle.addEventListener('click', exec)




