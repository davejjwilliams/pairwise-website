from flask import Flask, jsonify
from flask_cors import CORS
from typing import List, Tuple
import time
import json
from pprint import pprint

app = Flask(__name__)
cors = CORS(app, origins="*")

with open("dataset-verified.json") as f:
    swe_data = json.load(f)

with open("patch-explanations.json") as f:
    expl_data = json.load(f)


def get_info(instance: str, ids: List[int]) -> Tuple[str, List[str]]:
    patch: str = ""
    expls: List[str] = []

    for item in swe_data:
        if item["instance_id"] == instance:
            patch = item["patch"]
            break

    for item in expl_data:
        if item["instance_id"] == instance:
            for expl_id in ids:
                for explanation in item["explanations"]:
                    if explanation["id"] == expl_id:
                        expls.append(explanation["content"])
                        break

    return patch, expls


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
    time.sleep(2)
    patch, expls = get_info("astropy__astropy-12907", [3, 1])
    return jsonify(
        {
            "patch": patch,
            "expls": expls,
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
