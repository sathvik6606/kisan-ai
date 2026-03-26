function sendMessage(){

    let input = document.getElementById("message");
    let message = input.value.trim();


    if(message === "") return;

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


    fetch("/chat",{
        method:"POST",
        headers:{
        "Content-Type":"application/json"
        },
        body:JSON.stringify({message:message})
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