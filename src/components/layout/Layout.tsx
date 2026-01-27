import { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { WhatsAppButton } from "./WhatsAppButton";
import { MobileStickyNav } from "./MobileStickyNav";
import { PageTransition } from "./PageTransition";
import { ScrollingTicker } from "./ScrollingTicker";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <ScrollingTicker />
      <main className="flex-1 pb-16 md:pb-0">
        <PageTransition>{children}</PageTransition>
      </main>
      <Footer />
      <WhatsAppButton />
      <MobileStickyNav />
    </div>
  );
}
