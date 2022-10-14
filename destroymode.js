let destroymode = false;
const hammerElement = document.querySelector('#toggle img');

const updateUI = () => {
  if (destroymode) {
    hammerElement.style.opacity = 0;
  } else {
    hammerElement.style.opacity = 1;
  }
};

updateState = () => {
  chrome.runtime.sendMessage('get-destroymode', (response) => {
    console.log('Received destroymode:', response.destroymode);
    destroymode = response.destroymode;
    updateUI();
  });
};

function exec() {
  destroymode = !destroymode;
  updateUI();
  chrome.runtime.sendMessage({ myPopupIsOpen: true });

  if (destroymode) setTimeout(() => window.close(), 250);
}

updateState();

const toggle = document.querySelector('#toggle');
toggle.addEventListener('click', exec);
