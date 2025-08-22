from flask import Flask, request
from datetime import datetime
import json
import sys
import io

# Обеспечим stdout в UTF-8
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

app = Flask(__name__)

@app.route("/browser-recon", methods=["POST"])
def system_recon():
    data = request.get_json(force=True)
    timestamp = datetime.utcnow().isoformat()
    print(f"\n[{timestamp}] [system-recon] Received JSON:")
    print(json.dumps(data, indent=2, ensure_ascii=False))  # Корректный вывод с юникодом
    return "OK", 200

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8080)
