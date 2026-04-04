import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { HelmetProvider, HelmetServerState } from "react-helmet-async";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import { Routes, Route } from "react-router-dom";

// Pages
import Index from "./pages/Index";
import About from "./pages/About";
import WhyUs from "./pages/WhyUs";
import Realisations from "./pages/Realisations";
import ProjetDetail from "./pages/ProjetDetail";
import Presse from "./pages/Presse";
import Partenaires from "./pages/Partenaires";
import PartenairesContact from "./pages/PartenairesContact";
import DevisStep1 from "./pages/DevisStep1";
import Devis from "./pages/Devis";
import DevisCallback from "./pages/DevisCallback";
import DevisConfirmation from "./pages/DevisConfirmation";
import FAQ from "./pages/FAQ";
import MentionsLegales from "./pages/MentionsLegales";
import PolitiqueConfidentialite from "./pages/PolitiqueConfidentialite";
import Photographe from "./pages/Photographe";
import Guide from "./pages/Guide";
import VideosConseils from "./pages/VideosConseils";
import DegatsEaux from "./pages/DegatsEaux";
import VisuelsHouzz from "./pages/VisuelsHouzz";
import VisuelsInstagramHighlights from "./pages/VisuelsInstagramHighlights";
import DevenirPartenaire from "./pages/DevenirPartenaire";
import Avis from "./pages/Avis";
import RenovationParis from "./pages/RenovationParis";
import QualiRenovation from "./pages/QualiRenovation";
import NotFound from "./pages/NotFound";

interface RenderResult {
  html: string;
  helmet: HelmetServerState;
}

export function render(url: string): RenderResult {
  // HelmetProvider context must be a mutable object — helmet is set AFTER renderToString
  const helmetContext: { helmet?: HelmetServerState } = {};

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false, staleTime: Infinity },
    },
  });

  const html = renderToString(
    <HelmetProvider context={helmetContext}>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <StaticRouter location={url}>
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/a-propos" element={<About />} />
              <Route path="/pourquoi-nous" element={<WhyUs />} />
              <Route path="/realisations" element={<Realisations />} />
              <Route path="/realisations/:slug" element={<ProjetDetail />} />
              <Route path="/presse" element={<Presse />} />
              <Route path="/partenaires" element={<Partenaires />} />
              <Route path="/partenaires/contact" element={<PartenairesContact />} />
              <Route path="/devis" element={<DevisStep1 />} />
              <Route path="/devis/completer" element={<Devis />} />
              <Route path="/devis/rappel" element={<DevisCallback />} />
              <Route path="/devis/confirmation" element={<DevisConfirmation />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/mentions-legales" element={<MentionsLegales />} />
              <Route path="/politique-confidentialite" element={<PolitiqueConfidentialite />} />
              <Route path="/photographe" element={<Photographe />} />
              <Route path="/guide-travaux" element={<Guide />} />
              <Route path="/videos-conseils" element={<VideosConseils />} />
              <Route path="/degats-eaux" element={<DegatsEaux />} />
              <Route path="/visuels-houzz" element={<VisuelsHouzz />} />
              <Route path="/visuels-instagram-highlights" element={<VisuelsInstagramHighlights />} />
              <Route path="/devenir-partenaire" element={<DevenirPartenaire />} />
              <Route path="/avis" element={<Avis />} />
              <Route path="/renovation-salle-de-bain-paris" element={<RenovationParis />} />
              <Route path="/qualirenovation" element={<QualiRenovation />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </StaticRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );

  return { html, helmet: helmetContext.helmet! };
}
