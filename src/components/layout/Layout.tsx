import { ReactNode } from "react";
import { Header } from "./Header";
import { ScrollingTicker } from "./ScrollingTicker";
import { Footer } from "./Footer";
import { WhatsAppButton } from "./WhatsAppButton";
import { MobileStickyNav } from "./MobileStickyNav";
import { PageTransition } from "./PageTransition";
import { ScrollToTopButton } from "./ScrollToTopButton";
import { ClientOnly } from "./ClientOnly";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <ClientOnly><ScrollingTicker /></ClientOnly>
      <main className="flex-1 pb-16 md:pb-0">
        <PageTransition>{children}</PageTransition>
      </main>
      <Footer />
      <ClientOnly><WhatsAppButton /></ClientOnly>
      <ClientOnly><MobileStickyNav /></ClientOnly>
      <ClientOnly><ScrollToTopButton /></ClientOnly>
    </div>
  );
}
