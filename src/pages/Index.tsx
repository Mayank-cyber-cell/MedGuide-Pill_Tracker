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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 transition-colors duration-300">
      <DarkModeToggle />
      <MedGuideHeader />
      
      <main className="container mx-auto px-4 py-12 space-y-16">
        {/* Enhanced Search Section */}
        <section className="text-center space-y-8">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-medical-primary/10 to-blue-500/10 rounded-full border border-medical-primary/20">
              <span className="text-2xl">🔍</span>
              <h2 className="text-2xl md:text-3xl font-bold text-medical-dark dark:text-white">
                Search & Analyze Medicines
              </h2>
            </div>
            <p className="text-medical-dark/70 dark:text-gray-300 max-w-3xl mx-auto text-lg leading-relaxed">
              Use our enhanced search to find detailed information about any medicine, 
              including side effects, safety analysis, and FDA reports. Get the insights you need to make informed decisions.
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
        <section>
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-medical-primary/10 to-blue-500/10 rounded-full border border-medical-primary/20 mb-4">
              <span className="text-2xl">⏰</span>
              <h2 className="text-2xl md:text-3xl font-bold text-medical-dark dark:text-white">
                Set Medicine Reminders
              </h2>
            </div>
            <p className="text-medical-dark/70 dark:text-gray-300 max-w-2xl mx-auto text-lg">
              Never miss a dose again. Set up personalized reminders for all your medications.
            </p>
          </div>
          <AddMedicineForm onAddMedicine={handleAddMedicine} />
        </section>

        {/* Reminder List */}
        <ReminderList medicines={medicines} onDeleteMedicine={handleDeleteMedicine} />

        {/* Info & Blog Cards */}
        <section>
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-full border border-green-500/20 mb-4">
              <span className="text-2xl">📚</span>
              <h2 className="text-2xl md:text-3xl font-bold text-medical-dark dark:text-white">
                Health Education Hub
              </h2>
            </div>
            <p className="text-medical-dark/70 dark:text-gray-300 max-w-2xl mx-auto text-lg">
              Stay informed with our curated collection of articles about medication safety and healthcare best practices.
            </p>
          </div>
          <InfoBlogCards />
        </section>
      </main>
      
      <DisclaimerFooter />
    </div>
  );
};

export default Index;