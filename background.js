chrome.runtime.onInstalled.addListener(function () {
  let destroymode = false;

  async function getCurrentTab() {
    let queryOptions = { active: true, lastFocusedWindow: true };
    // `tab` will either be a `tabs.Tab` instance or `undefined`.
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;
  }

  chrome.runtime.onMessage.addListener(async function (
    message,
    sender,
    sendResponse
  ) {
    if (message === 'get-destroymode') {
      sendResponse({ destroymode });
    }

    const tab = await getCurrentTab();

    if (message.myPopupIsOpen) {
      destroymode = !destroymode;
      console.log('destroymode is now', destroymode);
      // Do your stuff
      if (destroymode) {
        chrome.scripting.executeScript({
          target: { tabId: tab.id },
          files: ['content.js'],
        });
      } else {
        chrome.scripting.executeScript({
          target: { tabId: tab.id },
          files: ['content3.js'],
        });
      }
    }
    if (message.clean) {
      // Do your stuff
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ['content2.js'],
      });
    }
  });
});
