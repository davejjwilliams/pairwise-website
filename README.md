# Pairwise Comparison Evaluation Website

## Setup

Client side developed using Node `v21.1.0`

Client:

```bash
cd client
npm install
```

Server:

```bash
cd server
py -m venv venv
source ./venv/bin/activate # Windows: .\venv\Scripts\activate
pip install -r requirements.txt
```

## Usage

In one terminal run the client script:

```bash
cd client
npm run dev
```

In another client running the venv created previous run the server script:

```bash
cd server
py app.py
```
