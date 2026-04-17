"use client";

import { motion } from "framer-motion";
import { HelpCircle, ChevronDown, Sparkles, AlertTriangle } from "lucide-react";
import { useState } from "react";
import ReactMarkdown from "react-markdown";

export default function InterviewQAPage() {
  const [role, setRole] = useState("");
  const [experience, setExperience] = useState("junior");
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!role.trim()) {
      setError("Please specify a role.");
      return;
    }
    
    setIsGenerating(true);
    setError(null);
    setResult(null);
    
    try {
      const res = await fetch(`http://127.0.0.1:8000/interview/questions?role=${encodeURIComponent(role)}&experience=${encodeURIComponent(experience)}`, {
        method: "POST"
      });
      
      if (!res.ok) {
        throw new Error("Failed to generate questions");
      }
      
      const data = await res.json();
      setResult(data.questions_markdown);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
        <h1 className="text-4xl font-extrabold text-white mb-2">Q&A Generator</h1>
        <p className="text-gray-400">Personalized technical and behavioral questions.</p>
      </motion.div>
      
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass p-6 rounded-3xl flex flex-col md:flex-row gap-4">
        <input 
          type="text" 
          placeholder="Role (e.g. Frontend)" 
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-primary" 
        />
        <select 
          value={experience}
          onChange={(e) => setExperience(e.target.value)}
          className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-primary"
        >
          <option value="junior" className="bg-background">Junior (0-2 Yrs)</option>
          <option value="mid" className="bg-background">Mid (2-5 Yrs)</option>
          <option value="senior" className="bg-background">Senior (5+ Yrs)</option>
        </select>
        <button 
          onClick={handleGenerate}
          disabled={isGenerating}
          className={`px-8 py-3 rounded-xl text-white font-bold flex items-center justify-center gap-2 transition-all ${
            isGenerating ? "bg-gray-600 cursor-not-allowed" : "bg-gradient-to-r from-primary to-secondary"
          }`}
        >
          {isGenerating ? <><Sparkles size={20} className="animate-spin" /> Generating...</> : <><HelpCircle size={20} /> Generate</>}
        </button>
      </motion.div>

      {error && (
        <div className="flex items-center space-x-2 text-red-400 bg-red-400/10 p-4 rounded-xl border border-red-400/20">
          <AlertTriangle size={20} />
          <span>{error}</span>
        </div>
      )}

      {result && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-8 relative">
          <h2 className="text-2xl font-bold text-white mb-6">Generated Questions</h2>
          <div className="glass p-8 rounded-3xl prose prose-invert prose-primary max-w-none">
            <ReactMarkdown>{result}</ReactMarkdown>
          </div>
        </motion.div>
      )}
    </div>
  );
}
