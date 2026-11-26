const GEMINI_API_KEY = CONFIG.API_KEY; 


let chatBox = document.getElementById("chat-box");
let userInput = document.getElementById("user-input");


userInput.addEventListener("keydown", function(event) {

    if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        sendMessageOnAction();
    }

});

function sendMessageOnAction() {

    

    let userMessage = userInput.value.trim();

    if (userMessage === "") {
        return;
    }

    // Display user message
    chatBox.innerHTML += `
        <div class="message user-message">
            ${userMessage}
        </div>
    `;

    userInput.value = "";

    getResponse(userMessage);
}


async function getResponse(userMessage) {
    await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash-lite:generateContent?key=${GEMINI_API_KEY}`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                contents: [
                    {
                        role: "user",
                        parts: [
                            {
                                text: userMessage
                            }
                        ]
                    }
                ]
            })
        }
    )
    .then(response => {
        return response.json();
    })
    .then(data => {
        console.log(data);
        const rawText = data.candidates[0].content.parts[0].text;
        const formattedHTML = marked.parse(rawText);

        chatBox.innerHTML += `
            <div class="message bot-message">${formattedHTML}</div>
        `;
    })
    .catch(error => {
        console.log(error);
        chatBox.innerHTML += `
            <div class="message buddy-message">
                Oops! Something went wrong. Try again! 💜
            </div>
        `;
    });
}