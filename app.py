from flask import Flask, request, jsonify, render_template
import json
from ai_service import get_ai_response
from weather_service import get_weather

app = Flask(__name__)

# Safely load knowledge base
try:
    with open("knowledge_base.json") as f:
        knowledge_base = json.load(f)
except FileNotFoundError:
    print("Warning: knowledge_base.json not found. Starting with empty knowledge base.")
    knowledge_base = {}

@app.route("/")
def home():
    return render_template("index.html")


@app.route("/chat", methods=["POST"])
def chat():
    print("CHAT ROUTE HIT")

    # Safely handle the incoming request data
    data = request.json or {}
    query = data.get("message", "").strip().lower()

    print("USER QUERY:", query)

    # Catch empty messages early
    if not query:
        return jsonify({"response": "Please provide a valid message."}), 400

    try:
        # Weather related queries
        if "weather" in query or "rain" in query:
            print("WEATHER BRANCH")
            weather_info = get_weather()
            response = get_gemini_response(query, context=weather_info)

        # Knowledge base queries
        elif query in knowledge_base:
            print("KNOWLEDGE BASE BRANCH")
            response = knowledge_base[query]

        # Default AI response
        else:
            print("AI BRANCH")
            response = get_gemini_response(query)

    except Exception as e:
        print(f"BACKEND ROUTING ERROR: {e}")
        response = "I'm having trouble gathering that information right now. Please try again later."

    print("FINAL RESPONSE:", response)

    

    return jsonify({"response": response})


if __name__ == "__main__":
    app.run(debug=True)
