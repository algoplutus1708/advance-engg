import { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { ChatBot } from "@/components/chat/ChatBot";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      <Navbar />
      <main>{children}</main>
      <Footer />
      <ChatBot />
    </div>
  );
}
