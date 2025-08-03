import { useState, useEffect } from "react";
import MedGuideHeader from "@/components/MedGuideHeader";
import AddMedicineForm from "@/components/AddMedicineForm";
import ReminderList from "@/components/ReminderList";
import MedicineInfoFetcher from "@/components/MedicineInfoFetcher";
import AutocompleteSearch from "@/components/AutocompleteSearch";
import MedicineAnalysisSummary from "@/components/MedicineAnalysisSummary";
import InfoBlogCards from "@/components/InfoBlogCards";
import DisclaimerFooter from "@/components/DisclaimerFooter";
import DarkModeToggle from "@/components/DarkModeToggle";

interface Medicine {
  id: string;
  name: string;
  time: string;
  frequency: string;
}

const Index = () => {
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [selectedMedicine, setSelectedMedicine] = useState<string>("");
  const [showAnalysis, setShowAnalysis] = useState<boolean>(false);

  // Load medicines from localStorage on component mount
  useEffect(() => {
    const savedMedicines = localStorage.getItem("medguide-medicines");
    if (savedMedicines) {
      try {
        setMedicines(JSON.parse(savedMedicines));
      } catch (error) {
        console.error("Error loading medicines from localStorage:", error);
      }
    }
  }, []);

  // Save medicines to localStorage whenever medicines array changes
  useEffect(() => {
    localStorage.setItem("medguide-medicines", JSON.stringify(medicines));
  }, [medicines]);

  const handleAddMedicine = (medicine: Medicine) => {
    setMedicines(prev => [...prev, medicine]);
  };

  const handleDeleteMedicine = (id: string) => {
    setMedicines(prev => prev.filter(medicine => medicine.id !== id));
  };

  const handleSelectMedicine = (medicine: string) => {
    setSelectedMedicine(medicine);
    setShowAnalysis(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-medical-light to-background dark:from-slate-900 dark:to-slate-800 transition-colors duration-300">
      <DarkModeToggle />
      <MedGuideHeader />
      
      <main className="container mx-auto px-4 py-8 space-y-12">
        {/* Enhanced Search Section */}
        <section className="text-center space-y-6">
          <div className="space-y-3">
            <h2 className="text-2xl font-bold text-medical-dark dark:text-white">
              🔍 Search & Analyze Medicines
            </h2>
            <p className="text-medical-dark/70 dark:text-gray-300 max-w-2xl mx-auto">
              Use our enhanced search to find detailed information about any medicine, 
              including side effects, safety analysis, and FDA reports.
            </p>
          </div>
          <AutocompleteSearch 
            onSelectMedicine={handleSelectMedicine}
            placeholder="Search medicine name (e.g., Paracetamol, Ibuprofen)..."
          />
        </section>

        {/* Medicine Analysis Summary */}
        <MedicineAnalysisSummary 
          medicineName={selectedMedicine}
          isVisible={showAnalysis}
        />

        {/* Medicine Information Fetcher */}
        <MedicineInfoFetcher />

        {/* Add Medicine Form */}
        <AddMedicineForm onAddMedicine={handleAddMedicine} />

        {/* Reminder List */}
        <ReminderList medicines={medicines} onDeleteMedicine={handleDeleteMedicine} />

        {/* Info & Blog Cards */}
        <InfoBlogCards />
      </main>
      
      <DisclaimerFooter />
    </div>
  );
};

export default Index;
