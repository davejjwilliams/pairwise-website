from flask import Flask, jsonify, request
from flask_cors import CORS
from typing import List, Tuple
import time
import json
from pprint import pprint
import random

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


@app.route("/api/patch", methods=["POST"])
def patch():
    time.sleep(2)
    request_data = request.get_json()

    patch: str = request_data["instanceId"]
    expl_ids: List[int] = [int(request_data["idExplA"]), int(request_data["idExplB"])]

    print(patch)
    print(expl_ids)

    patch, expls = get_info(patch, expl_ids)
    return jsonify(
        {
            "patch": patch,
            "expls": expls,
        }
    )


@app.route("/api/end", methods=["POST"])
def end():
    request_data = request.get_json()

    title: str = request_data["title"]
    yoe: str = request_data["yoe"]
    pyoe: str = request_data["pyoe"]
    instance: str = request_data["instanceId"]
    ranking: List[int] = request_data["ranking"]
    feedback: str = request_data["feedback"]

    print(
        f"Received Data!\ninstance={instance},\nranking={ranking},\nfeedback={feedback}"
    )

    # Store in Database

    return jsonify(
        {
            "success": "You have successfully submitted!",
        }
    )


if __name__ == "__main__":
    app.run(debug=True, port=8080)
