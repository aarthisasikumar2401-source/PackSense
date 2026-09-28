import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Package } from 'lucide-react';

const Chat = () => {
  const [messages, setMessages] = useState([
    { id: 1, sender: 'bot', text: 'Hello! I am the PackSense assistant. Ask me anything about food packaging materials, properties, or sustainable options.' }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = { id: Date.now(), sender: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');

    // Local deterministic responses
    setTimeout(() => {
      let botResponse = "I'm sorry, I don't have information on that specific topic. Try asking about OTR, WVTR, PET, PE, or sustainable packaging.";
      const query = userMsg.text.toLowerCase();

      if (query.includes('chips') || query.includes('snacks')) {
        botResponse = "For chips and snacks, a high moisture and oxygen barrier is crucial to maintain crispness and prevent rancidity. Metallized BOPP or aluminum foil laminates are industry standards.";
      } else if (query.includes('wvtr')) {
        botResponse = "WVTR stands for Water Vapor Transmission Rate. It measures how much moisture passes through a material. Low WVTR is essential for dry foods like biscuits to prevent them from becoming soggy.";
      } else if (query.includes('otr')) {
        botResponse = "OTR stands for Oxygen Transmission Rate. It measures the amount of oxygen gas that passes through a substance over a given period. Low OTR is critical for foods sensitive to oxidation, like meats or nuts.";
      } else if (query.includes('sustainable') || query.includes('sustainability') || query.includes('recyclable')) {
        botResponse = "Sustainable packaging trends focus on mono-materials (like all-PE structures) which are easier to recycle than multi-layer laminates, as well as compostable films like PLA, or incorporating Post-Consumer Recycled (PCR) content.";
      } else if (query.includes('paneer') || query.includes('dairy')) {
        botResponse = "Paneer and dairy products require excellent oxygen barrier to prevent mold growth, and a good moisture barrier. Vacuum packaging using PA/PE (Nylon/Polyethylene) or thermoformed PET/PE trays are highly recommended.";
      } else if (query.includes('metallized bopp')) {
        botResponse = "Metallized BOPP is BOPP film coated with a very thin layer of aluminum. It significantly improves the oxygen and moisture barrier compared to plain BOPP, while also providing a light barrier and a premium shiny appearance.";
      }

      setMessages(prev => [...prev, { id: Date.now() + 1, sender: 'bot', text: botResponse }]);
    }, 600);
  };

  return (
    <div className="max-w-4xl mx-auto h-[calc(100vh-8rem)] flex flex-col">
      <div className="mb-4">
        <h1 className="text-3xl font-bold text-slate-900">PackSense Assistant</h1>
        <p className="mt-1 text-slate-600">Local intelligent packaging knowledge base.</p>
      </div>

      <div className="flex-1 bg-white border border-slate-200 rounded-2xl shadow-sm flex flex-col overflow-hidden">
        <div className="flex-1 p-6 overflow-y-auto space-y-6 bg-slate-50">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex gap-4 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${msg.sender === 'bot' ? 'bg-brand-100 text-brand-600' : 'bg-slate-800 text-white'}`}>
                {msg.sender === 'bot' ? <Package size={20} /> : <User size={20} />}
              </div>
              <div className={`max-w-[75%] px-5 py-3 rounded-2xl shadow-sm ${msg.sender === 'user' ? 'bg-slate-800 text-white rounded-tr-none' : 'bg-white border border-slate-200 text-slate-800 rounded-tl-none'}`}>
                {msg.text}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        
        <form onSubmit={handleSend} className="p-4 bg-white border-t border-slate-200 flex gap-2">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about materials, properties, or food compatibility..."
            className="flex-1 px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-brand-500 outline-none"
          />
          <button type="submit" className="bg-brand-600 text-white px-5 py-3 rounded-xl hover:bg-brand-700 transition-colors flex items-center justify-center">
            <Send size={20} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
