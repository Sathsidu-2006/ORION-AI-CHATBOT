let chatBox = document.getElementById("chat-box");

function sendMessageOnAction() {

    let inputField = document.getElementById("user-input");

    let userMessage = inputField.value.trim();

    if (userMessage === "") {
        return;
    }

    // Display user message
    chatBox.innerHTML += `
        <div class="message user-message">
            ${userMessage}
        </div>
    `;

    inputField.value = "";

    getResponse(userMessage);
}