import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { OGTags } from "@/components/seo/OGTags";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <>
      <OGTags
        title="Page non trouvée"
        description="Cette page n'existe pas. Retournez à l'accueil de renovermasalledebain.com."
        path="/404"
        noindex={true}
      />
      <div className="flex min-h-screen items-center justify-center bg-muted">
        <div className="text-center">
          <h1 className="mb-4 text-4xl font-bold">404</h1>
          <p className="mb-4 text-xl text-muted-foreground">Page non trouvée</p>
          <a href="/" className="text-primary underline hover:text-primary/90">
            Retour à l'accueil
          </a>
        </div>
      </div>
    </>
  );
};

export default NotFound;
