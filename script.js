async function sendMessage() {
    const userInput = document.getElementById('userInput').value;
    if (!userInput) return;

    const chatlog = document.getElementById('chatlog');
    chatlog.innerHTML += `<p><strong>You:</strong> ${userInput}</p>`;

    try {
        const response = await fetch('https://api.openai.com/v1/engines/davinci-codex/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_KEY}`
            },
            body: JSON.stringify({ message: userInput })
        });

        const data = await response.json();
        const aiMessage = data.message;
        chatlog.innerHTML += `<p><strong>AI:</strong> ${aiMessage}</p>`;
    } catch (error) {
        console.error('Error:', error);
        chatlog.innerHTML += `<p><strong>AI:</strong> Error fetching response</p>`;
    }

    document.getElementById('userInput').value = '';
}
