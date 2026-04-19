document.addEventListener('DOMContentLoaded', () => {
    const chatbotToggle = document.getElementById('chatbotToggle');
    const chatbotWindow = document.getElementById('chatbotWindow');
    const closeChat = document.getElementById('closeChat');
    const chatBody = document.getElementById('chatBody');
    const chatInput = document.getElementById('chatInput');
    const sendChat = document.getElementById('sendChat');

    if (!chatbotToggle) return;

    // Toggle Chatbot
    chatbotToggle.addEventListener('click', () => {
        chatbotWindow.classList.toggle('open');
    });

    closeChat.addEventListener('click', () => {
        chatbotWindow.classList.remove('open');
    });

    // Send Message
    const sendMessage = () => {
        const text = chatInput.value.trim();
        if (!text) return;

        // Add user message
        appendMessage(text, 'user');
        chatInput.value = '';

        // Simulate Bot Response
        setTimeout(() => {
            const botResponse = getBotResponse(text);
            appendMessage(botResponse, 'bot');
        }, 600);
    };

    sendChat.addEventListener('click', sendMessage);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });

    function appendMessage(text, sender) {
        const msgDiv = document.createElement('div');
        msgDiv.className = `chat-msg ${sender}`;
        msgDiv.textContent = text;
        chatBody.appendChild(msgDiv);
        chatBody.scrollTop = chatBody.scrollHeight;
    }

    function getBotResponse(text) {
        text = text.toLowerCase();
        if (text.includes('hi') || text.includes('hello')) return 'Hello! How can I help you manage your students today?';
        if (text.includes('add')) return 'You can add a student by navigating to the Dashboard and clicking "Add New Student".';
        if (text.includes('search')) return 'Use the search bar in the Dashboard to find students by name, email, or major.';
        if (text.includes('error')) return 'If you are facing an error, make sure your database server is running and connected.';
        return "I'm a simple assistant. You can ask me about how to add or search for students!";
    }
});
