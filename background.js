(() => {
  let destructionMode = false;

  async function getCurrentTab() {
    let queryOptions = { active: true, lastFocusedWindow: true };
    // `tab` will either be a `tabs.Tab` instance or `undefined`.
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;
  }

  chrome.runtime.onMessage.addListener(async function (
    { message },
    _sender,
    sendResponse
  ) {
    if (message === 'getstate') {
      sendResponse({ state: destructionMode });
    }

    const tab = await getCurrentTab();

    if (message === 'togglestate') {
      destructionMode = !destructionMode;

      if (destructionMode) {
        chrome.scripting.executeScript({
          target: { tabId: tab.id },
          files: ['content.js'],
        });
      } else {
        chrome.scripting.executeScript({
          target: { tabId: tab.id },
          func: () => {
            try {
              cleanUp && cleanUp();
            } catch (error) {
              console.log(error);
            }
          },
        });
      }
    }
    if (message === 'refresh') {
      destructionMode = false;
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: () => location.reload(),
      });
    }
  });
})();
