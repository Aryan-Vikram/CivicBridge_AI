import { Outlet } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { ChatAssistant } from "../components/ChatAssistant";
import { AnimatedBackground } from "../components/AnimatedBackground";

export function PublicLayout() {
  return (
    <div className="relative flex min-h-screen flex-col bg-white dark:bg-navy-900">
      <AnimatedBackground />
      <div className="relative z-10 flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
        <ChatAssistant />
      </div>
    </div>
  );
}
