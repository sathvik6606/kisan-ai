import requests
import os
from dotenv import load_dotenv

load_dotenv()

# REMEMBER TO USE A BRAND NEW TOKEN!
API_KEY = os.getenv("HF_API_KEY")
API_URL = "https://router.huggingface.co/v1/chat/completions"  #

headers = {
    "Authorization": f"Bearer {API_KEY}",
    "Content-Type": "application/json"
}


def get_gemini_response(query, context=""):
    prompt = f"""You are an AI assistant helping farmers.
Context: {context}
Question: {query}
Give practical agricultural advice."""

    payload = {
        # Swapped to a highly available model for testing
        "model": "meta-llama/Meta-Llama-3-8B-Instruct",
        "messages": [
            {"role": "user", "content": prompt}
        ],
        "max_tokens": 1024
    }

    try:
        response = requests.post(API_URL, headers=headers, json=payload)

        # This will raise an exception if the API returns a 401, 404, or 500 error
        response.raise_for_status()

        result = response.json()
        return result["choices"][0]["message"]["content"]

    except requests.exceptions.RequestException as e:
        # This prints the EXACT error from Hugging Face to your PyCharm console
        print(f"HF API CONNECTION ERROR: {e}")
        if response.text:
            print(f"HF ERROR DETAILS: {response.text}")
        return "The AI service is currently unavailable. Please check the backend logs."

    except KeyError:
        print(f"UNEXPECTED JSON FORMAT: {result}")
        return "AI service returned unexpected format."