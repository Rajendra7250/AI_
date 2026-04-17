import Sidebar from "@/components/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-background overflow-hidden selection:bg-primary/30">
      {/* Background Decor */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-primary rounded-full mix-blend-screen filter blur-[150px] opacity-20 pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-secondary rounded-full mix-blend-screen filter blur-[150px] opacity-20 pointer-events-none" />

      <Sidebar />
      <main className="flex-1 overflow-y-auto p-10 z-10 relative">
        {children}
      </main>
    </div>
  );
}
