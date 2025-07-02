# EvilChrome 🌐😈

Educational Chrome Extensions simulating real-world attacker behavior in the browser.
Built for **Red Team demos**, **adversary emulation**, and **threat simulation**.

---

## 🔥 What is EvilChrome?

EvilChrome is a collection of offensive Google Chrome extensions used to demonstrate:
- ✅ Post-exploitation persistence in the browser
- ✅ Credential/session theft (via cookies, forms, clipboard)
- ✅ UI manipulation and phishing
- ✅ Keylogging and exfiltration
- ✅ Threat modeling of real-world malicious extensions

---

## ⚠️ Disclaimer

> This repository is provided **strictly for educational and research purposes**.  
> The author is **not responsible for misuse or damages** resulting from code within.  
> Use only in authorized Red Team assessments, labs, and controlled environments.

---

## 🧩 Workshop

| Name            | Description                            | Status  |
|-----------------|----------------------------------------|---------|
| `cookie-thief`  | Sends cookies for a target domain      | ✅ Demo  |
| `keypress-catcher` | Logs keystrokes and sends to C2     | ✅ Demo  |
| `visual-spoof`  | Replaces text/UI on trusted sites      | ✅ Demo  |
| `clipboard-leak`| Leaks copied text silently             | 🧪 WIP   |


---

## 🛠️ How to use

1. Clone the repo
   ```bash
   git clone https://github.com/yourname/workshhop.git
   cd workshhop
   ```
2. Run Chrome extensions with provided CLI:

```powershell
"C:\Program Files\Google\Chrome\Application\chrome.exe" --disable-features=DisableLoadExtensionCommandLineSwitch --load-extension="C:\Users\user\Desktop\offensive-extension"
```

To Run Chrome in Debug mode with stderr:

```powershell
"C:\Program Files\Google\Chrome\Application\chrome.exe" --disable-features=DisableLoadExtensionCommandLineSwitch --load-extension="C:\Users\user\Desktop\offensive-extension" --enable-logging=stderr --v=1
```

3. **Another way**. Using GUI and Developer Mode in Chrome -> chrome://extensions -> Enable "Developer Mode" -> Upload unpacked extension.
