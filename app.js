// Main App Component
const { useState, useRef, useEffect } = React;
const { Send, MessageCircle, Utensils, Clock, Star } = window.Icons;

const FoodyBuddyChat = () => {
  // State Management
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hey there! I'm Foody Buddy 🍽️ Your personal food companion! I can help you with recipes, restaurant recommendations, dietary tips, and all things food-related. What can I cook up for you today?",
      sender: 'bot',
      timestamp: new Date().toLocaleTimeString(),
      type: 'greeting'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Bot Response Logic
  const getFoodResponse = (userMessage) => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('recipe') || message.includes('cook') || message.includes('make')) {
      return {
        text: "I'd love to help you with a recipe! Here's a quick suggestion: Try making a simple pasta aglio e olio - just garlic, olive oil, pasta, and red pepper flakes. It's delicious and takes only 15 minutes! Would you like the full recipe or something else?",
        type: 'recipe',
        suggestions: ['Get full recipe', 'Different cuisine', 'Quick meals']
      };
    } else if (message.includes('restaurant') || message.includes('eat out')) {
      return {
        text: "Looking for a great place to eat? I'd recommend checking out local Italian or Asian fusion spots - they usually have diverse menus. What type of cuisine are you in the mood for?",
        type: 'restaurant',
        suggestions: ['Italian', 'Asian', 'American', 'Mexican']
      };
    } else if (message.includes('healthy') || message.includes('diet')) {
      return {
        text: "Great choice focusing on healthy eating! Consider incorporating more colorful vegetables, lean proteins, and whole grains. Mediterranean-style meals are both nutritious and delicious. What are your dietary goals?",
        type: 'health',
        suggestions: ['Meal planning', 'Weight loss', 'More energy', 'Muscle building']
      };
    } else if (message.includes('dessert') || message.includes('sweet')) {
      return {
        text: "Sweet tooth calling? 🍰 How about trying chocolate-dipped strawberries or a simple fruit parfait? They satisfy cravings while being relatively light. Want something more indulgent?",
        type: 'dessert',
        suggestions: ['Chocolate recipes', 'Fruit desserts', 'Baking tips']
      };
    } else {
      return {
        text: "That sounds interesting! I'm here to help with all your food adventures. Whether you need recipes, restaurant recommendations, cooking tips, or dietary advice - just let me know what you're craving!",
        type: 'general',
        suggestions: ['Show me recipes', 'Find restaurants', 'Healthy options', 'Cooking tips']
      };
    }
  };

  // Message Handling
  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      text: inputText,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate bot response delay
    setTimeout(() => {
      const botResponse = getFoodResponse(inputText);
      const botMessage = {
        id: messages.length + 2,
        text: botResponse.text,
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString(),
        type: botResponse.type,
        suggestions: botResponse.suggestions
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSuggestionClick = (suggestion) => {
    setInputText(suggestion);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // UI Helper Functions
  const getMessageIcon = (type) => {
    switch (type) {
      case 'recipe': return React.createElement(Utensils, { className: "w-4 h-4 text-orange-500" });
      case 'restaurant': return React.createElement(Utensils, { className: "w-4 h-4 text-blue-500" });
      case 'health': return React.createElement(Star, { className: "w-4 h-4 text-green-500" });
      case 'dessert': return React.createElement(Star, { className: "w-4 h-4 text-pink-500" });
      default: return React.createElement(MessageCircle, { className: "w-4 h-4 text-purple-500" });
    }
  };

  // Render Component
  return React.createElement('div', {
    className: "flex flex-col h-screen max-w-4xl mx-auto bg-gradient-to-br from-orange-50 to-red-50"
  }, [
    // Header
    React.createElement('div', {
      key: 'header',
      className: "bg-white shadow-lg border-b border-orange-200"
    }, React.createElement('div', {
      className: "flex items-center justify-between p-4"
    }, [
      React.createElement('div', {
        key: 'brand',
        className: "flex items-center space-x-3"
      }, [
        React.createElement('div', {
          key: 'logo',
          className: "w-10 h-10 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center"
        }, React.createElement(Utensils, { className: "w-6 h-6 text-white" })),
        React.createElement('div', { key: 'title' }, [
          React.createElement('h1', {
            key: 'h1',
            className: "text-xl font-bold text-gray-800"
          }, "Foody Buddy"),
          React.createElement('p', {
            key: 'subtitle',
            className: "text-sm text-gray-600"
          }, "Your personal food companion")
        ])
      ]),
      React.createElement('div', {
        key: 'status',
        className: "flex items-center space-x-2 text-sm text-gray-500"
      }, [
        React.createElement(Clock, { key: 'clock', className: "w-4 h-4" }),
        React.createElement('span', { key: 'online' }, "Online")
      ])
    ])),

    // Messages Container
    React.createElement('div', {
      key: 'messages',
      className: "flex-1 overflow-y-auto p-4 space-y-4"
    }, [
      ...messages.map((message) => 
        React.createElement('div', {
          key: message.id,
          className: `flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} message-fade-in`
        }, React.createElement('div', {
          className: `max-w-xs lg:max-w-md xl:max-w-lg ${
            message.sender === 'user' 
              ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white' 
              : 'bg-white border border-gray-200 text-gray-800'
          } rounded-2xl px-4 py-3 shadow-sm`
        }, [
          message.sender === 'bot' && React.createElement('div', {
            key: 'bot-header',
            className: "flex items-center space-x-2 mb-2"
          }, [
            getMessageIcon(message.type),
            React.createElement('span', {
              key: 'bot-name',
              className: "text-xs font-medium text-gray-600"
            }, "Foody Buddy")
          ]),
          React.createElement('p', {
            key: 'text',
            className: "text-sm leading-relaxed"
          }, message.text),
          React.createElement('p', {
            key: 'timestamp',
            className: `text-xs mt-2 ${message.sender === 'user' ? 'text-orange-100' : 'text-gray-500'}`
          }, message.timestamp),
          message.suggestions && React.createElement('div', {
            key: 'suggestions',
            className: "mt-3 flex flex-wrap gap-2"
          }, message.suggestions.map((suggestion, index) =>
            React.createElement('button', {
              key: index,
              onClick: () => handleSuggestionClick(suggestion),
              className: "px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs hover:bg-orange-200 transition-colors suggestion-btn"
            }, suggestion)
          ))
        ]))
      ),
      
      // Typing Indicator
      isTyping && React.createElement('div', {
        key: 'typing',
        className: "flex justify-start"
      }, React.createElement('div', {
        className: "bg-white border border-gray-200 rounded-2xl px-4 py-3 shadow-sm max-w-xs"
      }, [
        React.createElement('div', {
          key: 'typing-header',
          className: "flex items-center space-x-2"
        }, [
          React.createElement(Utensils, { key: 'typing-icon', className: "w-4 h-4 text-orange-500" }),
          React.createElement('span', {
            key: 'typing-text',
            className: "text-xs font-medium text-gray-600"
          }, "Foody Buddy is typing")
        ]),
        React.createElement('div', {
          key: 'typing-dots',
          className: "flex space-x-1 mt-2"
        }, [
          React.createElement('div', {
            key: 'dot1',
            className: "w-2 h-2 bg-orange-400 rounded-full animate-bounce"
          }),
          React.createElement('div', {
            key: 'dot2',
            className: "w-2 h-2 bg-orange-400 rounded-full animate-bounce",
            style: { animationDelay: '0.1s' }
          }),
          React.createElement('div', {
            key: 'dot3',
            className: "w-2 h-2 bg-orange-400 rounded-full animate-bounce",
            style: { animationDelay: '0.2s' }
          })
        ])
      ])),
      
      React.createElement('div', { key: 'scroll-anchor', ref: messagesEndRef })
    ]),

    // Input Area
    React.createElement('div', {
      key: 'input-area',
      className: "bg-white border-t border-orange-200 p-4"
    }, [
      React.createElement('div', {
        key: 'input-container',
        className: "flex space-x-3"
      }, [
        React.createElement('div', {
          key: 'textarea-container',
          className: "flex-1 relative"
        }, React.createElement('textarea', {
          value: inputText,
          onChange: (e) => setInputText(e.target.value),
          onKeyPress: handleKeyPress,
          placeholder: "Ask me about recipes, restaurants, or anything food-related...",
          className: "w-full p-3 pr-12 border border-gray-300 rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent",
          rows: 1,
          style: { minHeight: '48px', maxHeight: '120px' }
        })),
        React.createElement('button', {
          key: 'send-btn',
          onClick: handleSendMessage,
          disabled: !inputText.trim() || isTyping,
          className: "bg-gradient-to-r from-orange-500 to-red-500 text-white p-3 rounded-2xl hover:from-orange-600 hover:to-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl btn-primary"
        }, React.createElement(Send, { className: "w-5 h-5" }))
      ]),
      
      React.createElement('div', {
        key: 'quick-suggestions',
        className: "flex flex-wrap gap-2 mt-3"
      }, ['Recipe ideas', 'Healthy meals', 'Quick cooking tips', 'Restaurant finder'].map((suggestion) =>
        React.createElement('button', {
          key: suggestion,
          onClick: () => handleSuggestionClick(suggestion),
          className: "px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm hover:bg-orange-200 transition-colors suggestion-btn"
        }, suggestion)
      ))
    ])
  ]);
};

// Render the app
ReactDOM.render(React.createElement(FoodyBuddyChat), document.getElementById('root'));
