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
  chrome.runtime.sendMessage({ message: 'getstate' }, (response) => {
    destroymode = response?.state ?? false;
    updateUI();
  });
};

function toggleDestroyMode() {
  destroymode = !destroymode;
  updateUI();
  chrome.runtime.sendMessage({ message: 'togglestate' });

  if (destroymode) setTimeout(() => window.close(), 250);
}

function activateCleanUp() {
  chrome.runtime.sendMessage({ message: 'refresh' });
  setTimeout(() => window.close(), 150);
}

updateState();

const toggle = document.querySelector('#toggle');
toggle.addEventListener('click', toggleDestroyMode);

const cleanup = document.querySelector('#cleanup');
cleanup.addEventListener('click', activateCleanUp);
