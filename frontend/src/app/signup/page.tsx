"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { UserPlus, User, Mail, Lock, Globe, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate signup
    // In production, integrate with http://localhost:8000/auth/signup
    try {
        const response = await fetch("http://localhost:8000/auth/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, password }),
        });
        
        // Even if it's a mock response, we'll wait a bit for effect
        setTimeout(() => {
            router.push("/login");
        }, 1200);
    } catch (error) {
        console.error("Signup failed:", error);
        setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-background">
      {/* Background Orbs */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-40 -left-40 w-96 h-96 bg-primary rounded-full mix-blend-screen filter blur-[128px] opacity-40 pointer-events-none"
      />
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
        className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-secondary rounded-full mix-blend-screen filter blur-[128px] opacity-40 pointer-events-none"
      />

      <div className="z-10 w-full max-w-6xl flex shadow-2xl rounded-3xl overflow-hidden glass glass-shift min-h-[700px] m-4">
        {/* Left Side: Animated AI Graphic (Visible on desktop) */}
        <div className="w-1/2 hidden md:flex flex-col items-center justify-center relative overflow-hidden bg-opacity-20 bg-black p-10 border-r border-white/10">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center z-10"
          >
            <h1 className="text-5xl font-extrabold text-gradient mb-6">
              Join AIPS
            </h1>
            <p className="text-xl text-gray-300 font-medium">
              Start your journey to career excellence with AI-powered preparation.
            </p>
          </motion.div>

          {/* Futuristic mesh/particle representation */}
          <div className="absolute inset-0 z-0 opacity-30 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/20 via-background to-background"></div>
        </div>

        {/* Right Side: Signup Form */}
        <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-10 relative">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full max-w-md"
          >
            <h2 className="text-3xl font-bold mb-2 text-white">Create Account</h2>
            <p className="text-gray-400 mb-8">
              Join thousands of professionals mastering their interviews.
            </p>

            <form className="space-y-6" onSubmit={handleSignup}>
              {/* Full Name Field */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <User size={20} />
                </div>
                <input
                  type="text"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-10 py-4 text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              {/* Email Field */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <Mail size={20} />
                </div>
                <input
                  type="email"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-10 py-4 text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              {/* Password Field */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <Lock size={20} />
                </div>
                <input
                  type="password"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-10 py-4 text-white focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-all outline-none"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="text-xs text-gray-500 px-1">
                By signing up, you agree to our <Link href="#" className="underline hover:text-primary">Terms of Service</Link> and <Link href="#" className="underline hover:text-primary">Privacy Policy</Link>.
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 rounded-xl text-white font-bold text-lg bg-gradient-to-r from-primary to-secondary shadow-[0_0_20px_rgba(255,122,24,0.3)] hover:shadow-[0_0_30px_rgba(255,60,172,0.5)] transition-all disabled:opacity-50"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? "Creating Account..." : "Sign Up"} {!isLoading && <UserPlus className="inline ml-2" size={20} />}
              </motion.button>
            </form>

            <div className="mt-8 flex items-center justify-center space-x-4">
              <div className="h-[1px] bg-white/10 w-full" />
              <span className="text-gray-500 text-sm">or</span>
              <div className="h-[1px] bg-white/10 w-full" />
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="mt-8 w-full py-4 rounded-xl text-white font-medium flex items-center justify-center space-x-3 border border-white/10 bg-white/5 hover:bg-white/10 transition-all"
            >
              <Globe size={20} />
              <span>Sign up with Google</span>
            </motion.button>

            <p className="mt-8 text-center text-gray-400">
              Already have an account?{" "}
              <Link href="/login" className="text-secondary font-medium hover:text-primary transition-colors hover:underline flex items-center justify-center mt-1">
                Log in instead <ArrowRight size={16} className="ml-1" />
              </Link>
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
