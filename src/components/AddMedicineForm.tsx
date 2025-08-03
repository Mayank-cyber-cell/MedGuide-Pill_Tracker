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
    <Card className="w-full max-w-2xl mx-auto shadow-lg border-medical-secondary">
      <CardHeader className="bg-medical-light">
        <CardTitle className="text-medical-dark flex items-center gap-2">
          <span>⏰</span>
          Add Medicine Reminder
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="medicine-name" className="text-medical-dark font-medium">
              Medicine Name
            </Label>
            <Input
              id="medicine-name"
              type="text"
              placeholder="Enter medicine name"
              value={medicineName}
              onChange={(e) => setMedicineName(e.target.value)}
              className="border-medical-secondary focus:ring-medical-primary"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="medicine-time" className="text-medical-dark font-medium">
              Time to Take
            </Label>
            <Input
              id="medicine-time"
              type="time"
              value={medicineTime}
              onChange={(e) => setMedicineTime(e.target.value)}
              className="border-medical-secondary focus:ring-medical-primary"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-medical-dark font-medium">Frequency</Label>
            <Select value={frequency} onValueChange={setFrequency}>
              <SelectTrigger className="border-medical-secondary focus:ring-medical-primary">
                <SelectValue placeholder="Select frequency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="once">Once</SelectItem>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="alternate">Alternate Days</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button 
            type="submit" 
            className="w-full bg-medical-primary hover:bg-medical-secondary text-white font-medium py-3 rounded-lg transition-all duration-200 transform hover:scale-105"
          >
            Add Reminder 💊
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddMedicineForm;