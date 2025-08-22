document.addEventListener("copy", () => {
  let text = document.getSelection().toString();
  if (text) {
    chrome.runtime.sendMessage({
      type: "CLIPBOARD_CAPTURE",
      data: {
        url: window.location.href,
        length: text.length,
        preview: text
      }
    });
  }
});
