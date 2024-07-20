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
                'Authorization': `Bearer ${window.OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                prompt: userInput,
                max_tokens: 150
            })
        });

        const data = await response.json();
        const aiMessage = data.choices[0].text.trim();
        chatlog.innerHTML += `<p><strong>AI:</strong> ${aiMessage}</p>`;
    } catch (error) {
        console.error('Error:', error);
        chatlog.innerHTML += `<p><strong>AI:</strong> Error fetching response</p>`;
    }

    document.getElementById('userInput').value = '';
}

// Load the API key from env.js
fetch('env.js')
    .then(response => response.text())
    .then(text => {
        const script = document.createElement('script');
        script.innerHTML = text;
        document.head.appendChild(script);
    });
