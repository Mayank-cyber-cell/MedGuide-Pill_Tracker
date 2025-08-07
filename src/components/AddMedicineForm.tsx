import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

interface Medicine {
  id: string;
  name: string;
  time: string;
  frequency: string;
}

interface AddMedicineFormProps {
  onAddMedicine: (medicine: Medicine) => void;
}

const AddMedicineForm = ({ onAddMedicine }: AddMedicineFormProps) => {
  const [medicineName, setMedicineName] = useState("");
  const [medicineTime, setMedicineTime] = useState("");
  const [frequency, setFrequency] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Form validation
    if (!medicineName.trim() || !medicineTime || !frequency) {
      toast({
        title: "Validation Error",
        description: "Please fill in all fields.",
        variant: "destructive",
      });
      return;
    }

    const newMedicine: Medicine = {
      id: Date.now().toString(),
      name: medicineName.trim(),
      time: medicineTime,
      frequency: frequency,
    };

    onAddMedicine(newMedicine);
    
    // Reset form
    setMedicineName("");
    setMedicineTime("");
    setFrequency("");
    
    toast({
      title: "Success! 🎉",
      description: `${medicineName} reminder added successfully.`,
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <Card className="shadow-2xl border-0 bg-gradient-to-br from-white to-blue-50/50 dark:from-slate-800 dark:to-slate-900 backdrop-blur-sm">
        <CardHeader className="bg-gradient-to-r from-medical-primary/10 to-blue-500/10 rounded-t-lg border-b border-medical-primary/20">
          <CardTitle className="text-medical-dark dark:text-white flex items-center gap-3 text-2xl">
            <div className="p-2 bg-medical-primary/20 rounded-xl">
              <span className="text-2xl">⏰</span>
            </div>
            Add Medicine Reminder
          </CardTitle>
          <p className="text-medical-dark/70 dark:text-gray-300 mt-2">
            Set up personalized medication reminders to never miss a dose
          </p>
        </CardHeader>
        <CardContent className="p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid gap-8 md:grid-cols-2">
              <div className="space-y-3">
                <Label htmlFor="medicine-name" className="text-medical-dark dark:text-white font-semibold text-lg flex items-center gap-2">
                  <span className="text-medical-primary">💊</span>
                  Medicine Name
                </Label>
                <Input
                  id="medicine-name"
                  type="text"
                  placeholder="Enter medicine name (e.g., Paracetamol)"
                  value={medicineName}
                  onChange={(e) => setMedicineName(e.target.value)}
                  className="h-12 border-2 border-medical-secondary/30 focus:border-medical-primary focus:ring-medical-primary/20 rounded-xl text-lg"
                />
              </div>

              <div className="space-y-3">
                <Label htmlFor="medicine-time" className="text-medical-dark dark:text-white font-semibold text-lg flex items-center gap-2">
                  <span className="text-medical-primary">🕐</span>
                  Time to Take
                </Label>
                <Input
                  id="medicine-time"
                  type="time"
                  value={medicineTime}
                  onChange={(e) => setMedicineTime(e.target.value)}
                  className="h-12 border-2 border-medical-secondary/30 focus:border-medical-primary focus:ring-medical-primary/20 rounded-xl text-lg"
                />
              </div>
            </div>

            <div className="space-y-3">
              <Label className="text-medical-dark dark:text-white font-semibold text-lg flex items-center gap-2">
                <span className="text-medical-primary">📅</span>
                Frequency
              </Label>
              <Select value={frequency} onValueChange={setFrequency}>
                <SelectTrigger className="h-12 border-2 border-medical-secondary/30 focus:border-medical-primary focus:ring-medical-primary/20 rounded-xl text-lg">
                  <SelectValue placeholder="Select how often to take this medicine" />
                </SelectTrigger>
                <SelectContent className="rounded-xl">
                  <SelectItem value="once" className="text-lg py-3">Once only</SelectItem>
                  <SelectItem value="daily" className="text-lg py-3">Daily</SelectItem>
                  <SelectItem value="alternate" className="text-lg py-3">Every other day</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button 
              type="submit" 
              className="w-full h-14 bg-gradient-to-r from-medical-primary to-blue-500 hover:from-medical-primary/90 hover:to-blue-500/90 text-white font-semibold text-lg rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl"
            >
              <span className="mr-2">💊</span>
              Add Medicine Reminder
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddMedicineForm;