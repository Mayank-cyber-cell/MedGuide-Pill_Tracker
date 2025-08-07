const DisclaimerFooter = () => {
  return (
    <footer className="bg-gradient-to-r from-slate-800 via-slate-900 to-slate-800 border-t border-slate-700 mt-16">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center space-y-8">
          {/* Main disclaimer */}
          <div className="p-6 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-2xl border border-yellow-500/20 backdrop-blur-sm">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="p-2 bg-yellow-500/20 rounded-xl">
                <span className="text-2xl">⚠️</span>
              </div>
              <h3 className="text-xl font-bold text-yellow-400">Important Medical Disclaimer</h3>
            </div>
            <p className="text-yellow-200/90 text-lg leading-relaxed max-w-4xl mx-auto">
              This application is for informational and educational purposes only. It is not intended to replace professional medical advice, diagnosis, or treatment. Always consult with qualified healthcare professionals before making any decisions about your medications or health.
            </p>
          </div>
          
          {/* Navigation links */}
          <div className="flex justify-center space-x-8 text-slate-300">
            <a 
              href="#about" 
              className="hover:text-medical-primary transition-colors duration-200 hover:underline font-medium"
            >
              About MedGuide
            </a>
            <span className="text-slate-600">|</span>
            <a 
              href="#privacy" 
              className="hover:text-medical-primary transition-colors duration-200 hover:underline font-medium"
            >
              Privacy Policy
            </a>
            <span className="text-slate-600">|</span>
            <a 
              href="#contact" 
              className="hover:text-medical-primary transition-colors duration-200 hover:underline font-medium"
            >
              Contact Support
            </a>
            <span className="text-slate-600">|</span>
            <a 
              href="#terms" 
              className="hover:text-medical-primary transition-colors duration-200 hover:underline font-medium"
            >
              Terms of Service
            </a>
          </div>
          
          {/* Brand and copyright */}
          <div className="pt-6 border-t border-slate-700">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="p-2 bg-medical-primary/20 rounded-xl">
                <span className="text-2xl">💊</span>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-medical-primary to-blue-400 bg-clip-text text-transparent">
                MedGuide
              </span>
            </div>
            <p className="text-slate-400 text-sm">
              © 2024 MedGuide. Made with ❤️ for better health management.
            </p>
            <p className="text-slate-500 text-xs mt-2">
              Powered by FDA OpenAPI • Built with modern web technologies
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default DisclaimerFooter;