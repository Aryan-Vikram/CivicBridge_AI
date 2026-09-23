import { Outlet } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { ChatAssistant } from "../components/ChatAssistant";
import { RoleSidebar, type SidebarLink } from "../components/RoleSidebar";
import { AnimatedBackground } from "../components/AnimatedBackground";

export function DashboardLayout({ title, links }: { title: string; links: SidebarLink[] }) {
  return (
    <div className="relative flex min-h-screen flex-col bg-slate-50 dark:bg-navy-900">
      <AnimatedBackground />
      <div className="relative z-10 flex min-h-screen flex-col">
        <Navbar />
        <div className="mx-auto flex w-full max-w-[1440px] flex-1">
          <RoleSidebar title={title} links={links} />
          <main className="min-w-0 flex-1 px-4 py-6 sm:px-6 lg:px-8">
            <Outlet />
          </main>
        </div>
        <ChatAssistant />
      </div>
    </div>
  );
}
