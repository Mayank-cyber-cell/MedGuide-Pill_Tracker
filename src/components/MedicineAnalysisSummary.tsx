import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface MedicineAnalysisSummaryProps {
  medicineName: string;
  isVisible: boolean;
}

interface MedicineDetails {
  safetyLevel: "Safe" | "Caution" | "Risky";
  commonUse: string;
  dosageSummary: string;
  warningsSigns: string[];
  safetyColor: string;
}

// Static medicine analysis data (you can expand this)
const MEDICINE_ANALYSIS: Record<string, MedicineDetails> = {
  "paracetamol": {
    safetyLevel: "Safe",
    commonUse: "Fever, Pain relief, Headache",
    dosageSummary: "Adults: 500-1000mg every 4-6 hours, max 4g/day",
    warningsSigns: ["Do not exceed 4g daily", "Avoid with liver disease", "Check with alcohol use"],
    safetyColor: "bg-green-100 text-green-800 border-green-200"
  },
  "ibuprofen": {
    safetyLevel: "Caution",
    commonUse: "Inflammation, Pain relief, Fever",
    dosageSummary: "Adults: 200-400mg every 4-6 hours, max 1.2g/day",
    warningsSigns: ["Take with food", "Avoid with stomach ulcers", "Monitor blood pressure"],
    safetyColor: "bg-yellow-100 text-yellow-800 border-yellow-200"
  },
  "aspirin": {
    safetyLevel: "Caution",
    commonUse: "Heart protection, Pain relief, Anti-inflammatory",
    dosageSummary: "Low dose: 75-100mg daily; Pain: 300-600mg every 4 hours",
    warningsSigns: ["Not for children under 16", "Bleeding risk", "Take with food"],
    safetyColor: "bg-yellow-100 text-yellow-800 border-yellow-200"
  },
  "amoxicillin": {
    safetyLevel: "Safe",
    commonUse: "Bacterial infections, Respiratory infections",
    dosageSummary: "Adults: 250-500mg every 8 hours for 7-10 days",
    warningsSigns: ["Complete full course", "Check for penicillin allergy", "Take with or without food"],
    safetyColor: "bg-green-100 text-green-800 border-green-200"
  },
  "metformin": {
    safetyLevel: "Safe",
    commonUse: "Type 2 Diabetes, Blood sugar control",
    dosageSummary: "Adults: Start 500mg twice daily, max 2g/day",
    warningsSigns: ["Take with meals", "Monitor kidney function", "Stop before surgery"],
    safetyColor: "bg-green-100 text-green-800 border-green-200"
  }
};

const getDefaultAnalysis = (medicineName: string): MedicineDetails => ({
  safetyLevel: "Caution",
  commonUse: "Consult healthcare provider for specific uses",
  dosageSummary: "Follow healthcare provider's prescription",
  warningsSigns: ["Always consult healthcare provider", "Read medication label carefully", "Report side effects"],
  safetyColor: "bg-gray-100 text-gray-800 border-gray-200"
});

const MedicineAnalysisSummary = ({ medicineName, isVisible }: MedicineAnalysisSummaryProps) => {
  if (!isVisible || !medicineName) return null;

  const analysis = MEDICINE_ANALYSIS[medicineName.toLowerCase()] || getDefaultAnalysis(medicineName);

  return (
    <Card className={`border-medical-secondary shadow-lg transition-all duration-500 ${
      isVisible ? "animate-fade-in" : "opacity-0"
    }`}>
      <CardHeader className="bg-medical-light">
        <CardTitle className="text-medical-dark flex items-center justify-between">
          <span className="flex items-center gap-2">
            💊 Analysis Summary - {medicineName}
          </span>
          <Badge className={`${analysis.safetyColor} font-medium`}>
            {analysis.safetyLevel}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-3">
            <div>
              <h4 className="font-semibold text-medical-dark mb-2 flex items-center gap-2">
                🎯 Common Use Cases:
              </h4>
              <p className="text-medical-dark/80 text-sm bg-medical-light/50 p-2 rounded-lg">
                {analysis.commonUse}
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-medical-dark mb-2 flex items-center gap-2">
                📏 Dosage Summary:
              </h4>
              <p className="text-medical-dark/80 text-sm bg-medical-light/50 p-2 rounded-lg">
                {analysis.dosageSummary}
              </p>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-medical-dark mb-2 flex items-center gap-2">
              ⚠️ Important Warnings:
            </h4>
            <ul className="space-y-1">
              {analysis.warningsSigns.map((warning, index) => (
                <li key={index} className="text-medical-dark/80 text-sm flex items-start gap-2 bg-yellow-50 p-2 rounded border-l-2 border-yellow-400">
                  <span className="text-yellow-600 mt-0.5">⚠️</span>
                  <span>{warning}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-xs text-blue-700 text-center">
            💡 This analysis is for educational purposes only. Always consult with a healthcare professional before taking any medication.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default MedicineAnalysisSummary;