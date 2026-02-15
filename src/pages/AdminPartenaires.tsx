import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Layout } from "@/components/layout/Layout";
import { PartnerContactsList } from "@/components/admin/partners/PartnerContactsList";
import { PartnerContactDetail } from "@/components/admin/partners/PartnerContactDetail";
import { ArrowLeft, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdminPartenaires() {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedContactId, setSelectedContactId] = useState<string | null>(null);

  useEffect(() => {
    checkAdminAccess();
  }, []);

  const checkAdminAccess = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        navigate("/admin/login");
        return;
      }

      const { data: roleData, error } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", user.id)
        .eq("role", "admin")
        .maybeSingle();

      if (error || !roleData) {
        navigate("/admin/login");
        return;
      }

      setIsAdmin(true);
    } catch (error) {
      console.error("Error checking admin access:", error);
      navigate("/admin/login");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </Layout>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
     <Layout>
      <Helmet><meta name="robots" content="noindex, nofollow" /></Helmet>
      <div className="bg-gradient-to-b from-stone to-background py-8">
        <div className="container-custom">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={() => navigate("/admin")}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Admin
              </Button>
              <div className="flex items-center gap-3">
                <Users className="w-6 h-6 text-primary" />
                <h1 className="font-display text-2xl md:text-3xl font-semibold">
                  Demandes Partenaires
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container-custom py-8">
        {selectedContactId ? (
          <PartnerContactDetail
            contactId={selectedContactId}
            onBack={() => setSelectedContactId(null)}
          />
        ) : (
          <PartnerContactsList onSelectContact={setSelectedContactId} />
        )}
      </div>
    </Layout>
  );
}
