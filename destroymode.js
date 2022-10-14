let destroymode = false;
const hammerElement = document.querySelector('#toggle img');

function exec() {
  destroymode = !destroymode;
  if (destroymode) {
    console.log('destroymode ON');
    hammerElement.style.opacity = 0;
    chrome.runtime.sendMessage({ myPopupIsOpen: true });
  } else {
    hammerElement.style.opacity = 1;
    console.log('destroymode OFF');
  }
  setTimeout(() => window.close(), 500);
}

const toggle = document.querySelector('#toggle');
toggle.addEventListener('click', exec);
