const DisclaimerFooter = () => {
  return (
    <footer className="bg-medical-light border-t border-medical-secondary mt-12">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center text-yellow-600 text-sm font-medium">
            <span className="text-lg mr-2">⚠️</span>
            This app is for informational purposes only. Consult a doctor before taking any medication.
          </div>
          
          <div className="flex justify-center space-x-4 text-sm text-medical-dark/60">
            <a 
              href="#about" 
              className="hover:text-medical-primary transition-colors duration-200 hover:underline"
            >
              About
            </a>
            <span>|</span>
            <a 
              href="#contact" 
              className="hover:text-medical-primary transition-colors duration-200 hover:underline"
            >
              Contact
            </a>
          </div>
          
          <div className="text-xs text-medical-dark/50">
            © 2024 MedGuide. Made with ❤️ for better health management.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default DisclaimerFooter;