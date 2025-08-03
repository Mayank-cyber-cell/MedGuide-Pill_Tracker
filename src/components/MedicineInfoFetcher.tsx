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
    <div className="w-full max-w-4xl mx-auto">
      <Card className="border-medical-secondary shadow-lg">
        <CardHeader className="bg-medical-light">
          <CardTitle className="text-medical-dark flex items-center gap-2">
            <span>🔍</span>
            Medicine Information Lookup
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4 mb-6">
            <div className="space-y-2">
              <Label htmlFor="medicine-search" className="text-medical-dark font-medium">
                Search Medicine Name
              </Label>
              <Input
                id="medicine-search"
                type="text"
                placeholder="Enter medicine name (e.g., Paracetamol)"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border-medical-secondary focus:ring-medical-primary"
              />
            </div>
            <Button 
              type="submit" 
              disabled={isLoading}
              className="bg-medical-primary hover:bg-medical-secondary text-white font-medium py-2 px-6 rounded-lg transition-all duration-200 transform hover:scale-105"
            >
              {isLoading ? "Fetching data..." : "Search Medicine Info 🔍"}
            </Button>
          </form>

          {error && (
            <Card className="border-red-200 bg-red-50">
              <CardContent className="p-4">
                <p className="text-red-700 text-center">{error}</p>
              </CardContent>
            </Card>
          )}

          {medicineInfo && (
            <Card className="border-medical-accent bg-medical-light/30 animate-fade-in">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-medical-dark mb-4 flex items-center gap-2">
                  💊 {medicineInfo.medicinalproduct}
                  {medicineInfo.brandName && medicineInfo.brandName !== medicineInfo.medicinalproduct && (
                    <span className="text-sm font-normal text-medical-dark/70">
                      ({medicineInfo.brandName})
                    </span>
                  )}
                </h3>
                
                <div className="grid gap-4 lg:grid-cols-3 md:grid-cols-2">
                  <div>
                    <h4 className="font-semibold text-medical-dark mb-2 flex items-center gap-2">
                      ⚠️ Reported Side Effects:
                    </h4>
                    {medicineInfo.reactionmeddrapt.length > 0 ? (
                      <ul className="space-y-1 max-h-32 overflow-y-auto">
                        {medicineInfo.reactionmeddrapt.slice(0, 5).map((reaction, index) => (
                          <li key={index} className="text-medical-dark/80 text-sm flex items-start gap-2 bg-red-50 p-2 rounded border-l-2 border-red-300">
                            <span className="text-red-500 mt-0.5">•</span>
                            <span>{reaction}</span>
                          </li>
                        ))}
                        {medicineInfo.reactionmeddrapt.length > 5 && (
                          <li className="text-medical-dark/60 text-xs italic">
                            +{medicineInfo.reactionmeddrapt.length - 5} more reactions...
                          </li>
                        )}
                      </ul>
                    ) : (
                      <p className="text-medical-dark/60 text-sm bg-green-50 p-2 rounded">No side effects reported</p>
                    )}
                  </div>
                  
                  <div className="space-y-3">
                    <div className="bg-white p-3 rounded-lg border border-medical-secondary/30">
                      <span className="font-semibold text-medical-dark block">Serious Event:</span>
                      <span className={`font-medium ${medicineInfo.serious ? 'text-red-600' : 'text-green-600'}`}>
                        {medicineInfo.serious ? '🔴 Yes' : '🟢 No'}
                      </span>
                    </div>
                    <div className="bg-white p-3 rounded-lg border border-medical-secondary/30">
                      <span className="font-semibold text-medical-dark block">Report Date:</span>
                      <span className="text-medical-dark/80">{formatDate(medicineInfo.receivedate)}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    {medicineInfo.manufacturer && (
                      <div className="bg-white p-3 rounded-lg border border-medical-secondary/30">
                        <span className="font-semibold text-medical-dark block">Manufacturer:</span>
                        <span className="text-medical-dark/80">{medicineInfo.manufacturer}</span>
                      </div>
                    )}
                    {medicineInfo.genericName && (
                      <div className="bg-white p-3 rounded-lg border border-medical-secondary/30">
                        <span className="font-semibold text-medical-dark block">Generic Name:</span>
                        <span className="text-medical-dark/80">{medicineInfo.genericName}</span>
                      </div>
                    )}
                    {medicineInfo.sourceCountry && (
                      <div className="bg-white p-3 rounded-lg border border-medical-secondary/30">
                        <span className="font-semibold text-medical-dark block">Source Country:</span>
                        <span className="text-medical-dark/80">{medicineInfo.sourceCountry}</span>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="mt-6 text-xs text-medical-dark/60 text-center border-t border-medical-secondary pt-4">
            📋 Data provided by the U.S. FDA (OpenFDA), for informational purposes only.
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MedicineInfoFetcher;