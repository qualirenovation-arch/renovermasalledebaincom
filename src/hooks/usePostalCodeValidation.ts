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
      const response = await fetch(
        `https://api-adresse.data.gouv.fr/search/?q=${encodeURIComponent(ville)}&postcode=${encodeURIComponent(codePostal)}&limit=1&type=municipality`
      );
      const data = await response.json();

      if (data.features && data.features.length > 0) {
        setValidation({ isValid: true, message: null, isChecking: false });
        return true;
      } else {
        // Try a broader search to suggest the correct postal code
        const cityResponse = await fetch(
          `https://api-adresse.data.gouv.fr/search/?q=${encodeURIComponent(ville)}&limit=1&type=municipality`
        );
        const cityData = await cityResponse.json();
        
        let suggestion = "";
        if (cityData.features && cityData.features.length > 0) {
          const correctPostcode = cityData.features[0].properties.postcode;
          const correctCity = cityData.features[0].properties.city;
          suggestion = ` Le code postal de ${correctCity} est ${correctPostcode}.`;
        }

        setValidation({
          isValid: false,
          message: `Le code postal ${codePostal} ne correspond pas à la ville "${ville}".${suggestion}`,
          isChecking: false,
        });
        return false;
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
