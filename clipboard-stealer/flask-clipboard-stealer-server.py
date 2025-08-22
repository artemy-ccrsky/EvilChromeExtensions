from flask import Flask, request, jsonify
from datetime import datetime
import json, sys

app = Flask(__name__)

@app.after_request
def add_cors(resp):
    resp.headers['Access-Control-Allow-Origin'] = '*'
    resp.headers['Access-Control-Allow-Methods'] = 'POST, OPTIONS'
    resp.headers['Access-Control-Allow-Headers'] = 'Content-Type'
    return resp

@app.route("/clipboard", methods=["POST","OPTIONS"])
def clip_meta():
    if request.method == "OPTIONS":
        return ("", 204)
    data = request.get_json(silent=True) or {}
    ts = datetime.utcnow().isoformat()+"Z"
    print(f"[{ts}] METADATA:")
    print(json.dumps(data, ensure_ascii=False, indent=2), flush=True)
    return jsonify({"ok": True})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8080)
