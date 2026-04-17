"use client";

import { motion } from "framer-motion";
import { HelpCircle, ChevronDown } from "lucide-react";
import { useState } from "react";

const QAItem = ({ q, a }: { q: string, a: string }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="glass rounded-2xl overflow-hidden border border-white/5 mb-4">
      <div 
        className="p-6 flex justify-between items-center cursor-pointer hover:bg-white/5 transition-colors"
        onClick={() => setOpen(!open)}
      >
        <span className="text-white font-medium pr-4">{q}</span>
        <ChevronDown className={`text-primary transition-transform ${open ? "rotate-180" : ""}`} />
      </div>
      {open && (
        <motion.div 
          initial={{ height: 0, opacity: 0 }} 
          animate={{ height: "auto", opacity: 1 }} 
          className="px-6 pb-6 pt-2 border-t border-white/5 text-gray-400 leading-relaxed bg-black/20"
        >
          {a}
        </motion.div>
      )}
    </div>
  );
};

export default function InterviewQAPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
        <h1 className="text-4xl font-extrabold text-white mb-2">Q&A Generator</h1>
        <p className="text-gray-400">Personalized technical and behavioral questions.</p>
      </motion.div>
      
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass p-6 rounded-3xl flex gap-4">
        <input type="text" placeholder="Role (e.g. Frontend)" className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-primary" />
        <select className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-primary">
          <option value="junior" className="bg-background">Junior (0-2 Yrs)</option>
          <option value="mid" className="bg-background">Mid (2-5 Yrs)</option>
          <option value="senior" className="bg-background">Senior (5+ Yrs)</option>
        </select>
        <button className="px-8 py-3 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-bold flex items-center gap-2">
          <HelpCircle size={20} /> Generate
        </button>
      </motion.div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold text-white mb-6">Generated Questions</h2>
        <div className="space-y-4">
          <QAItem q="How does React Context differ from Zustand or Redux?" a="React Context is a dependency injection mechanism, not a state manager. It forces re-renders on all consumers when the provider value changes. Zustand/Redux use external stores with selectors to only re-render components that subscribe to changed state slices."/>
          <QAItem q="Explain the vDOM and how reconciliation works." a="The Virtual DOM is a lightweight copy of the real DOM in memory. When state changes, React creates a new vDOM tree, compares it with the previous vDOM (diffing), and calculates the minimal set of mutations needed to update the real DOM."/>
        </div>
      </div>
    </div>
  );
}
