// Simple chatbot with AI-like responses
const chatbotResponses = {
  greetings: ['hello', 'hi', 'hey', 'greetings', 'what\'s up', 'howdy'],
  skills: ['skills', 'what can you do', 'expertise', 'technologies', 'tech stack'],
  projects: ['projects', 'portfolio', 'work', 'case studies', 'what have you built'],
  contact: ['contact', 'reach out', 'email', 'phone', 'how to contact', 'get in touch'],
  about: ['about', 'who are you', 'tell me about yourself', 'background', 'experience'],
  services: ['services', 'what do you offer', 'offerings', 'what services'],
  help: ['help', 'support', 'assist', 'how can you help', 'what can i ask']
};

const botResponses = {
  greetings: 'Hey there! 👋 I\'m Subu\'s AI assistant. I can help you learn about his skills, projects, services, and more. What would you like to know?',
  skills: 'Subu is skilled in HTML, CSS, JavaScript, React, and design tools like Figma and Adobe XD. He specializes in frontend development and UI/UX design.',
  projects: 'Subu has worked on various web projects including modern websites, eCommerce stores, and design applications. Check the Projects section for details!',
  contact: 'You can reach Subu at subashrijal456@gmail.com or via WhatsApp at +977 9815139504. There\'s also a contact form on the website!',
  about: 'Subu is a passionate Frontend Developer and Web Designer based in Nepal. He has expertise in creating beautiful, responsive web interfaces.',
  services: 'Subu offers UI/UX Design, Website Development, and Automation services. Each service is delivered with professional quality and customer support.',
  help: 'I can help you with:\n• Skills & Expertise\n• Projects & Portfolio\n• Services\n• Contact Information\n• About Subu\n\nJust ask me anything!',
  default: 'That\'s interesting! I\'m still learning. You can also check the website sections or contact Subu directly for more detailed information.'
};

const initChatbot = () => {
  // Create chatbot HTML
  const chatbotHTML = `
    <div class="chatbot-container" id="chatbot-container">
      <div class="chatbot-header">
        <div class="chatbot-title">
          <i class="ri-robot-2-line"></i>
          <span>Subu's Assistant</span>
        </div>
        <button class="chatbot-close" id="chatbot-close">
          <i class="ri-close-line"></i>
        </button>
      </div>
      <div class="chatbot-messages" id="chatbot-messages">
        <div class="chatbot-message bot-message">
          <p>👋 Hey! I'm Subu's AI assistant. How can I help you today?</p>
        </div>
      </div>
      <div class="chatbot-input-area">
        <input 
          type="text" 
          id="chatbot-input" 
          class="chatbot-input" 
          placeholder="Ask me anything..."
          autocomplete="off"
        >
        <button class="chatbot-send" id="chatbot-send">
          <i class="ri-send-plane-line"></i>
        </button>
      </div>
    </div>
    <button class="chatbot-toggle" id="chatbot-toggle">
      <i class="ri-chat-2-line"></i>
      <span class="chatbot-badge">1</span>
    </button>
  `;

  // Insert chatbot into the page
  document.body.insertAdjacentHTML('beforeend', chatbotHTML);

  // Get elements
  const toggle = document.getElementById('chatbot-toggle');
  const container = document.getElementById('chatbot-container');
  const closeBtn = document.getElementById('chatbot-close');
  const sendBtn = document.getElementById('chatbot-send');
  const input = document.getElementById('chatbot-input');
  const messagesDiv = document.getElementById('chatbot-messages');
  const badge = document.querySelector('.chatbot-badge');

  let isOpen = false;

  // Toggle chatbot
  toggle.addEventListener('click', () => {
    isOpen = !isOpen;
    container.classList.toggle('active', isOpen);
    toggle.classList.toggle('active', isOpen);
    if (isOpen) {
      input.focus();
      badge.style.display = 'none';
    }
  });

  closeBtn.addEventListener('click', () => {
    isOpen = false;
    container.classList.remove('active');
    toggle.classList.remove('active');
  });

  // Send message
  const sendMessage = () => {
    const text = input.value.trim();
    if (!text) return;

    // Add user message
    const userMsg = document.createElement('div');
    userMsg.className = 'chatbot-message user-message';
    userMsg.innerHTML = `<p>${text}</p>`;
    messagesDiv.appendChild(userMsg);

    // Clear input
    input.value = '';

    // Scroll to bottom
    messagesDiv.scrollTop = messagesDiv.scrollHeight;

    // Get bot response
    setTimeout(() => {
      const response = getBotResponse(text.toLowerCase());
      const botMsg = document.createElement('div');
      botMsg.className = 'chatbot-message bot-message';
      botMsg.innerHTML = `<p>${response}</p>`;
      messagesDiv.appendChild(botMsg);
      messagesDiv.scrollTop = messagesDiv.scrollHeight;
    }, 500);
  };

  sendBtn.addEventListener('click', sendMessage);
  input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
  });

  // Get bot response based on user input
  function getBotResponse(userText) {
    for (let category in chatbotResponses) {
      const keywords = chatbotResponses[category];
      if (keywords.some(keyword => userText.includes(keyword))) {
        return botResponses[category];
      }
    }
    return botResponses.default;
  }
};

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initChatbot);
} else {
  initChatbot();
}
