import React, { useState, useEffect, useRef } from 'react';
import '../styles/chatbot.css';

interface Message {
  id: string;
  text: string;
  sender: 'bot' | 'user';
  timestamp: string;
  isAnalyzing?: boolean;
  isTyping?: boolean;
}

const QUICK_REPLIES = [
  "What is Zynx AI?",
  "Meet the team",
  "What can your AI do?",
  "Tell me about Zentalic Labs",
  "Can you generate ads?"
];

const COMPANY_KNOWLEDGE = {
  zynx: "Zynx AI is the flagship AI platform by Zentalic Labs, currently in development. It is designed to help businesses and creators generate advertisements, promo videos, and AI marketing campaigns in one click.",
  zentalic: "Zentalic Labs is a startup AI company focused on business automation, intelligent tools, and futuristic digital solutions for marketing, branding, and content generation.",
  team: "The Zentalic Labs team consists of A. Adarsh (CEO & CTO), Karthik T.S (CFO & COO), and Thejus R (CMO).",
  ceo: "The CEO and CTO of Zentalic Labs is A. Adarsh.",
  cto: "A. Adarsh serves as both the CEO and CTO of Zentalic Labs.",
  karthik: "Karthik T.S is the CFO and COO of Zentalic Labs, managing the company's finances and operations.",
  thejus: "Thejus R is the CMO of Zentalic Labs, leading our marketing and branding strategies.",
  ads: "Yes! Zynx AI can generate advertisements, promo videos, and social media content with just a few clicks.",
  videos: "Zynx AI is excellent at creating high-quality promo videos for your products and services.",
  features: "Zynx AI is currently in development and will offer one-click ad generation, promo video creation, AI marketing campaigns, business asset branding, and automated workflow solutions.",
  zen: "I'm Zen, the official AI assistant for Zynx AI and Zentalic Labs. I'm here to help you with anything related to our platform!",
  about: "Zentalic Labs is building futuristic AI systems, including the upcoming Zynx AI platform (currently in development), that help businesses automate marketing, branding, and workflow operations.",
};

const ZenChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isBotThinking, setIsBotThinking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize chat
  useEffect(() => {
    const savedMessages = localStorage.getItem('zen_chat_history');
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    } else {
      const welcomeMessage: Message = {
        id: '1',
        text: "Hey, I’m Zen 👋\nYour AI assistant for Zynx AI and Zentalic Labs.\nAsk me anything about our platform, team, or AI tools.",
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages([welcomeMessage]);
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('zen_chat_history', JSON.stringify(messages));
    }
  }, [messages]);

  // Auto scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isBotThinking]);

  const toggleChat = () => setIsOpen(!isOpen);

  const fuzzyMatch = (input: string): string => {
    const text = input.toLowerCase();
    
    // Check for specific intents
    if (text.includes('zynx') || text.includes('zynix') || text.includes('zinx') || text.includes('zinks')) {
      if (text.includes('feature') || text.includes('can') || text.includes('do')) return COMPANY_KNOWLEDGE.features;
      if (text.includes('ad') || text.includes('promo')) return COMPANY_KNOWLEDGE.ads;
      return COMPANY_KNOWLEDGE.zynx;
    }
    
    if (text.includes('zentalic') || text.includes('zentalik')) {
      return COMPANY_KNOWLEDGE.zentalic;
    }
    
    if (text.includes('team') || text.includes('built') || text.includes('who are')) {
      return COMPANY_KNOWLEDGE.team;
    }
    
    if (text.includes('ceo') || text.includes('adarsh') || text.includes('adarh')) {
      return COMPANY_KNOWLEDGE.ceo;
    }
    
    if (text.includes('karthik') || text.includes('ts') || text.includes('cfo') || text.includes('coo')) {
      return COMPANY_KNOWLEDGE.karthik;
    }
    
    if (text.includes('thejus') || text.includes('thejuz') || text.includes('cmo')) {
      return COMPANY_KNOWLEDGE.thejus;
    }
    
    if (text.includes('zen') || text.includes('who are you')) {
      return COMPANY_KNOWLEDGE.zen;
    }
    
    if (text.includes('ad') || text.includes('video') || text.includes('marketing') || text.includes('campaign')) {
      return COMPANY_KNOWLEDGE.ads;
    }
    
    if (text.includes('company') || text.includes('about')) {
      return COMPANY_KNOWLEDGE.about;
    }

    return "I mainly help with information about Zynx AI and Zentalic Labs for now.";
  };

  const handleSend = (text: string) => {
    if (!text.trim() || isBotThinking) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      text: text,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsBotThinking(true);

    // AI Response Sequence
    // 1. Immediately show "Analyzing request..."
    const analyzingMsg: Message = {
      id: 'analyzing-' + Date.now(),
      text: "Analyzing request...",
      sender: 'bot',
      timestamp: '',
      isAnalyzing: true
    };
    setMessages(prev => [...prev, analyzingMsg]);

    // 2. Wait 1 second, then switch to typing dots
    setTimeout(() => {
      setMessages(prev => prev.filter(m => !m.isAnalyzing));
      
      // 3. Show typing dots for 1.5 seconds
      // (typing dots are shown automatically because isBotThinking is true 
      // and we just removed the analyzing message)
      
      setTimeout(() => {
        const responseText = fuzzyMatch(text);
        const botMsg: Message = {
          id: (Date.now() + 1).toString(),
          text: responseText,
          sender: 'bot',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, botMsg]);
        setIsBotThinking(false);
      }, 1500); // Typing dots duration
    }, 1000); // Analyzing duration
  };

  return (
    <div className="zen-chatbot-container">
      {/* Chat Window */}
      <div className={`zen-chat-window ${isOpen ? 'open' : ''}`}>
        <div className="zen-chat-header">
          <div className="zen-header-info">
            <div className="zen-logo">Z</div>
            <div className="zen-header-text">
              <h3>Zen</h3>
              <div className="zen-status">
                <span className="zen-status-dot"></span>
                Online
              </div>
            </div>
          </div>
          <button className="zen-close-btn" onClick={toggleChat}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>

        <div className="zen-chat-messages">
          {messages.map((msg) => (
            <div key={msg.id} className={`zen-message ${msg.sender}`}>
              {msg.isAnalyzing ? (
                <div className="zen-analyzing">{msg.text}</div>
              ) : (
                <>
                  <div className="zen-message-bubble">
                    {msg.text.split('\n').map((line, i) => (
                      <React.Fragment key={i}>
                        {line}
                        {i < msg.text.split('\n').length - 1 && <br />}
                      </React.Fragment>
                    ))}
                  </div>
                  {msg.timestamp && <span className="zen-timestamp">{msg.timestamp}</span>}
                </>
              )}
            </div>
          ))}
          {isBotThinking && !messages.some(m => m.isAnalyzing) && (
            <div className="zen-message bot">
              <div className="zen-typing">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {!isBotThinking && (
          <div className="zen-quick-replies">
            {QUICK_REPLIES.map((reply, index) => (
              <button 
                key={index} 
                className="zen-quick-btn"
                onClick={() => handleSend(reply)}
              >
                {reply}
              </button>
            ))}
          </div>
        )}

        <form 
          className="zen-chat-input-area" 
          onSubmit={(e) => {
            e.preventDefault();
            handleSend(inputValue);
          }}
        >
          <input 
            type="text" 
            className="zen-chat-input" 
            placeholder="Type your message..." 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button type="submit" className="zen-send-btn" disabled={!inputValue.trim() || isBotThinking}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
          </button>
        </form>
      </div>

      {/* Floating Button */}
      <button className={`zen-chat-button ${!isOpen ? 'pulse' : ''}`} onClick={toggleChat}>
        {isOpen ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
        ) : (
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
        )}
      </button>
    </div>
  );
};

export default ZenChatbot;
