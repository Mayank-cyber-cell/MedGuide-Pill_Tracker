import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

interface Medicine {
  id: string;
  name: string;
  time: string;
  frequency: string;
}

interface ReminderListProps {
  medicines: Medicine[];
  onDeleteMedicine: (id: string) => void;
}

const ReminderList = ({ medicines, onDeleteMedicine }: ReminderListProps) => {
  const { toast } = useToast();

  const handleDelete = (medicine: Medicine) => {
    onDeleteMedicine(medicine.id);
    toast({
      title: "Reminder Deleted",
      description: `${medicine.name} reminder has been removed.`,
    });
  };

  const formatTime = (time: string) => {
    return new Date(`2000-01-01T${time}`).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const getFrequencyDisplay = (frequency: string) => {
    const displays = {
      once: "Once",
      daily: "Daily",
      alternate: "Alternate Days"
    };
    return displays[frequency as keyof typeof displays] || frequency;
  };

  if (medicines.length === 0) {
    return (
      <div className="w-full max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-medical-dark mb-6 text-center">
          📋 Your Medicine Reminders
        </h2>
        <Card className="border-medical-secondary shadow-lg">
          <CardContent className="p-8 text-center">
            <div className="text-6xl mb-4">💊</div>
            <h3 className="text-xl font-semibold text-medical-dark mb-2">
              No reminders yet
            </h3>
            <p className="text-medical-dark/70">
              Add your first medicine reminder to get started!
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-medical-dark mb-6 text-center">
        📋 Your Medicine Reminders ({medicines.length})
      </h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {medicines.map((medicine) => (
          <Card 
            key={medicine.id} 
            className="border-medical-secondary shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
          >
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg text-medical-dark mb-2 flex items-center gap-2">
                    💊 {medicine.name}
                  </h3>
                  <div className="space-y-1 text-sm text-medical-dark/80">
                    <div className="flex items-center gap-2">
                      <span>⏰</span>
                      <span className="font-medium">{formatTime(medicine.time)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>📅</span>
                      <span>{getFrequencyDisplay(medicine.frequency)}</span>
                    </div>
                  </div>
                </div>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(medicine)}
                  className="ml-2 h-8 w-8 p-0 rounded-full hover:scale-110 transition-transform"
                  title="Delete reminder"
                >
                  🗑️
                </Button>
              </div>
              <div className="h-1 bg-medical-accent rounded-full" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ReminderList;