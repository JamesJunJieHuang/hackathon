let destroymode = false;

function exec() {
    destroymode = !destroymode;
    if (destroymode) {
        console.log('destroymode ON');
        chrome.runtime.sendMessage({'myPopupIsOpen': true})
    }
    else console.log('destroymode OFF');
}

const toggle = document.querySelector('#toggle');
toggle.addEventListener('click', exec)




