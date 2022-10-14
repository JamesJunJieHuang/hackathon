// let background = chrome.extension.getBackgroundPage();
// let destroymode = background.destroymode;
const hammerElement = document.querySelector('#toggle img');

function exec() {
  chrome.runtime.sendMessage({ myPopupIsOpen: true });

  //   if (destroymode) {
  //     hammerElement.style.opacity = 0;
  //   } else {
  //     hammerElement.style.opacity = 1;
  //   }
  setTimeout(() => window.close(), 500);
}

const toggle = document.querySelector('#toggle');
toggle.addEventListener('click', exec);
