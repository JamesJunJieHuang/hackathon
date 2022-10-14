let cleanmode = false;

function exec() {
    cleanmode = !cleanmode;
    if (cleanmode) {
        console.log('cleanmode ON');
        chrome.runtime.sendMessage({'clean': true})
    }
    else console.log('cleanmode OFF');
}

const cleantoggle = document.querySelector('#cleantoggle');
cleantoggle.addEventListener('click', exec)
