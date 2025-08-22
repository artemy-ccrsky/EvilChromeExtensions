
# EvilChromeExtensions 🌐😈

Educational Chrome Extensions simulating real-world attacker behavior in the browser.
Built for **Red Team demos**, **adversary emulation**, and **threat simulation**.

---

## 🔥 What is EvilChromeExtensions?

EvilChromeExtensions is a collection of offensive Google Chrome extensions used to demonstrate:
- ✅ Post-exploitation persistence in the browser
- ✅ Credential/session theft (via cookies, forms, clipboard)
- ✅ UI manipulation 
- ✅ Keylogging and exfiltration
- ✅ Threat modeling of real-world malicious extensions

---

## ⚠️ Disclaimer

> This repository is provided **strictly for educational and research purposes**.  
> The author is **not responsible for misuse or damages** resulting from code within.  
> Use only in authorized Red Team assessments, labs, and controlled environments.

---

## 🧩 Workshop

| Name                     | Description                                      | Status  |
|--------------------------|--------------------------------------------------|---------|
| `cookie-extractor`       | Exfiltrates cookies to attacker host           | ✅ Demo |
| `keypress-catcher`       | Logs keystrokes and sends to attacker host| ✅ Demo |
| `clipboard-stealer`      | Leaks copied clipboard text silently              | ✅ Demo |
| `man-in-the-browser-light` | Minimal MITB injection, alters site content/UI | ✅ Demo |
| `tab-snatcher`           | Collects list of open tabs and their DOM content| ✅ Demo |
| `browser-recon-ext`      | Gathers browser, history, environment data        | ✅ Demo |
| `system-recon-ext`       | Collects OS/system info from within Chrome        | ✅ Demo |
| `host-spyware-chrome`    | Not Extension! Can be used to spy on a user by continuously taking screenshots of their screen   | ✅ Demo |


---

## 🛠️ How to use
#### ⚠️ HTTPS Limitation

> Chrome does **not** support self-signed HTTPS certificates for extensions or their backends.  
> 
> - Use **strict HTTP** (only for labs / controlled environments).  
> - Or use **strict HTTPS** with a valid certificate from a trusted CA.  
> 
> Anything in-between (self-signed HTTPS) will fail.

---
1. Clone the repo
   ```bash
   git clone https://github.com/artemy-ccrsky/EvilChromeExtensions.git
   cd EvilChromeExtensions
   ```
2. Change Attacker Host in source code of extension and run Python Flask (for example) server on backend to catch POST Requests
3. Run Chrome extensions with provided CLI:

```powershell
"C:\Program Files\Google\Chrome\Application\chrome.exe" --disable-features=DisableLoadExtensionCommandLineSwitch --load-extension="C:\Users\user\Desktop\offensive-extension"
```

To Run Chrome in Debug mode with stderr:

```powershell
"C:\Program Files\Google\Chrome\Application\chrome.exe" --disable-features=DisableLoadExtensionCommandLineSwitch --load-extension="C:\Users\user\Desktop\offensive-extension" --enable-logging=stderr --v=1
```

4. **Simple way**. Using GUI and Developer Mode in Chrome -> chrome://extensions -> Enable "Developer Mode" -> Upload unpacked extension.
5. **Stealth way**. Use [SharpSilentChrome](https://github.com/ChoiSG/SharpSilentChrome) to silently install Chrome Extension


## References
https://github.com/Darkrain2009/RedExt
https://github.com/praetorian-inc/ChromeAlone
https://github.com/ChoiSG/SharpSilentChrome
https://github.com/mandatoryprogrammer/CursedChrome
https://mrd0x.com/spying-with-chromium-browsers-screensharing/


