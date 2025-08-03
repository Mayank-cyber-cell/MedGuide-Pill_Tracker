import { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

interface AutocompleteSearchProps {
  onSelectMedicine: (medicine: string) => void;
  placeholder?: string;
}

// Common medicine names for autocomplete
const MEDICINE_SUGGESTIONS = [
  "Paracetamol", "Ibuprofen", "Aspirin", "Amoxicillin", "Metformin",
  "Lisinopril", "Simvastatin", "Omeprazole", "Amlodipine", "Metoprolol",
  "Hydrochlorothiazide", "Losartan", "Furosemide", "Prednisone", "Warfarin",
  "Insulin", "Levothyroxine", "Atorvastatin", "Clopidogrel", "Ramipril",
  "Doxycycline", "Ciprofloxacin", "Azithromycin", "Cephalexin", "Clindamycin",
  "Tramadol", "Codeine", "Morphine", "Diazepam", "Lorazepam"
];

const AutocompleteSearch = ({ onSelectMedicine, placeholder = "Search medicine name..." }: AutocompleteSearchProps) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeSuggestion, setActiveSuggestion] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (query.length > 1) {
      const filtered = MEDICINE_SUGGESTIONS.filter(medicine =>
        medicine.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 8);
      setSuggestions(filtered);
      setShowSuggestions(filtered.length > 0);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
    setActiveSuggestion(-1);
  }, [query]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSuggestionClick = (medicine: string) => {
    setQuery(medicine);
    setShowSuggestions(false);
    onSelectMedicine(medicine);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveSuggestion(prev => 
        prev < suggestions.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveSuggestion(prev => prev > 0 ? prev - 1 : -1);
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (activeSuggestion >= 0) {
        handleSuggestionClick(suggestions[activeSuggestion]);
      } else if (query.trim()) {
        onSelectMedicine(query.trim());
        setShowSuggestions(false);
      }
    } else if (e.key === "Escape") {
      setShowSuggestions(false);
      setActiveSuggestion(-1);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSelectMedicine(query.trim());
      setShowSuggestions(false);
    }
  };

  return (
    <div className="relative w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit}>
        <Input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => query.length > 1 && setShowSuggestions(suggestions.length > 0)}
          placeholder={placeholder}
          className="w-full border-medical-secondary focus:ring-medical-primary"
        />
      </form>

      {showSuggestions && (
        <Card className="absolute top-full left-0 right-0 z-50 mt-1 border-medical-secondary shadow-lg animate-fade-in">
          <CardContent className="p-0">
            {suggestions.map((medicine, index) => (
              <div
                key={medicine}
                onClick={() => handleSuggestionClick(medicine)}
                className={`px-4 py-2 cursor-pointer transition-all duration-200 ${
                  index === activeSuggestion
                    ? "bg-medical-accent text-medical-dark"
                    : "hover:bg-medical-light text-medical-dark"
                } ${index === 0 ? "rounded-t-lg" : ""} ${
                  index === suggestions.length - 1 ? "rounded-b-lg" : "border-b border-medical-secondary"
                }`}
              >
                <span className="text-sm font-medium">{medicine}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AutocompleteSearch;