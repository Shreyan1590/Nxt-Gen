/**
 * ==========================================
 * 🤖 NXT-GEN AI ASSISTANT
 * Intelligent, Context-Aware Chatbot
 * ==========================================
 */

class NxtGenAssistant {
    constructor() {
        this.isOpen = false;
        this.messages = [];
        this.context = {
            currentSection: null,
            viewHistory: [],
            lastInteraction: null,
            sessionStart: Date.now()
        };
        this.knowledgeBase = null;

        this.init();
    }

    init() {
        this.buildKnowledgeBase();
        this.setupUI();
        this.setupEventListeners();
        this.trackUserContext();
        this.showWelcomeMessage();

        console.log('%c🤖 Nxt-Gen AI Assistant Initialized', 'color: #8b5cf6; font-size: 12px;');
    }

    // ==========================================
    // KNOWLEDGE BASE BUILDER
    // ==========================================
    buildKnowledgeBase() {
        this.knowledgeBase = {
            department: {
                name: "Department of Nxt-Gen Computing",
                institution: "SIMATS Engineering",
                location: "Saveetha Nagar, Thandalam, Chennai - 602 105, Tamil Nadu, India"
            },
            vision: "To be a global leader in next-generation computing, driving cutting-edge research, innovation, and collaboration across academia, industry, and government to shape the future of computing for a better world.",
            mission: [
                "Provide world-class education and training to nurture the next generation of computing experts",
                "Foster collaboration and knowledge sharing among academia, industry, and government",
                "Translate research discoveries into practical applications that address societal challenges",
                "Promote ethical and responsible development of next-generation computing technologies"
            ],
            about: "The Department of Nxt-Gen Computing at SIMATS Engineering is dedicated to advancing computing technologies through research, innovation, and education. Our faculty and students work on cutting-edge projects in AI, quantum computing, and cybersecurity — shaping the future of technology.",
            research: [
                { area: "Machine Learning", description: "Advanced ML algorithms and applications" },
                { area: "Deep Learning", description: "Neural networks and deep architectures" },
                { area: "Artificial Intelligence", description: "Intelligent systems and automation" },
                { area: "Quantum Computing", description: "Next-generation quantum algorithms" },
                { area: "Large Language Models", description: "LLM research and applications" }
            ],
            stats: {
                faculty: "10+",
                students: "500+",
                papers: "50+",
                partners: "15+"
            },
            features: [
                "NAAC A++ Accredited",
                "100% Placement",
                "Research Excellence",
                "Modern Labs"
            ],
            contact: {
                address: "Department of Nxt-Gen Computing, SIMATS Engineering, Saveetha Nagar, Thandalam, Chennai - 602 105, Tamil Nadu, India",
                phone: "+91 95977 46085 (HOD)",
                email: "vijayaragavanp.sse@saveetha.com",
                website: "www.saveetha.com"
            },
            sections: [
                { id: "home", name: "Home", description: "Welcome hero section with department overview" },
                { id: "vision-mission", name: "Vision & Mission", description: "Our goals and objectives" },
                { id: "about", name: "About Us", description: "Department introduction and overview" },
                { id: "research", name: "Research", description: "Research focus areas" },
                { id: "faculty", name: "Faculty", description: "Meet our expert faculty members" },
                { id: "achievements", name: "Achievements", description: "Awards and recognitions" },
                { id: "events", name: "Events", description: "Upcoming, ongoing, and past events" },
                { id: "gallery", name: "Gallery", description: "Photos from events and campus" },
                { id: "contact", name: "Contact", description: "Get in touch with us" }
            ],
            faculty: [], // Will be populated from faculty.json
            events: []   // Will be populated from events.json
        };

        // Load dynamic data
        this.loadFacultyData();
        this.loadEventsData();
    }

    async loadFacultyData() {
        try {
            const response = await fetch('faculty.json');
            if (response.ok) {
                this.knowledgeBase.faculty = await response.json();
            }
        } catch (e) {
            console.log('Faculty data will be loaded on demand');
        }
    }

    async loadEventsData() {
        try {
            const response = await fetch('events.json');
            if (response.ok) {
                this.knowledgeBase.events = await response.json();
            }
        } catch (e) {
            console.log('Events data will be loaded on demand');
        }
    }

    // ==========================================
    // UI SETUP
    // ==========================================
    setupUI() {
        // Create chat widget container
        const widget = document.createElement('div');
        widget.className = 'ai-assistant';
        widget.id = 'ai-assistant';
        widget.innerHTML = `
            <button class="ai-toggle" id="ai-toggle" aria-label="Open AI Assistant">
                <span class="ai-icon">
                    <!-- Robot Chatbot Icon -->
                    <svg width="28" height="28" viewBox="0 0 64 64" fill="none">
                        <!-- Robot head -->
                        <rect x="12" y="18" width="40" height="32" rx="8" fill="currentColor"/>
                        <!-- Antenna -->
                        <circle cx="32" cy="10" r="4" fill="currentColor"/>
                        <rect x="30" y="12" width="4" height="8" fill="currentColor"/>
                        <!-- Eyes -->
                        <circle cx="22" cy="32" r="5" fill="white" class="robot-eye left-eye"/>
                        <circle cx="42" cy="32" r="5" fill="white" class="robot-eye right-eye"/>
                        <circle cx="23" cy="32" r="2" fill="#333" class="robot-pupil"/>
                        <circle cx="43" cy="32" r="2" fill="#333" class="robot-pupil"/>
                        <!-- Mouth - smile -->
                        <path d="M24 42 Q32 48 40 42" stroke="white" stroke-width="3" fill="none" stroke-linecap="round"/>
                        <!-- Ears/Sides -->
                        <rect x="6" y="28" width="6" height="12" rx="3" fill="currentColor"/>
                        <rect x="52" y="28" width="6" height="12" rx="3" fill="currentColor"/>
                    </svg>
                </span>
                <span class="ai-close">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </span>
            </button>
            <div class="ai-chat-window" id="ai-chat-window">
                <div class="ai-header">
                    <div class="ai-avatar">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="12" cy="12" r="10"></circle>
                            <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
                            <line x1="9" y1="9" x2="9.01" y2="9"></line>
                            <line x1="15" y1="9" x2="15.01" y2="9"></line>
                        </svg>
                    </div>
                    <div class="ai-info">
                        <span class="ai-name">Nxt-Gen Assistant</span>
                        <span class="ai-status">
                            <span class="status-dot"></span>
                            Online
                        </span>
                    </div>
                    <button class="ai-minimize" id="ai-minimize">−</button>
                </div>
                <div class="ai-messages" id="ai-messages"></div>
                <div class="ai-suggestions" id="ai-suggestions"></div>
                <div class="ai-input-area">
                    <input type="text" id="ai-input" placeholder="Ask me anything..." autocomplete="off">
                    <button id="ai-send" aria-label="Send message">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <line x1="22" y1="2" x2="11" y2="13"></line>
                            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                        </svg>
                    </button>
                </div>
            </div>
        `;
        document.body.appendChild(widget);

        // Cache DOM elements
        this.elements = {
            widget: widget,
            toggle: document.getElementById('ai-toggle'),
            chatWindow: document.getElementById('ai-chat-window'),
            messages: document.getElementById('ai-messages'),
            suggestions: document.getElementById('ai-suggestions'),
            input: document.getElementById('ai-input'),
            send: document.getElementById('ai-send'),
            minimize: document.getElementById('ai-minimize')
        };
    }

    setupEventListeners() {
        // Toggle chat
        this.elements.toggle.addEventListener('click', () => this.toggleChat());
        this.elements.minimize.addEventListener('click', () => this.toggleChat());

        // Send message
        this.elements.send.addEventListener('click', () => this.handleUserInput());
        this.elements.input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.handleUserInput();
        });

        // Handle suggestion clicks
        this.elements.suggestions.addEventListener('click', (e) => {
            if (e.target.classList.contains('suggestion-chip')) {
                this.elements.input.value = e.target.textContent;
                this.handleUserInput();
            }
        });
    }

    // ==========================================
    // CONTEXT TRACKING
    // ==========================================
    trackUserContext() {
        // Track current section based on scroll
        const sections = document.querySelectorAll('section, header#home');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
                    const sectionId = entry.target.id;
                    if (sectionId && sectionId !== this.context.currentSection) {
                        this.context.currentSection = sectionId;
                        if (!this.context.viewHistory.includes(sectionId)) {
                            this.context.viewHistory.push(sectionId);
                        }
                    }
                }
            });
        }, { threshold: 0.3 });

        sections.forEach(section => observer.observe(section));
    }

    getCurrentSectionInfo() {
        const section = this.knowledgeBase.sections.find(s => s.id === this.context.currentSection);
        return section || { id: 'home', name: 'Home', description: 'Main page' };
    }

    // ==========================================
    // CHAT UI METHODS
    // ==========================================
    toggleChat() {
        this.isOpen = !this.isOpen;
        this.elements.widget.classList.toggle('open', this.isOpen);

        if (this.isOpen) {
            this.elements.input.focus();
            this.showContextualSuggestions();
        }
    }

    showWelcomeMessage() {
        setTimeout(() => {
            this.addMessage('assistant', `👋 Hi! I'm the Nxt-Gen Assistant. I know everything about this department - faculty, research, events, and more. How can I help you today?`);
        }, 2000);
    }

    showContextualSuggestions() {
        const currentSection = this.getCurrentSectionInfo();
        let suggestions = [];

        // Base suggestions
        const baseSuggestions = [
            "What is this department about?",
            "Show me the faculty",
            "What research areas?",
            "Upcoming events"
        ];

        // Context-aware suggestions based on current section
        switch (currentSection.id) {
            case 'home':
                suggestions = ["Tell me about the department", "What can I explore here?", "Show me research areas"];
                break;
            case 'faculty':
                suggestions = ["Who is the HOD?", "Faculty research areas", "Contact a professor"];
                break;
            case 'research':
                suggestions = ["Tell me about AI research", "Quantum computing work", "Deep learning projects"];
                break;
            case 'events':
                suggestions = ["Upcoming events", "Recent events", "How to register?"];
                break;
            case 'contact':
                suggestions = ["Department address", "HOD contact", "Email address"];
                break;
            default:
                suggestions = baseSuggestions;
        }

        this.elements.suggestions.innerHTML = suggestions
            .map(s => `<button class="suggestion-chip">${s}</button>`)
            .join('');
    }

    addMessage(role, content, animate = true) {
        const message = document.createElement('div');
        message.className = `ai-message ${role}${animate ? ' animate' : ''}`;

        if (role === 'assistant') {
            message.innerHTML = `
                <div class="message-avatar">🤖</div>
                <div class="message-content">${content}</div>
            `;
        } else {
            message.innerHTML = `<div class="message-content">${content}</div>`;
        }

        this.elements.messages.appendChild(message);
        this.elements.messages.scrollTop = this.elements.messages.scrollHeight;

        this.messages.push({ role, content, timestamp: Date.now() });
    }

    showTypingIndicator() {
        const typing = document.createElement('div');
        typing.className = 'ai-message assistant typing-indicator';
        typing.id = 'typing-indicator';
        typing.innerHTML = `
            <div class="message-avatar">🤖</div>
            <div class="message-content">
                <span class="dot"></span>
                <span class="dot"></span>
                <span class="dot"></span>
            </div>
        `;
        this.elements.messages.appendChild(typing);
        this.elements.messages.scrollTop = this.elements.messages.scrollHeight;
    }

    removeTypingIndicator() {
        const indicator = document.getElementById('typing-indicator');
        if (indicator) indicator.remove();
    }

    // ==========================================
    // MESSAGE HANDLING
    // ==========================================
    async handleUserInput() {
        const query = this.elements.input.value.trim();
        if (!query) return;

        // Add user message
        this.addMessage('user', query);
        this.elements.input.value = '';

        // Show typing indicator
        this.showTypingIndicator();

        // Process and respond (with slight delay for natural feel)
        setTimeout(() => {
            this.removeTypingIndicator();
            const response = this.generateResponse(query);
            this.addMessage('assistant', response);
            this.showContextualSuggestions();
        }, 500 + Math.random() * 500);
    }

    // ==========================================
    // INTENT CLASSIFICATION & RESPONSE
    // ==========================================
    generateResponse(query) {
        const lowerQuery = query.toLowerCase();
        const intent = this.classifyIntent(lowerQuery);

        this.context.lastInteraction = { query, intent, timestamp: Date.now() };

        switch (intent.type) {
            case 'greeting':
                return this.handleGreeting();
            case 'about':
                return this.handleAbout();
            case 'vision_mission':
                return this.handleVisionMission();
            case 'research':
                return this.handleResearch(intent.entity);
            case 'faculty':
                return this.handleFaculty(intent.entity);
            case 'events':
                return this.handleEvents(intent.entity);
            case 'contact':
                return this.handleContact();
            case 'navigation':
                return this.handleNavigation(intent.entity);
            case 'stats':
                return this.handleStats();
            case 'help':
                return this.handleHelp();
            case 'current_section':
                return this.handleCurrentSection();
            case 'thanks':
                return this.handleThanks();
            default:
                return this.handleUnknown(query);
        }
    }

    classifyIntent(query) {
        const patterns = {
            greeting: /^(hi|hello|hey|good\s*(morning|afternoon|evening)|greetings)/i,
            thanks: /^(thanks|thank you|thx|appreciate)/i,
            about: /(about|what is|tell me about|describe|overview|introduction).*(department|this|nxt.?gen|simats)/i,
            vision_mission: /(vision|mission|goal|objective|aim)/i,
            research: /(research|study|work on|focus|area|topic|ml|ai|deep learning|quantum|llm|machine learning)/i,
            faculty: /(faculty|professor|teacher|staff|hod|head|who teach|member)/i,
            events: /(event|happening|upcoming|ongoing|completed|workshop|seminar|conference)/i,
            contact: /(contact|reach|email|phone|address|location|where|call)/i,
            navigation: /(show|go to|take me|navigate|open|visit|see)\s*(the\s*)?(home|about|research|faculty|events|gallery|contact|achievement)/i,
            stats: /(how many|number|count|statistics|stats|students|papers|partners)/i,
            help: /(help|what can you|capabilities|features|assist|support)/i,
            current_section: /(where am i|current|this section|this page|what is this)/i
        };

        for (const [intent, pattern] of Object.entries(patterns)) {
            if (pattern.test(query)) {
                // Extract entity if present
                let entity = null;
                if (intent === 'research') {
                    if (/quantum/i.test(query)) entity = 'quantum';
                    else if (/deep\s*learning/i.test(query)) entity = 'deep learning';
                    else if (/machine\s*learning|ml/i.test(query)) entity = 'machine learning';
                    else if (/ai|artificial/i.test(query)) entity = 'ai';
                    else if (/llm|language\s*model/i.test(query)) entity = 'llm';
                }
                if (intent === 'events') {
                    if (/upcoming/i.test(query)) entity = 'upcoming';
                    else if (/ongoing/i.test(query)) entity = 'ongoing';
                    else if (/completed|past/i.test(query)) entity = 'completed';
                }
                if (intent === 'navigation') {
                    const match = query.match(/(home|about|research|faculty|events|gallery|contact|achievement)/i);
                    entity = match ? match[1].toLowerCase() : null;
                }
                return { type: intent, entity };
            }
        }

        return { type: 'unknown', entity: null };
    }

    // ==========================================
    // RESPONSE HANDLERS
    // ==========================================
    handleGreeting() {
        const greetings = [
            `Hello! 👋 Welcome to the Nxt-Gen Computing department. I'm here to help you explore our research, faculty, events, and more. What would you like to know?`,
            `Hi there! Great to see you. I can tell you about our cutting-edge research, amazing faculty, or upcoming events. What interests you?`,
            `Hey! 🎓 I'm your guide to everything Nxt-Gen Computing. Ask me anything about the department!`
        ];
        return greetings[Math.floor(Math.random() * greetings.length)];
    }

    handleAbout() {
        return `<strong>About Nxt-Gen Computing</strong><br><br>${this.knowledgeBase.about}<br><br>We have <strong>${this.knowledgeBase.stats.faculty} expert faculty</strong>, <strong>${this.knowledgeBase.stats.students} students</strong>, and have published <strong>${this.knowledgeBase.stats.papers} research papers</strong>.<br><br>Would you like to know about our <a href="#research" onclick="document.getElementById('ai-assistant').classList.remove('open')">research areas</a> or <a href="#faculty" onclick="document.getElementById('ai-assistant').classList.remove('open')">faculty</a>?`;
    }

    handleVisionMission() {
        return `<strong>🌍 Our Vision</strong><br>${this.knowledgeBase.vision}<br><br><strong>🚀 Our Mission</strong><br>• ${this.knowledgeBase.mission.join('<br>• ')}<br><br>You can see more details in the <a href="#vision-mission" onclick="document.getElementById('ai-assistant').classList.remove('open')">Vision & Mission section</a>.`;
    }

    handleResearch(entity) {
        if (entity) {
            const area = this.knowledgeBase.research.find(r =>
                r.area.toLowerCase().includes(entity.toLowerCase())
            );
            if (area) {
                return `<strong>${area.area}</strong><br>${area.description}<br><br>This is one of our core research focus areas. Our faculty and students are actively working on projects in this domain.<br><br>Want to explore other research areas or meet the <a href="#faculty" onclick="document.getElementById('ai-assistant').classList.remove('open')">faculty working in this field</a>?`;
            }
        }

        const areas = this.knowledgeBase.research.map(r => `• <strong>${r.area}</strong>`).join('<br>');
        return `<strong>Research Focus Areas</strong><br><br>${areas}<br><br>Our department focuses on cutting-edge computing technologies. Click on <a href="#research" onclick="document.getElementById('ai-assistant').classList.remove('open')">Research</a> to explore more!`;
    }

    handleFaculty(entity) {
        if (this.knowledgeBase.faculty.length > 0) {
            const facultyList = this.knowledgeBase.faculty.slice(0, 3).map(f =>
                `• <strong>${f.name}</strong> - ${f.position}`
            ).join('<br>');

            return `<strong>Our Faculty</strong><br><br>${facultyList}<br><br>...and more! We have ${this.knowledgeBase.stats.faculty} expert faculty members. Visit the <a href="#faculty" onclick="document.getElementById('ai-assistant').classList.remove('open')">Faculty section</a> to see everyone and their profiles.`;
        }
        return `We have <strong>${this.knowledgeBase.stats.faculty} expert faculty members</strong> specializing in AI, Machine Learning, Quantum Computing, and more. Check out the <a href="#faculty" onclick="document.getElementById('ai-assistant').classList.remove('open')">Faculty section</a> to meet them!`;
    }

    handleEvents(status) {
        const filterText = status ? status : 'all';

        if (this.knowledgeBase.events.length > 0) {
            const now = new Date();
            let filtered = this.knowledgeBase.events;

            if (status === 'upcoming') {
                filtered = this.knowledgeBase.events.filter(e => new Date(e.eventStart) > now);
            } else if (status === 'ongoing') {
                filtered = this.knowledgeBase.events.filter(e =>
                    new Date(e.eventStart) <= now && new Date(e.eventEnd) >= now
                );
            } else if (status === 'completed') {
                filtered = this.knowledgeBase.events.filter(e => new Date(e.eventEnd) < now);
            }

            if (filtered.length > 0) {
                const eventList = filtered.slice(0, 2).map(e =>
                    `• <strong>${e.title}</strong> - ${e.venue}`
                ).join('<br>');
                return `<strong>${status ? status.charAt(0).toUpperCase() + status.slice(1) : 'Our'} Events</strong><br><br>${eventList}<br><br>Check the <a href="#events" onclick="document.getElementById('ai-assistant').classList.remove('open')">Events section</a> for more details!`;
            }
            return `No ${status || ''} events found at the moment. Check back soon or visit the <a href="#events" onclick="document.getElementById('ai-assistant').classList.remove('open')">Events section</a>!`;
        }

        return `We regularly host workshops, seminars, and conferences. Visit the <a href="#events" onclick="document.getElementById('ai-assistant').classList.remove('open')">Events section</a> to see what's happening!`;
    }

    handleContact() {
        const c = this.knowledgeBase.contact;
        return `<strong>📞 Contact Us</strong><br><br>📍 <strong>Address:</strong> ${c.address}<br><br>📱 <strong>Phone:</strong> ${c.phone}<br><br>📧 <strong>Email:</strong> <a href="mailto:${c.email}">${c.email}</a><br><br>🌐 <strong>Website:</strong> ${c.website}<br><br>You can also fill out the form in the <a href="#contact" onclick="document.getElementById('ai-assistant').classList.remove('open')">Contact section</a>.`;
    }

    handleNavigation(section) {
        if (section) {
            const sectionInfo = this.knowledgeBase.sections.find(s =>
                s.id.toLowerCase().includes(section) || s.name.toLowerCase().includes(section)
            );

            if (sectionInfo) {
                // Trigger navigation
                setTimeout(() => {
                    const el = document.getElementById(sectionInfo.id);
                    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 500);

                return `Taking you to <strong>${sectionInfo.name}</strong>! 🚀<br><br>${sectionInfo.description}. Let me know if you need anything else!`;
            }
        }

        const sections = this.knowledgeBase.sections.map(s =>
            `• <a href="#${s.id}" onclick="document.getElementById('ai-assistant').classList.remove('open')">${s.name}</a>`
        ).join('<br>');
        return `<strong>Available Sections</strong><br><br>${sections}<br><br>Click any section or tell me where you'd like to go!`;
    }

    handleStats() {
        const s = this.knowledgeBase.stats;
        return `<strong>📊 Department Statistics</strong><br><br>👨‍🏫 <strong>Faculty:</strong> ${s.faculty} experts<br>🎓 <strong>Students:</strong> ${s.students}<br>📄 <strong>Research Papers:</strong> ${s.papers}<br>🤝 <strong>Industry Partners:</strong> ${s.partners}<br><br>We're also <strong>NAAC A++ Accredited</strong> with <strong>100% Placement</strong> record!`;
    }

    handleHelp() {
        return `<strong>🤖 How I Can Help</strong><br><br>I can answer questions about:<br>• 📚 <strong>Department overview</strong> - About, vision, mission<br>• 🔬 <strong>Research areas</strong> - AI, ML, Quantum, etc.<br>• 👨‍🏫 <strong>Faculty</strong> - Profiles, expertise<br>• 📅 <strong>Events</strong> - Upcoming, ongoing, past<br>• 📞 <strong>Contact</strong> - Address, phone, email<br>• 🧭 <strong>Navigation</strong> - Guide you to any section<br><br>Just ask naturally, like you're talking to a friend!`;
    }

    handleCurrentSection() {
        const section = this.getCurrentSectionInfo();
        return `You're currently viewing the <strong>${section.name}</strong> section.<br><br>${section.description}<br><br>Would you like me to tell you more about this section or navigate somewhere else?`;
    }

    handleThanks() {
        const responses = [
            "You're welcome! 😊 Let me know if there's anything else I can help with!",
            "Happy to help! Feel free to ask if you have more questions.",
            "Anytime! I'm here to make your exploration easier. 🎓"
        ];
        return responses[Math.floor(Math.random() * responses.length)];
    }

    handleUnknown(query) {
        const section = this.getCurrentSectionInfo();
        const suggestions = [
            `I'm not sure I understand that completely. Try asking about our <strong>research</strong>, <strong>faculty</strong>, or <strong>events</strong>.`,
            `Hmm, I couldn't find specific info on that. You're currently in the ${section.name} section - would you like to know more about it?`,
            `I'm still learning! You can ask me about the department, research areas, faculty, events, or how to contact us.`
        ];
        return suggestions[Math.floor(Math.random() * suggestions.length)] +
            `<br><br>💡 <em>Tip: Try questions like "What is this department about?" or "Show me the research areas"</em>`;
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new NxtGenAssistant());
} else {
    new NxtGenAssistant();
}
