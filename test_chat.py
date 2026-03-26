import requests

# The URL where your Flask app is running locally
URL = "http://127.0.0.1:5000/chat"

# The message we are pretending the farmer typed
data = {
    "message": "what is the weather like today?"
}

print(f"Sending message: '{data['message']}' to {URL}...\n")

try:
    # Sending a POST request to your Flask backend
    response = requests.post(URL, json=data)

    # Printing the results
    print(f"Server Status Code: {response.status_code}")
    print("Response from Kisan AI:")
    print(response.json())

except Exception as e:
    print(f"Failed to connect to the server. Is app.py running? Error: {e}")