// docs/javascripts/extra.js
document.addEventListener('DOMContentLoaded', function() {
  setTimeout(function() {
    const script = document.createElement('script');
    script.setAttribute('data-embed-id', '1321e816-9003-440e-9c18-6c0823c38ae7');
    script.setAttribute('data-base-api-url', 'https://vergebot.subether.me/api/embed');
    script.setAttribute('data-chat-icon', 'support');
    script.setAttribute('data-greeting', 'Welcome to the VergeBot, what can I help you with today?');
    script.setAttribute('data-no-sponsor', 'please');
    script.setAttribute('data-assistant-name', 'VergeBot');
    script.setAttribute('data-brand-image-url', 'https://www.verge.io/wp-content/uploads/2022/12/vergeio-icon.png');
    script.setAttribute('data-assistant-icon', 'https://www.verge.io/wp-content/uploads/2022/12/vergeio-icon.png');
    script.setAttribute('data-support-email', 'support@verge.io');
    script.src = 'https://vergebot.subether.me/embed/anythingllm-chat-widget.min.js';
    document.body.appendChild(script);
  }, 1000); // Delay of 1 second
});