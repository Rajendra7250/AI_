"use client";

import { motion } from "framer-motion";
import { Book, PlayCircle, Code } from "lucide-react";

export default function StudyPage() {
  const roadmap = [
    { title: "HTML & CSS Core", topic: "Variables, Flexbox, Grid", done: true },
    { title: "JavaScript Fundamentals", topic: "Closures, Event Loop, Promises", done: true },
    { title: "React Deep Dive", topic: "Hooks, Performance, Context", done: false },
    { title: "System Design", topic: "Caching, Load Balancing, DBs", done: false }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
        <h1 className="text-4xl font-extrabold text-white mb-2">Study Roadmap</h1>
        <p className="text-gray-400">Structured paths to master your target role.</p>
      </motion.div>
      
      <div className="relative border-l-2 border-white/10 ml-6 pl-8 space-y-8 mt-12">
        {roadmap.map((item, idx) => (
          <motion.div 
            initial={{ opacity: 0, x: -20 }} 
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            key={idx} 
            className="relative"
          >
            <div className={`absolute -left-[41px] top-1 w-5 h-5 rounded-full border-4 border-background ${item.done ? "bg-primary" : "bg-gray-600"}`} />
            <div className={`glass p-6 rounded-2xl border ${item.done ? "border-primary/30" : "border-white/5 opacity-70"}`}>
              <h3 className="text-xl font-bold text-white mb-1">{item.title}</h3>
              <p className="text-gray-400 mb-4">{item.topic}</p>
              
              <div className="flex gap-4">
                <button className="flex items-center gap-2 text-sm text-white/70 hover:text-primary transition-colors">
                  <PlayCircle size={16} /> Watch Lesson
                </button>
                <button className="flex items-center gap-2 text-sm text-white/70 hover:text-secondary transition-colors">
                  <Code size={16} /> Practice Challenge
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
