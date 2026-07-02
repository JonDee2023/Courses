const chatbotForm = document.getElementById("chatbot-form");
const messageInput = document.getElementById("message-to-bot");
const chatDisplay = document.getElementById("input-display");

// Stores chat for current session only
let msgHistory = [];

chatbotForm.addEventListener("submit", function (e) {
    e.preventDefault();

    let userInput = messageInput.value.trim();

    if (userInput === "") return;

    // Add user message
    msgHistory.push({
        sender: "user",
        text: userInput
    });

    // Generate bot response
    let botReply = getBotResponse(userInput);

    // Add bot message
    msgHistory.push({
        sender: "bot",
        text: botReply
    });

    // Update chat UI
    updateChat();

    // Clear input
    chatbotForm.reset();
});


// Bot logic
function getBotResponse(message) {

    let msg = message.toLowerCase();

    if (msg.includes("hello") || msg.includes("hi") || msg.includes("hey")) {
        return "Hello! How can I help you today?";
    }

    else if (msg.includes("name")) {
        return "I'm CACLHA Training Bot";
    }

    else if (msg.includes("how are you")) {
        return "I'm doing great";
    }

    else if (msg.includes("bye")) {
        return "Goodbye for now";
    }

    else if (msg.includes("help")) {
    return `I can help you with the following:<br><br>

• Register a complaint<br><br>
• Show you our church's service days<br><br>
• Show you a list of courses for Church workers<br><br>
• Recommend a Bible course to you`;
}

    else if (msg.includes("do for me")) {
    return " I can help you with the following:<br><br>\n " +
           " • Register a complaint <br><br>\n " +
           " • Show you our church's service days<br><br>\n " +
           " • Show you a list of courses for Church workers<br><br>\n " +
           " • Recommend a Bible course to you ";
}
    else if (msg.includes("church services")) {
        return "Here is CACLHA Service schedule: <br><br>" +
        " • Wednesdays: 6pm <br><br> " +
        " • Sundays: 9am <br><br> " +
        " • Last Fridays: 11pm, and <br><br> " + 
        " • All Services hold @ <br><br> " +
        " Our church auditorium: 12 Adeniyi Jones Avenue, Ikeja, Lagos ";
    }



    else {
        return "Sorry, I don't understand that yet.";
    }
}


// Update chat display
function updateChat() {

    chatDisplay.innerHTML = "";

    msgHistory.forEach((msg) => {

        if (msg.sender === "user") {

            chatDisplay.innerHTML += `
                <div class="record user-msg">
                    <p>
                        <span id="user-msg"> ${msg.text} </span>
                        <img src="user.png" width="3%" class="icon">
                    </p>
                </div>
            `;
        }

        else {

            chatDisplay.innerHTML += `
                <div class="record bot-msg">
                    <p>
                        <img src="robot.png" width="3%" class="icon">
                        <span id="bot-reply"> ${msg.text} </span>
                    </p>
                </div>
            `;
        }
    });

    // Auto scroll to newest message
    chatDisplay.scrollTop = chatDisplay.scrollHeight;
}