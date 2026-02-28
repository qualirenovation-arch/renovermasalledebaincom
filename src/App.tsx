import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
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
import FAQ from "./pages/FAQ";
import MentionsLegales from "./pages/MentionsLegales";
import PolitiqueConfidentialite from "./pages/PolitiqueConfidentialite";
import Photographe from "./pages/Photographe";
import Guide from "./pages/Guide";
import VideosConseils from "./pages/VideosConseils";
import DegatsEaux from "./pages/DegatsEaux";
import VisuelsHouzz from "./pages/VisuelsHouzz";
import DevenirPartenaire from "./pages/DevenirPartenaire";
import Avis from "./pages/Avis";
import RenovationParis from "./pages/RenovationParis";
import QualiRenovation from "./pages/QualiRenovation";
import OGPreview from "./pages/OGPreview";
import Admin from "./pages/Admin";
import AdminLogin from "./pages/AdminLogin";
import AdminPartenaires from "./pages/AdminPartenaires";
import AdminDevis from "./pages/AdminDevis";
import AdminFinitions from "./pages/AdminFinitions";
import AdminAlbums from "./pages/AdminAlbums";

import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
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
          <Route path="/faq" element={<FAQ />} />
          <Route path="/mentions-legales" element={<MentionsLegales />} />
          <Route path="/politique-confidentialite" element={<PolitiqueConfidentialite />} />
          <Route path="/photographe" element={<Photographe />} />
          <Route path="/guide-travaux" element={<Guide />} />
          <Route path="/videos-conseils" element={<VideosConseils />} />
          <Route path="/degats-eaux" element={<DegatsEaux />} />
          <Route path="/visuels-houzz" element={<VisuelsHouzz />} />
          <Route path="/devenir-partenaire" element={<DevenirPartenaire />} />
          <Route path="/avis" element={<Avis />} />
          <Route path="/renovation-salle-de-bain-paris" element={<RenovationParis />} />
          <Route path="/qualirenovation" element={<QualiRenovation />} />
          <Route path="/og-preview" element={<OGPreview />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/partenaires" element={<AdminPartenaires />} />
          <Route path="/admin/devis" element={<AdminDevis />} />
          <Route path="/admin/finitions" element={<AdminFinitions />} />
          <Route path="/admin/albums" element={<AdminAlbums />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;