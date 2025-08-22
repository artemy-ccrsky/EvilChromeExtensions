(async () => {
    const dom = document.documentElement.outerHTML;
    // Корректно кодируем в base64 (UTF-8-safe)
    const domBase64 = btoa(unescape(encodeURIComponent(dom)));
    chrome.runtime.sendMessage({type: "tab-snatch-dom", dom_b64: domBase64, url: window.location.href});
})();
