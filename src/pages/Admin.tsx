import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, Package } from "lucide-react";
import { SubcontractorsList } from "@/components/admin/SubcontractorsList";
import { OrdersList } from "@/components/admin/OrdersList";

export default function Admin() {
  const [activeTab, setActiveTab] = useState("subcontractors");

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="font-display text-2xl font-semibold">
              Administration
            </h1>
            <a 
              href="/" 
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              ← Retour au site
            </a>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-8">
            <TabsTrigger value="subcontractors" className="gap-2">
              <Users className="w-4 h-4" />
              Sous-traitants
            </TabsTrigger>
            <TabsTrigger value="orders" className="gap-2">
              <Package className="w-4 h-4" />
              Commandes
            </TabsTrigger>
          </TabsList>

          <TabsContent value="subcontractors">
            <SubcontractorsList />
          </TabsContent>

          <TabsContent value="orders">
            <OrdersList />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
