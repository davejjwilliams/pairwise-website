from flask import Flask, jsonify
from flask_cors import CORS
import time
import json

app = Flask(__name__)
cors = CORS(app, origins="*")

with open('strings.json') as f:
    d = json.load(f)

@app.route("/api/users", methods=["GET"])
def users():
    time.sleep(2)
    return jsonify(
        {
            "users": [
                "dave",
                "williams",
                "test",
            ]
        }
    )


@app.route("/api/patch", methods=["GET"])
def patch():
    return jsonify(
        {
            "patch": "def patch()",
        }
    )


@app.route("/api/explanations", methods=["GET"])
def explanations():
    return jsonify(
        {
            "expl1": "This is explanation 1",
            "expl2": "This is explanation 2",
        }
    )


if __name__ == "__main__":
    app.run(debug=True, port=8080)
