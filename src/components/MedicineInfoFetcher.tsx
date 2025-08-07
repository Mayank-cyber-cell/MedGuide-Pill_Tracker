import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

interface FDAResponse {
  results: Array<{
    patient: {
      drug: Array<{
        medicinalproduct: string;
        openfda?: {
          manufacturer_name?: string[];
          brand_name?: string[];
          generic_name?: string[];
        };
      }>;
      reaction: Array<{
        reactionmeddrapt: string;
      }>;
    };
    serious: string;
    receivedate: string;
    primarysourcecountry?: string;
  }>;
}

interface MedicineInfo {
  medicinalproduct: string;
  reactionmeddrapt: string[];
  serious: boolean;
  receivedate: string;
  manufacturer?: string;
  brandName?: string;
  genericName?: string;
  sourceCountry?: string;
}

const MedicineInfoFetcher = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [medicineInfo, setMedicineInfo] = useState<MedicineInfo | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchMedicineInfo = async (medicineName: string) => {
    setIsLoading(true);
    setError(null);
    setMedicineInfo(null);

    try {
      const response = await fetch(
        `https://api.fda.gov/drug/event.json?search=patient.drug.medicinalproduct:"${encodeURIComponent(medicineName)}"&limit=1`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch data from FDA API');
      }

      const data: FDAResponse = await response.json();
      
      if (data.results && data.results.length > 0) {
        const result = data.results[0];
        
        // Extract medicine name
        const medicinalproduct = result.patient?.drug?.[0]?.medicinalproduct || medicineName;
        
        // Extract side effects
        const reactions = result.patient?.reaction || [];
        const reactionmeddrapt = reactions.map(reaction => reaction.reactionmeddrapt);
        
        // Extract seriousness and date
        const serious = result.serious === "1";
        const receivedate = result.receivedate;
        
        // Extract manufacturer and brand info
        const openFda = result.patient?.drug?.[0]?.openfda;
        const manufacturer = openFda?.manufacturer_name?.[0] || "Unknown";
        const brandName = openFda?.brand_name?.[0];
        const genericName = openFda?.generic_name?.[0];
        const sourceCountry = result.primarysourcecountry || "Unknown";

        setMedicineInfo({
          medicinalproduct,
          reactionmeddrapt,
          serious,
          receivedate,
          manufacturer,
          brandName,
          genericName,
          sourceCountry
        });

        toast({
          title: "Medicine information retrieved",
          description: `Found data for ${medicinalproduct}`,
        });
      } else {
        setError("No data available or medicine not found.");
        toast({
          title: "No data found",
          description: "No FDA data available for this medicine.",
          variant: "destructive",
        });
      }
    } catch (err) {
      const errorMessage = "Failed to fetch medicine information. Please try again.";
      setError(errorMessage);
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTerm.trim()) {
      toast({
        title: "Validation Error",
        description: "Please enter a medicine name.",
        variant: "destructive",
      });
      return;
    }
    fetchMedicineInfo(searchTerm.trim());
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr || dateStr.length !== 8) return dateStr;
    const year = dateStr.substring(0, 4);
    const month = dateStr.substring(4, 6);
    const day = dateStr.substring(6, 8);
    return `${month}/${day}/${year}`;
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      <Card className="shadow-2xl border-0 bg-gradient-to-br from-white to-purple-50/30 dark:from-slate-800 dark:to-slate-900">
        <CardHeader className="bg-gradient-to-r from-purple-500/10 to-indigo-500/10 rounded-t-lg border-b border-purple-500/20">
          <CardTitle className="text-medical-dark dark:text-white flex items-center gap-3 text-2xl">
            <div className="p-2 bg-purple-500/20 rounded-xl">
              <span className="text-2xl">🔍</span>
            </div>
            FDA Medicine Information Lookup
          </CardTitle>
          <p className="text-medical-dark/70 dark:text-gray-300 mt-2">
            Get detailed FDA data including side effects, manufacturer info, and safety reports
          </p>
        </CardHeader>
        <CardContent className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6 mb-8">
            <div className="space-y-3">
              <Label htmlFor="medicine-search" className="text-medical-dark dark:text-white font-semibold text-lg flex items-center gap-2">
                <span className="text-purple-500">🏥</span>
                Search Medicine Name
              </Label>
              <div className="relative">
                <Input
                  id="medicine-search"
                  type="text"
                  placeholder="Enter medicine name (e.g., Paracetamol, Ibuprofen)"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="h-12 border-2 border-purple-200/50 focus:border-purple-500 focus:ring-purple-500/20 rounded-xl text-lg pl-4"
                />
              </div>
            </div>
            <Button 
              type="submit" 
              disabled={isLoading}
              className="h-12 bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white font-semibold px-8 rounded-xl transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Fetching data...
                </>
              ) : (
                <>
                  <span className="mr-2">🔍</span>
                  Search FDA Database
                </>
              )}
            </Button>
          </form>

          {error && (
            <Card className="border-2 border-red-200 bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 mb-6">
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">⚠️</span>
                  <p className="text-red-700 dark:text-red-300 font-medium">{error}</p>
                </div>
              </CardContent>
            </Card>
          )}

          {medicineInfo && (
            <Card className="border-2 border-purple-200/50 bg-gradient-to-br from-purple-50/50 to-indigo-50/50 dark:from-purple-900/20 dark:to-indigo-900/20 animate-fade-in">
              <CardContent className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-gradient-to-br from-purple-500/20 to-indigo-500/20 rounded-2xl">
                    <span className="text-3xl">💊</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-medical-dark dark:text-white">
                      {medicineInfo.medicinalproduct}
                    </h3>
                    {medicineInfo.brandName && medicineInfo.brandName !== medicineInfo.medicinalproduct && (
                      <p className="text-lg text-medical-dark/70 dark:text-gray-300">
                        Brand: {medicineInfo.brandName}
                      </p>
                    )}
                  </div>
                </div>
                
                <div className="grid gap-6 lg:grid-cols-3 md:grid-cols-2">
                  <div className="lg:col-span-2">
                    <h4 className="font-bold text-xl text-medical-dark dark:text-white mb-4 flex items-center gap-2">
                      <span className="text-red-500">⚠️</span>
                      Reported Side Effects
                    </h4>
                    {medicineInfo.reactionmeddrapt.length > 0 ? (
                      <div className="space-y-2 max-h-64 overflow-y-auto">
                        {medicineInfo.reactionmeddrapt.slice(0, 8).map((reaction, index) => (
                          <div key={index} className="flex items-start gap-3 p-3 bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 rounded-lg border border-red-200/50">
                            <span className="text-red-500 mt-0.5 text-sm">•</span>
                            <span className="text-medical-dark dark:text-white font-medium">{reaction}</span>
                          </div>
                        ))}
                        {medicineInfo.reactionmeddrapt.length > 8 && (
                          <p className="text-medical-dark/60 dark:text-gray-400 text-sm italic text-center pt-2">
                            +{medicineInfo.reactionmeddrapt.length - 8} more reactions reported...
                          </p>
                        )}
                      </div>
                    ) : (
                      <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg border border-green-200/50">
                        <p className="text-green-700 dark:text-green-300 font-medium">No side effects reported in this dataset</p>
                      </div>
                    )}
                  </div>
                  
                  <div className="space-y-4">
                    <div className="p-4 bg-gradient-to-br from-white to-gray-50 dark:from-slate-700 dark:to-slate-600 rounded-xl border border-gray-200/50 shadow-sm">
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`text-xl ${medicineInfo.serious ? '🔴' : '🟢'}`}>
                          {medicineInfo.serious ? '🔴' : '🟢'}
                        </span>
                        <span className="font-bold text-medical-dark dark:text-white">Serious Event</span>
                      </div>
                      <span className={`font-semibold ${medicineInfo.serious ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'}`}>
                        {medicineInfo.serious ? 'Yes' : 'No'}
                      </span>
                    </div>

                    <div className="p-4 bg-gradient-to-br from-white to-gray-50 dark:from-slate-700 dark:to-slate-600 rounded-xl border border-gray-200/50 shadow-sm">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xl">📅</span>
                        <span className="font-bold text-medical-dark dark:text-white">Report Date</span>
                      </div>
                      <span className="text-medical-dark/80 dark:text-gray-300 font-medium">{formatDate(medicineInfo.receivedate)}</span>
                    </div>
                    
                    {medicineInfo.manufacturer && (
                      <div className="p-4 bg-gradient-to-br from-white to-gray-50 dark:from-slate-700 dark:to-slate-600 rounded-xl border border-gray-200/50 shadow-sm">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xl">🏭</span>
                          <span className="font-bold text-medical-dark dark:text-white">Manufacturer</span>
                        </div>
                        <span className="text-medical-dark/80 dark:text-gray-300 font-medium">{medicineInfo.manufacturer}</span>
                      </div>
                    )}

                    {medicineInfo.genericName && (
                      <div className="p-4 bg-gradient-to-br from-white to-gray-50 dark:from-slate-700 dark:to-slate-600 rounded-xl border border-gray-200/50 shadow-sm">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xl">🧬</span>
                          <span className="font-bold text-medical-dark dark:text-white">Generic Name</span>
                        </div>
                        <span className="text-medical-dark/80 dark:text-gray-300 font-medium">{medicineInfo.genericName}</span>
                      </div>
                    )}

                    {medicineInfo.sourceCountry && (
                      <div className="p-4 bg-gradient-to-br from-white to-gray-50 dark:from-slate-700 dark:to-slate-600 rounded-xl border border-gray-200/50 shadow-sm">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xl">🌍</span>
                          <span className="font-bold text-medical-dark dark:text-white">Source Country</span>
                        </div>
                        <span className="text-medical-dark/80 dark:text-gray-300 font-medium">{medicineInfo.sourceCountry}</span>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="mt-8 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl border border-blue-200/50">
            <div className="flex items-center gap-2 text-blue-700 dark:text-blue-300">
              <span className="text-lg">📋</span>
              <p className="text-sm font-medium">
                Data provided by the U.S. FDA (OpenFDA) for informational purposes only. Always consult healthcare professionals for medical advice.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MedicineInfoFetcher;