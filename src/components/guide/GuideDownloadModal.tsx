import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Download, Loader2, CheckCircle2 } from "lucide-react";

interface GuideDownloadModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const GUIDE_PDF_URL = "/documents/guide-travaux-renover-ma-salle-de-bain.pdf";

export const GuideDownloadModal = ({ open, onOpenChange }: GuideDownloadModalProps) => {
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");

  const triggerDownload = () => {
    const a = document.createElement("a");
    a.href = GUIDE_PDF_URL;
    a.download = "guide-travaux-renover-ma-salle-de-bain.pdf";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName || !lastName || !email || !phone || !city) {
      toast({ title: "Champs manquants", description: "Merci de remplir tous les champs.", variant: "destructive" });
      return;
    }
    setSubmitting(true);
    try {
      const { data, error } = await supabase.functions.invoke("send-guide-download", {
        body: { firstName, lastName, email, phone, city },
      });
      if (error || (data as any)?.error) {
        throw new Error((data as any)?.error || error?.message || "Erreur");
      }
      setDone(true);
      triggerDownload();
      toast({ title: "Guide envoyé !", description: "Le téléchargement démarre. Une copie a aussi été envoyée par email." });
    } catch (err: any) {
      toast({ title: "Erreur", description: err?.message || "Une erreur est survenue.", variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(v) => { onOpenChange(v); if (!v) { setDone(false); } }}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-light text-xl" style={{ color: "#124A66" }}>
            Télécharger le guide travaux
          </DialogTitle>
          <DialogDescription className="text-sm">
            Recevez gratuitement notre guide complet de rénovation de salle de bain (PDF).
          </DialogDescription>
        </DialogHeader>

        {done ? (
          <div className="py-6 text-center space-y-4">
            <CheckCircle2 className="w-12 h-12 mx-auto text-primary" />
            <p className="text-sm">Le téléchargement a démarré. Si rien ne se passe :</p>
            <Button onClick={triggerDownload} className="w-full" style={{ backgroundColor: "#124A66" }}>
              <Download className="w-4 h-4 mr-2" /> Télécharger à nouveau
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4" autoComplete="off">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="gd-first">Prénom</Label>
                <Input id="gd-first" value={firstName} onChange={(e) => setFirstName(e.target.value)} required autoComplete="off" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="gd-last">Nom</Label>
                <Input id="gd-last" value={lastName} onChange={(e) => setLastName(e.target.value)} required autoComplete="off" />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="gd-email">Email</Label>
              <Input id="gd-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="off" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="gd-phone">Téléphone</Label>
              <Input id="gd-phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required autoComplete="off" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="gd-city">Ville</Label>
              <Input id="gd-city" value={city} onChange={(e) => setCity(e.target.value)} required autoComplete="off" placeholder="Paris" />
            </div>
            <Button type="submit" disabled={submitting} className="w-full h-12" style={{ backgroundColor: "#124A66" }}>
              {submitting ? (
                <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Envoi…</>
              ) : (
                <><Download className="w-4 h-4 mr-2" /> Recevoir le guide</>
              )}
            </Button>
            <p className="text-[11px] text-muted-foreground text-center">
              En soumettant, vous acceptez d'être recontacté au sujet de votre projet.
            </p>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};