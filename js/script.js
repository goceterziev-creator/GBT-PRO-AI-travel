// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Navigation
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Navbar background on scroll
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        }
    });

    // Feature card animations
    const featureCards = document.querySelectorAll('.feature-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    featureCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    // AI Chat Widget
    const chatToggle = document.querySelector('.chat-toggle');
    const chatContainer = document.querySelector('.chat-container');
    const closeChat = document.querySelector('.close-chat');
    const chatInput = document.getElementById('chatInput');
    const sendMessage = document.getElementById('sendMessage');
    const chatMessages = document.getElementById('chatMessages');

    chatToggle.addEventListener('click', function() {
        chatContainer.classList.toggle('active');
    });

    closeChat.addEventListener('click', function() {
        chatContainer.classList.remove('active');
    });

    // AI Responses
    const aiResponses = [
        "Разбирам, че търсите информация за пътуване! Мога да ви препоръчам няколко страхотни дестинации базирани на вашите интереси.",
        "За да ви подготвя перфектния план, моля кажете ми: Какъв е вашият бюджет? Предпочитате плаж, планини или градски туризъм?",
        "Страхотен избор! Имам няколко препоръки за тази дестинация. Кога планирате да пътувате и за колко дни?",
        "На базата на вашите отговори, мога да ви предложа пълен пакет включващ полети, хотел и екскурзии. Искате ли да продължим?",
        "За вашия бюджет има няколко отлични опции. Предпочитате луксозен хотел или по-икономични варианти?",
        "Разбирам, че пътувате с група. Мога да ви предложа групови отстъпки и специални активности.",
        "Тази дестинация е перфектна през избрания от вас сезон! Климатът ще бъде идеален за посещение.",
        "Имам няколко скрити бисера за тази дестинация - малко известни места, които си струва да посетите!",
        "Въз основа на вашите интереси, препоръчвам да включите и тези забележителности в маршрута.",
        "Мога да ви подготвя пълен дневен план с всички активности, транспорт и ресторанти. Искате ли да го получавате?"
    ];

    function addMessage(message, isUser = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isUser ? 'user-message' : 'ai-message'}`;
        messageDiv.textContent = message;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function getAIResponse() {
        const randomIndex = Math.floor(Math.random() * aiResponses.length);
        return aiResponses[randomIndex];
    }

    sendMessage.addEventListener('click', function() {
        const message = chatInput.value.trim();
        if (message) {
            addMessage(message, true);
            chatInput.value = '';
            
            // Simulate AI thinking
            setTimeout(() => {
                addMessage(getAIResponse());
            }, 1000);
        }
    });

    chatInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage.click();
        }
    });

    // Contact Form
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            destination: document.getElementById('destination').value,
            message: document.getElementById('message').value
        };

        // Simulate form submission
        formMessage.textContent = 'Благодарим ви за запитването! Ще се свържем с вас в рамките на 24 часа.';
        formMessage.className = 'form-message success';
        
        // Reset form
        contactForm.reset();
        
        // Hide message after 5 seconds
        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 5000);
    });

    // FAQ Accordion
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const answer = this.nextElementSibling;
            const isActive = this.classList.contains('active');
            
            // Close all FAQ items
            faqQuestions.forEach(q => {
                q.classList.remove('active');
                q.nextElementSibling.classList.remove('active');
            });
            
            // Open clicked item if it wasn't active
            if (!isActive) {
                this.classList.add('active');
                answer.classList.add('active');
            }
        });
    });

    // Pricing card interactions
    const pricingButtons = document.querySelectorAll('.btn-pricing');
    
    pricingButtons.forEach(button => {
        button.addEventListener('click', function() {
            const plan = this.closest('.pricing-card').querySelector('h3').textContent;
            addMessage(`Интересувам се от ${plan} план. Можете ли да ми дадете повече информация?`, true);
            
            setTimeout(() => {
                addMessage(`Разбира се! ${plan} план включва всички функции, които видяхте. Мога да ви предоставя пълна информация и да ви запиша за безплатна консултация.`);
            }, 1000);
            
            chatContainer.classList.add('active');
        });
    });

    console.log('GBT PRO AI Travel website loaded successfully! 🚀');
});
