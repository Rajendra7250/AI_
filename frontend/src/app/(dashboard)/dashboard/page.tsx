"use client";

import { motion } from "framer-motion";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Target, Trophy, Users, Zap } from "lucide-react";

const mockData = [
  { name: 'Mon', score: 40 },
  { name: 'Tue', score: 55 },
  { name: 'Wed', score: 45 },
  { name: 'Thu', score: 70 },
  { name: 'Fri', score: 65 },
  { name: 'Sat', score: 85 },
  { name: 'Sun', score: 90 },
];

const StatCard = ({ title, value, icon: Icon, delay }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5 }}
    className="glass p-6 rounded-3xl relative overflow-hidden group"
  >
    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    <div className="flex justify-between items-start relative z-10">
      <div>
        <p className="text-gray-400 font-medium mb-1">{title}</p>
        <h3 className="text-4xl font-bold text-white">{value}</h3>
      </div>
      <div className="p-3 bg-white/5 rounded-2xl border border-white/10 group-hover:border-primary/50 transition-colors">
        <Icon size={24} className="text-primary group-hover:text-secondary transition-colors" />
      </div>
    </div>
  </motion.div>
);

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <h1 className="text-4xl font-extrabold text-white mb-2">Welcome Back, Alex</h1>
        <p className="text-gray-400 text-lg">Here's your interview prep progress so far.</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Overall Score" value="85%" icon={Trophy} delay={0.1} />
        <StatCard title="Mock Sessions" value="12" icon={Users} delay={0.2} />
        <StatCard title="Questions Solved" value="142" icon={Target} delay={0.3} />
        <StatCard title="Current Streak" value="7 Days" icon={Zap} delay={0.4} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="lg:col-span-2 glass p-8 rounded-3xl"
        >
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-white">Performance Trend</h2>
            <div className="px-4 py-1.5 rounded-full bg-primary/20 text-primary text-sm font-semibold border border-primary/30">
              This Week
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
                <XAxis dataKey="name" stroke="rgba(255,255,255,0.3)" tick={{ fill: 'rgba(255,255,255,0.5)' }} />
                <YAxis stroke="rgba(255,255,255,0.3)" tick={{ fill: 'rgba(255,255,255,0.5)' }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'rgba(11,11,15,0.9)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                  itemStyle={{ color: '#FF7A18' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="score" 
                  stroke="#FF7A18" 
                  strokeWidth={4}
                  dot={{ fill: '#FF3CAC', strokeWidth: 2, r: 6 }}
                  activeDot={{ r: 8, strokeWidth: 0, fill: '#FF7A18' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="glass p-8 rounded-3xl flex flex-col"
        >
          <h2 className="text-2xl font-bold text-white mb-6">Upcoming Goals</h2>
          <div className="space-y-4 flex-1">
            {[
              { title: "Complete Big Tech Mock", time: "Today, 5:00 PM", status: "pending" },
              { title: "Review System Design", time: "Tomorrow", status: "next" },
              { title: "Update Resume AI", time: "Done", status: "completed" },
            ].map((goal, i) => (
              <div key={i} className="flex items-center space-x-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors">
                <div className={`w-3 h-3 rounded-full ${
                  goal.status === 'completed' ? 'bg-green-400' :
                  goal.status === 'pending' ? 'bg-primary' : 'bg-gray-500'
                }`} />
                <div>
                  <p className="text-white font-medium">{goal.title}</p>
                  <p className="text-xs text-gray-400">{goal.time}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-6 py-3 rounded-xl bg-white/10 text-white font-medium hover:bg-white/20 transition-colors">
            View All Tasks
          </button>
        </motion.div>
      </div>
    </div>
  );
}
