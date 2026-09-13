import { Outlet } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { ChatAssistant } from "../components/ChatAssistant";

export function PublicLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-white dark:bg-navy-900">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <ChatAssistant />
    </div>
  );
}
