# 🌾 Kisan AI Assistant

A highly interactive and responsive web-based chat assistant designed to give farmers valuable and relevant information on agriculture. The tool is built as a lightweight web app and makes use of natural language processing to give answers to questions about crops, weather management, and best practices in farming.

## ✨ Features
* **Real-time AI Chat:** Powered by the Hugging Face API (Llama 3) for highly accurate and contextual agricultural responses.
* **Modern UI/UX:** A clean, mobile-responsive chat interface designed for ease of use.
* **Rich Text Formatting:** Automatically parses Markdown to display bold text, lists, and structured advice for readability.
* **Visual Feedback:** Includes dynamic loading animations (iMessage-style bouncing dots) while the AI generates responses.
* **Secure Architecture:** Implements industry-standard `.env` environment variables to keep API keys completely secure.

## 🛠️ Tech Stack
* **Frontend:** HTML5, CSS3 (Flexbox), Vanilla JavaScript, Marked.js
* **Backend:** Python, Flask
* **AI/LLM:** Hugging Face API (`meta-llama/Meta-Llama-3-8B-Instruct`)

## 🚀 How to Run Locally

If you want to run this project on your own machine, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/your-username/kisan-ai.git](https://github.com/your-username/kisan-ai.git)
   cd kisan-ai
2. **Set up a Virtual Environment:**

   ```bash 
   python -m venv .venv
   source .venv/bin/activate  # On Windows use: .venv\Scripts\activate
3. **Install Dependencies:**

   ```bash
   pip install flask requests python-dotenv
4. **Set up your API Key:**

-Create a file named .env in the root directory.

-Add your Hugging Face API key to the file like this:
 HF_API_KEY=your_api_key_here

5. **Start the Application:**

   ```bash
   python app.py
Open your web browser and navigate to http://127.0.0.1:5000 to use the app!