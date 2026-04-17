"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FileDown, Sparkles, Send, AlertTriangle } from "lucide-react";
import ReactMarkdown from "react-markdown";

export default function ResumeBuilderPage() {
  const [formData, setFormData] = useState({ name: "", role: "", experience: "", skills: "" });
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    setError(null);
    setResult(null);
    
    try {
      const res = await fetch("http://127.0.0.1:8000/resume/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });
      
      if (!res.ok) {
        throw new Error("Failed to generate resume");
      }
      
      const data = await res.json();
      setResult(data.resume_markdown);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-4xl font-extrabold text-white mb-2">AI Resume Builder</h1>
        <p className="text-gray-400">Transform your experiences into an ATS-friendly masterpiece.</p>
      </motion.div>

      <div className="grid grid-cols-1 gap-8">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="glass p-8 rounded-3xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Full Name</label>
                <input
                  type="text"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Target Role</label>
                <input
                  type="text"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                  placeholder="Senior Frontend Developer"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Experience & Achievements</label>
              <textarea
                rows={5}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                placeholder="List your key achievements, companies, and metrics..."
                value={formData.experience}
                onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Core Skills</label>
              <input
                type="text"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                placeholder="React, Next.js, Python, System Design..."
                value={formData.skills}
                onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                required
              />
            </div>

            {error && (
              <div className="flex items-center space-x-2 text-red-400 bg-red-400/10 p-4 rounded-xl border border-red-400/20">
                <AlertTriangle size={20} />
                <span>{error}</span>
              </div>
            )}

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isGenerating}
              className={`w-full py-4 rounded-xl text-white font-bold text-lg flex items-center justify-center space-x-2 transition-all ${
                isGenerating ? "bg-gray-600 cursor-not-allowed" : "bg-gradient-to-r from-primary to-secondary shadow-[0_0_20px_rgba(255,122,24,0.3)] hover:shadow-[0_0_30px_rgba(255,60,172,0.5)]"
              }`}
            >
              {isGenerating ? (
                <>
                  <Sparkles className="animate-spin" size={20} />
                  <span>Generating Magic...</span>
                </>
              ) : (
                <>
                  <span>Generate ATS Resume</span>
                  <Send size={20} />
                </>
              )}
            </motion.button>
          </form>
        </motion.div>

        {result && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass p-8 rounded-3xl relative">
            <button className="absolute top-6 right-6 p-2 rounded-xl bg-white/5 hover:bg-white/10 text-primary transition-colors flex items-center gap-2">
              <FileDown size={18} />
              <span className="text-sm font-medium">Download PDF</span>
            </button>
            <h2 className="text-2xl font-bold text-white mb-6 pr-32">Generated Resume</h2>
            <div className="prose prose-invert prose-primary max-w-none">
              <ReactMarkdown>{result}</ReactMarkdown>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
