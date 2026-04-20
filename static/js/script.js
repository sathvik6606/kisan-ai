function sendMessage() {
    let input = document.getElementById("message");
    let message = input.value.trim();

    if (message === "") return;

    let chatbox = document.getElementById("chatbox");

    chatbox.innerHTML += `
    <div class="message user">
    ${message}
    </div>
    `;

    input.value = "";

    let loadingId = "loading-" + Date.now();
    chatbox.innerHTML += `
    <div id="${loadingId}" class="message bot loading-indicator">
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
    </div>
    `;

    chatbox.scrollTop = chatbox.scrollHeight;

    fetch("/chat", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ message: message })
    })
    .then(response => response.json())
    .then(data => {

        let loadingElement = document.getElementById(loadingId);
        if (loadingElement) {
            loadingElement.remove();
        }

        chatbox.innerHTML += `
        <div class="message bot">
        ${marked.parse(data.response)}
        </div>
        `;

        chatbox.scrollTop = chatbox.scrollHeight;

        // Trigger the AI to speak the answer out loud
        speakAnswer(data.response);
    })
    .catch(error => {

        let loadingElement = document.getElementById(loadingId);
        if (loadingElement) {
            loadingElement.remove();
        }

        chatbox.innerHTML += `
        <div class="message bot">
        Sorry, I'm having trouble connecting right now. Please try again.
        </div>
        `;
        console.error("Error fetching response:", error);
    });
}

document.getElementById("message").addEventListener("keypress", function(event){
    if(event.key === "Enter"){
        event.preventDefault();
        sendMessage();
    }
});


// ==========================================
// --- V2.0 VOICE FEATURES (WITH TOGGLE) ---
// ==========================================

const micBtn = document.getElementById('mic-btn');
const ttsBtn = document.getElementById('tts-btn');
const messageInput = document.getElementById('message');

let isListening = false;
let isVoiceEnabled = true;

// --- Speaker Toggle Logic ---
if (ttsBtn) {
    ttsBtn.addEventListener('click', () => {
        isVoiceEnabled = !isVoiceEnabled;

        if (isVoiceEnabled) {
            ttsBtn.textContent = '🔊';
            ttsBtn.classList.remove('tts-muted');
        } else {
            ttsBtn.textContent = '🔇';
            ttsBtn.classList.add('tts-muted');
            // Immediately stop talking if the user hits mute mid-sentence
            if ('speechSynthesis' in window) {
                window.speechSynthesis.cancel();
            }
        }
    });
}

// --- 1. Speech-to-Text (Microphone Input) ---
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if (SpeechRecognition) {
    const recognition = new SpeechRecognition();
    recognition.continuous = false;

    micBtn.addEventListener('click', () => {
        if (isListening) {
            recognition.stop();
        } else {
            recognition.start();
            isListening = true;
            micBtn.classList.add('listening');
            messageInput.placeholder = "Listening...";
        }
    });

    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        messageInput.value = transcript;
    };

    recognition.onend = () => {
        isListening = false;
        micBtn.classList.remove('listening');
        messageInput.placeholder = "Ask about crops, weather, farming...";
    };

    recognition.onerror = (event) => {
        isListening = false;
        console.error("Microphone error:", event.error);
        micBtn.classList.remove('listening');
    };
} else {
    if (micBtn) micBtn.style.display = "none";
}

// --- 2. Text-to-Speech (AI Voice Output) ---
function speakAnswer(text) {
    // Stop immediately if the user has muted the voice
    if (!isVoiceEnabled) return;

    if ('speechSynthesis' in window) {
        // Strip out Markdown formatting so the voice reads cleanly
        const cleanText = text.replace(/[*#_]/g, '');
        const utterance = new SpeechSynthesisUtterance(cleanText);
        utterance.rate = 1.0;
        window.speechSynthesis.speak(utterance);
    }
}