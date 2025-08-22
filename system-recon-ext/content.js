chrome.runtime.sendMessage({
  type: "env",
  payload: {
    userAgent: navigator.userAgent,
    languages: navigator.languages,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    screen: {
      width: window.screen.width,
      height: window.screen.height,
      pixelDepth: window.screen.pixelDepth
    }
  }
});
