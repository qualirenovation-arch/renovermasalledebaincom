import { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { MapPin } from "lucide-react";

interface AddressSuggestion {
  label: string;
  housenumber?: string;
  street?: string;
  postcode?: string;
  city?: string;
  context?: string;
}

interface AddressAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  onAddressSelect?: (address: AddressSuggestion) => void;
  placeholder?: string;
  id?: string;
  required?: boolean;
  className?: string;
}

export function AddressAutocomplete({
  value,
  onChange,
  onAddressSelect,
  placeholder = "Commencez à taper votre adresse...",
  id,
  required,
  className,
}: AddressAutocompleteProps) {
  const [suggestions, setSuggestions] = useState<AddressSuggestion[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>();

  // Fetch suggestions from French government API (BAN)
  const fetchSuggestions = async (query: string) => {
    if (query.length < 3) {
      setSuggestions([]);
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(
        `https://api-adresse.data.gouv.fr/search/?q=${encodeURIComponent(query)}&limit=5&autocomplete=1`
      );
      const data = await response.json();
      
      const formattedSuggestions: AddressSuggestion[] = data.features.map((feature: any) => ({
        label: feature.properties.label,
        housenumber: feature.properties.housenumber,
        street: feature.properties.street || feature.properties.name,
        postcode: feature.properties.postcode,
        city: feature.properties.city,
        context: feature.properties.context,
      }));
      
      setSuggestions(formattedSuggestions);
      setIsOpen(formattedSuggestions.length > 0);
    } catch (error) {
      console.error("Error fetching address suggestions:", error);
      setSuggestions([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Debounced search
  const handleInputChange = (inputValue: string) => {
    onChange(inputValue);
    
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    
    debounceRef.current = setTimeout(() => {
      fetchSuggestions(inputValue);
    }, 300);
  };

  // Handle suggestion selection
  const handleSelect = (suggestion: AddressSuggestion) => {
    onChange(suggestion.label);
    setSuggestions([]);
    setIsOpen(false);
    onAddressSelect?.(suggestion);
  };

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Cleanup debounce on unmount
  useEffect(() => {
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, []);

  return (
    <div ref={containerRef} className="relative">
      <div className="relative">
        <Input
          id={id}
          value={value}
          onChange={(e) => handleInputChange(e.target.value)}
          onFocus={() => suggestions.length > 0 && setIsOpen(true)}
          placeholder={placeholder}
          required={required}
          className={className}
          autoComplete="off"
        />
        {isLoading && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <div className="w-4 h-4 border-2 border-muted-foreground/30 border-t-foreground rounded-full animate-spin" />
          </div>
        )}
      </div>
      
      {isOpen && suggestions.length > 0 && (
        <div className="absolute z-50 w-full mt-1 bg-background border border-border rounded-xl shadow-lg overflow-hidden">
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              type="button"
              onClick={() => handleSelect(suggestion)}
              className="w-full px-4 py-3 text-left hover:bg-secondary transition-colors flex items-start gap-3 border-b border-border last:border-b-0"
            >
              <MapPin className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{suggestion.label}</p>
                {suggestion.context && (
                  <p className="text-xs text-muted-foreground truncate">{suggestion.context}</p>
                )}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
