import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package } from "lucide-react";

export function OrdersList() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Commandes</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
            <Package className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="font-semibold text-lg mb-2">Module en développement</h3>
          <p className="text-muted-foreground max-w-md">
            La gestion des devis clients et des chantiers/projets sera bientôt disponible ici.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
