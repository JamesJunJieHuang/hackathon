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
    destroymode = response?.destroymode ?? false;
    updateUI();
  });
};

function toggleDestroyMode() {
  destroymode = !destroymode;
  updateUI();
  chrome.runtime.sendMessage({ myPopupIsOpen: true });

  if (destroymode) setTimeout(() => window.close(), 250);
}

function activateCleanUp() {
  chrome.runtime.sendMessage({ clean: true });
  setTimeout(() => window.close(), 150);
}

updateState();

const toggle = document.querySelector('#toggle');
toggle.addEventListener('click', toggleDestroyMode);

const cleanup = document.querySelector('#cleanup');
cleanup.addEventListener('click', activateCleanUp);
