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
    <div className="relative w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-medical-primary">
            <span className="text-xl">🔍</span>
          </div>
          <Input
            ref={inputRef}
            type="text"
            value={query}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onFocus={() => query.length > 1 && setShowSuggestions(suggestions.length > 0)}
            placeholder={placeholder}
            className="w-full h-14 pl-14 pr-4 border-2 border-medical-secondary/30 focus:border-medical-primary focus:ring-medical-primary/20 rounded-2xl text-lg bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm shadow-lg"
          />
        </div>
      </form>

      {showSuggestions && (
        <Card className="absolute top-full left-0 right-0 z-50 mt-2 border-2 border-medical-secondary/30 shadow-2xl animate-fade-in bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm rounded-2xl overflow-hidden">
          <CardContent className="p-0">
            {suggestions.map((medicine, index) => (
              <div
                key={medicine}
                onClick={() => handleSuggestionClick(medicine)}
                className={`px-6 py-4 cursor-pointer transition-all duration-200 flex items-center gap-3 ${
                  index === activeSuggestion
                    ? "bg-gradient-to-r from-medical-primary/20 to-blue-500/20 text-medical-dark dark:text-white"
                    : "hover:bg-gradient-to-r hover:from-medical-light hover:to-blue-50/50 text-medical-dark dark:text-white"
                } ${index === 0 ? "rounded-t-2xl" : ""} ${
                  index === suggestions.length - 1 ? "rounded-b-2xl" : "border-b border-medical-secondary/20"
                }`}
              >
                <div className="p-2 bg-medical-primary/10 rounded-lg">
                  <span className="text-sm">💊</span>
                </div>
                <span className="font-medium text-lg">{medicine}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AutocompleteSearch;