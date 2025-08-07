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
      once: "Once only",
      daily: "Daily",
      alternate: "Every other day"
    };
    return displays[frequency as keyof typeof displays] || frequency;
  };

  const getFrequencyIcon = (frequency: string) => {
    const icons = {
      once: "🔄",
      daily: "📅",
      alternate: "⏭️"
    };
    return icons[frequency as keyof typeof icons] || "📅";
  };

  if (medicines.length === 0) {
    return (
      <div className="w-full max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-medical-dark dark:text-white mb-2">
            📋 Your Medicine Reminders
          </h2>
          <p className="text-medical-dark/70 dark:text-gray-300">
            Manage all your medication schedules in one place
          </p>
        </div>
        <Card className="shadow-2xl border-0 bg-gradient-to-br from-white to-slate-50/50 dark:from-slate-800 dark:to-slate-900">
          <CardContent className="p-12 text-center">
            <div className="mb-6">
              <div className="w-24 h-24 mx-auto bg-gradient-to-br from-medical-primary/20 to-blue-500/20 rounded-full flex items-center justify-center mb-4">
                <span className="text-4xl">💊</span>
              </div>
            </div>
            <h3 className="text-2xl font-semibold text-medical-dark dark:text-white mb-3">
              No reminders yet
            </h3>
            <p className="text-medical-dark/70 dark:text-gray-300 text-lg max-w-md mx-auto">
              Add your first medicine reminder above to get started on your health journey!
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-medical-dark dark:text-white mb-2">
          📋 Your Medicine Reminders
        </h2>
        <p className="text-medical-dark/70 dark:text-gray-300">
          You have {medicines.length} active reminder{medicines.length !== 1 ? 's' : ''}
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {medicines.map((medicine, index) => (
          <Card 
            key={medicine.id} 
            className="group shadow-xl border-0 bg-gradient-to-br from-white to-blue-50/30 dark:from-slate-800 dark:to-slate-900 hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02] animate-fade-in"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-gradient-to-br from-medical-primary/20 to-blue-500/20 rounded-xl">
                      <span className="text-xl">💊</span>
                    </div>
                    <h3 className="font-bold text-xl text-medical-dark dark:text-white leading-tight">
                      {medicine.name}
                    </h3>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-medical-accent/30 to-blue-100/30 dark:from-slate-700/50 dark:to-slate-600/50 rounded-lg">
                      <span className="text-lg">⏰</span>
                      <div>
                        <p className="font-semibold text-medical-dark dark:text-white">
                          {formatTime(medicine.time)}
                        </p>
                        <p className="text-sm text-medical-dark/70 dark:text-gray-300">
                          Reminder time
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-green-100/50 to-emerald-100/50 dark:from-slate-700/50 dark:to-slate-600/50 rounded-lg">
                      <span className="text-lg">{getFrequencyIcon(medicine.frequency)}</span>
                      <div>
                        <p className="font-semibold text-medical-dark dark:text-white">
                          {getFrequencyDisplay(medicine.frequency)}
                        </p>
                        <p className="text-sm text-medical-dark/70 dark:text-gray-300">
                          Frequency
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-center pt-4 border-t border-medical-secondary/20">
                <div className="h-2 bg-gradient-to-r from-medical-primary to-blue-500 rounded-full flex-1 mr-4" />
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(medicine)}
                  className="h-10 w-10 p-0 rounded-full hover:scale-110 transition-all duration-200 bg-red-500 hover:bg-red-600"
                  title="Delete reminder"
                >
                  <span className="text-lg">🗑️</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ReminderList;