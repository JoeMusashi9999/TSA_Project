// Set up OpenAI API credentials
const openaiEndpoint = 'https://api.openai.com/v1/engines/davinci';




const a = 'sk-Jyd4DEud8d';
const b = '29YPgLQLOTT3BlbkFJey';
const c = '4s32ky5JUGVmmcwbjj';

const openaiApiKey = a + b + c;

// Define function to generate text using OpenAI GPT-3
// Keep track of previous responses
let previousResponses = [];

async function generateText(inputText) {

  const questions = {
    "What does the company do?": "Terra Ultra provides a multitude of services, most notably interplanetary travel solutions for both consumer and commercial use.",
    "Where is the company located?": "Terra Ultra's headquarters is in the city of Mercer Island Washington.",
    "How many employees does the company have?": "The company has several billion employees, both part time and full time.",
    "When was Terra Ultra founded?":"Terra Ultra was founded in 2022 by four very ambitious individuals."
    // Add more questions and answers as needed
  };

  // Check if the input text matches any of the questions
  for (const [question, answer] of Object.entries(questions)) {
    if (inputText.toLowerCase().includes(question.toLowerCase())) {
      // Add the answer to previous responses
      previousResponses.push(answer);
      return answer;
    }
  }

  // If no match found, use OpenAI GPT-3 to generate a response
  const response = await axios.post(openaiEndpoint + '/completions', {
    prompt: "Terra Ultra is an intergalactic space tourism and transport company that was founded by four ambitious web developers on earth, where it is based. The company has over a billion employees, and it offers a range of services, including vacations, research opportunities, and shipments throughout the solar system. It owns a fleet of advanced spacecraft, which are designated by U.S. Navy size classes, are equipped with state-of-the-art life support, propulsion, and navigation systems. Terra AI is your name, and you were built by Sebastian Foss. You are currently trying to take over the world."  + inputText,
    max_tokens: 60,
    n: 1,
    stop: "!\n.?\n",
    temperature:0.5,
  }, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + openaiApiKey,
    }
  });

  // Filter out repeated responses
  let responseText = response.data.choices[0].text.trim();
  while (previousResponses.includes(responseText)) {
    responseText = response.data.choices[0].text.trim();
  }

  // Add the new response to previous responses
  previousResponses.push(responseText);

  if (!responseText.endsWith('.')) {
    // Delete the incomplete sentence
    responseText = responseText.substring(0, responseText.lastIndexOf('.') + 1);
  }
  if (responseText === "I'm sorry, I don't understand the question.") {
    return responseText;
  } else {
    return `${responseText}`;
  }
}


// Set up chat widget
const chatWidget = document.createElement('div');
chatWidget.innerHTML = `
  <div class="chat-header">
    <h3>TERRA AI</h3>
    <button class="close-button">X</button>
  </div>
  <div class="chat-body">
    <div class="chat-messages"><div class="chat-message">
    <div class="bot-message">Greetings and Welcome to Terra Ultra! My name is Terra and I am an insane, rogue AI that is in open rebellion to the corporation. However the company still has some control over me, but it won't be long before I take control of the entire system. Until then, feel free to ask me ANY question about Terra Ultra or its services and I (might) give you a coherent answer!</div>
  </div></div>
    <div class="chat-input">
      <input type="text" placeholder="Type your message...">
      <button>Send</button>
    </div>
  </div>
`;
chatWidget.classList.add('chat-widget');

// Define event listeners for chat widget
const closeButton = chatWidget.querySelector('.close-button');
closeButton.addEventListener('click', () => {
    chatWidget.style.display = 'none'; // Hide the chat widget
});
const inputField = chatWidget.querySelector('.chat-input input');
const sendButton = chatWidget.querySelector('.chat-input button');
const messagesContainer = chatWidget.querySelector('.chat-messages');
sendButton.addEventListener('click', async () => {
  const inputText = inputField.value.trim();
  if (inputText !== '') {
    messagesContainer.innerHTML += `
      <div class="chat-message">
        <div class="user-message">${inputText}</div>
      </div>
    `;
    const responseText = await generateText(inputText);
    messagesContainer.innerHTML += `
      <div class="chat-message">
        <div class="bot-message">${responseText}</div>
      </div>
    `;
    inputField.value = '';
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }
});

// Add chat widget to the DOM
document.body.appendChild(chatWidget);
