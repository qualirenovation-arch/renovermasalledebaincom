import { useState, useCallback, useRef } from "react";

interface ValidationResult {
  isValid: boolean;
  message: string | null;
  isChecking: boolean;
}

/**
 * Validates that a French postal code matches the given city
 * using the French government BAN API.
 */
export function usePostalCodeValidation() {
  const [validation, setValidation] = useState<ValidationResult>({
    isValid: true,
    message: null,
    isChecking: false,
  });
  const debounceRef = useRef<ReturnType<typeof setTimeout>>();

  const validate = useCallback(async (codePostal: string, ville: string): Promise<boolean> => {
    // Skip if either field is empty or postal code too short
    if (!codePostal || codePostal.length < 5 || !ville || ville.trim().length < 2) {
      setValidation({ isValid: true, message: null, isChecking: false });
      return true;
    }

    setValidation(prev => ({ ...prev, isChecking: true }));

    try {
      // Search for the city and check if the postal code matches
      const response = await fetch(
        `https://api-adresse.data.gouv.fr/search/?q=${encodeURIComponent(ville)}&limit=5&type=municipality`
      );
      const data = await response.json();

      if (data.features && data.features.length > 0) {
        // Check if any result has a matching postal code
        // For Paris, postcodes are 75001-75020, so we also check the city-level match
        const matchFound = data.features.some((f: any) => {
          const props = f.properties;
          // Direct postcode match
          if (props.postcode === codePostal) return true;
          // For Paris/Lyon/Marseille with arrondissements, accept any valid arrondissement code
          // But only if the user typed the general city name (not a specific arrondissement)
          const cityCode = props.citycode;
          const villeNorm = ville.trim().toLowerCase();
          const isGenericCity = !villeNorm.match(/\d/); // No digit = generic "Paris", not "Paris 10"
          if (isGenericCity) {
            if (cityCode === "75056" && codePostal.startsWith("750")) return true;
            if (cityCode === "69123" && codePostal.startsWith("690")) return true;
            if (cityCode === "13055" && codePostal.startsWith("130")) return true;
          } else {
            // User typed something like "Paris 10" — extract the arrondissement number
            const arrMatch = villeNorm.match(/(\d+)/);
            if (arrMatch) {
              const arr = parseInt(arrMatch[1], 10);
              if (cityCode === "75056") {
                const expectedPostcode = `750${arr.toString().padStart(2, '0')}`;
                if (codePostal === expectedPostcode) return true;
              }
              if (cityCode === "69123") {
                const expectedPostcode = `690${arr.toString().padStart(2, '0')}`;
                if (codePostal === expectedPostcode) return true;
              }
              if (cityCode === "13055") {
                const expectedPostcode = `130${arr.toString().padStart(2, '0')}`;
                if (codePostal === expectedPostcode) return true;
              }
            }
          }
          return false;
        });

        if (matchFound) {
          setValidation({ isValid: true, message: null, isChecking: false });
          return true;
        }

        // No match — suggest the correct postal code
        const correctPostcode = data.features[0].properties.postcode;
        const correctCity = data.features[0].properties.city;
        setValidation({
          isValid: false,
          message: `Le code postal ${codePostal} ne correspond pas à "${ville}". Le code postal de ${correctCity} est ${correctPostcode}.`,
          isChecking: false,
        });
        return false;
      } else {
        // City not found at all — let it pass (may be a typo, handled by other validation)
        setValidation({ isValid: true, message: null, isChecking: false });
        return true;
      }
    } catch {
      // Don't block submission on API failure
      setValidation({ isValid: true, message: null, isChecking: false });
      return true;
    }
  }, []);

  const validateDebounced = useCallback((codePostal: string, ville: string) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => validate(codePostal, ville), 500);
  }, [validate]);

  const reset = useCallback(() => {
    setValidation({ isValid: true, message: null, isChecking: false });
  }, []);

  return { validation, validate, validateDebounced, reset };
}
