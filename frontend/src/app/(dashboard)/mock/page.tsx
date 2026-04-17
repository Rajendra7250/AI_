"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mic, Send, Bot, User, CheckCircle } from "lucide-react";

export default function MockInterviewPage() {
  const [messages, setMessages] = useState([
    { role: "ai", text: "Hello! I'm your AI interviewer. Are you ready to begin your mock session for the Senior AI Engineer role?" }
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages(prev => [...prev, { role: "user", text: input }]);
    setInput("");
    
    // Fake AI Response
    setTimeout(() => {
      setMessages(prev => [...prev, { role: "ai", text: "That's a solid answer. Can you elaborate on how you optimized the inference latency?" }]);
    }, 1500);
  };

  return (
    <div className="max-w-5xl mx-auto h-[calc(100vh-80px)] flex flex-col space-y-6">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-extrabold text-white mb-2">Live Interview</h1>
          <p className="text-gray-400">Simulate a real technical round with voice and text.</p>
        </div>
        <div className="glass px-6 py-3 rounded-full flex items-center space-x-3 border-primary/30">
          <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
          <span className="text-white font-medium">Recording</span>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }} 
        animate={{ opacity: 1, scale: 1 }} 
        className="flex-1 glass rounded-3xl p-6 flex flex-col overflow-hidden relative"
      >
        <div className="flex-1 overflow-y-auto space-y-6 pr-4 custom-scrollbar">
          {messages.map((msg, i) => (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              key={i}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div className={`flex items-start max-w-[80%] space-x-3 ${msg.role === "user" ? "flex-row-reverse space-x-reverse" : "flex-row"}`}>
                <div className={`p-3 rounded-full flex-shrink-0 ${msg.role === "ai" ? "bg-gradient-to-r from-primary to-secondary" : "bg-white/10"}`}>
                  {msg.role === "ai" ? <Bot size={20} className="text-white" /> : <User size={20} className="text-white" />}
                </div>
                <div className={`p-5 rounded-2xl ${msg.role === "ai" ? "glass border-primary/20 text-white" : "bg-white/10 text-white"}`}>
                  {msg.text}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-6 pt-6 border-t border-white/10 flex items-center space-x-4">
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="p-4 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-red-400 transition-colors">
            <Mic size={24} />
          </motion.button>
          
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Type your response..."
            className="flex-1 bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-primary transition-all"
          />
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSend}
            className="p-4 rounded-xl bg-gradient-to-r from-primary to-secondary text-white shadow-[0_0_15px_rgba(255,122,24,0.3)]"
          >
            <Send size={24} />
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
