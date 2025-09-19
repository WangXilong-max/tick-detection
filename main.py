# -*- coding: utf-8 -*-
import os
import base64
import json
import requests
from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware

# Load environment variables from .env file if present
try:
    from dotenv import load_dotenv
    load_dotenv()
except ImportError:
    pass

API_KEY = os.getenv("AZURE_API_KEY")
AZURE_ENDPOINT = os.getenv("AZURE_OPENAI_ENDPOINT")
DEPLOYMENT_NAME = os.getenv("AZURE_DEPLOYMENT_NAME", "tick-detection-model")

if not API_KEY or not AZURE_ENDPOINT:
    raise RuntimeError("Missing required environment variables. Please check .env.example for required configuration.")

ENDPOINT = f"{AZURE_ENDPOINT}/openai/deployments/{DEPLOYMENT_NAME}/chat/completions?api-version=2024-08-01-preview"

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/detect-tick")
async def detect_tick(file: UploadFile = File(...)):
    try:
        if not file.content_type.startswith("image/"):
            raise HTTPException(status_code=400, detail="Please upload an image file")

        img_bytes = await file.read()
        img_base64 = base64.b64encode(img_bytes).decode("utf-8")

        headers = {
            "Content-Type": "application/json",
            "api-key": API_KEY
        }

        body = {
            "messages": [
                {
                    "role": "user",
                    "content": [
                        {"type": "text", "text": "Please provide a quick and brief response. Is this image a tick? Only answer with 'Yes', 'No', or 'Uncertain'"},
                        {"type": "image_url", "image_url": {"url": f"data:image/jpeg;base64,{img_base64}"}}
                    ]
                }
            ]
        }

        response = requests.post(
            ENDPOINT,
            headers=headers,
            data=json.dumps(body, ensure_ascii=False).encode("utf-8")
        )

        if response.status_code != 200:
            raise HTTPException(status_code=response.status_code, detail=response.text)

        result = response.json()["choices"][0]["message"]["content"]
        return {"result": result}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    print("Open server started...")
    print("API address: http://localhost:8000")
    print("API documentation: http://localhost:8000/docs")
    uvicorn.run(app, host="0.0.0.0", port=8000)