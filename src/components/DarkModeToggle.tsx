import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

const DarkModeToggle = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check if user has a preference stored
    const storedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    
    if (storedTheme === "dark" || (!storedTheme && prefersDark)) {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    
    if (newIsDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <div className="fixed top-6 right-6 z-50">
      <Button
        onClick={toggleDarkMode}
        variant="outline"
        size="sm"
        className="group relative h-12 w-12 p-0 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border-2 border-medical-secondary/30 hover:border-medical-primary hover:bg-medical-accent/20 transition-all duration-300 rounded-2xl shadow-lg hover:shadow-xl overflow-hidden"
        aria-label="Toggle dark mode"
      >
        {/* Background gradient animation */}
        <div className="absolute inset-0 bg-gradient-to-r from-medical-primary/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Icon container with smooth transition */}
        <div className="relative flex items-center justify-center w-full h-full">
          {/* Sun icon */}
          <div className={`absolute transition-all duration-500 ${isDark ? 'opacity-0 rotate-180 scale-0' : 'opacity-100 rotate-0 scale-100'}`}>
            <div className="relative">
              <span className="text-2xl">☀️</span>
              {/* Sun rays animation */}
              <div className="absolute inset-0 animate-spin" style={{ animationDuration: '8s' }}>
                <div className="absolute top-0 left-1/2 w-0.5 h-1 bg-yellow-400 rounded-full transform -translate-x-1/2 -translate-y-2" />
                <div className="absolute top-1/2 right-0 w-1 h-0.5 bg-yellow-400 rounded-full transform translate-x-2 -translate-y-1/2" />
                <div className="absolute bottom-0 left-1/2 w-0.5 h-1 bg-yellow-400 rounded-full transform -translate-x-1/2 translate-y-2" />
                <div className="absolute top-1/2 left-0 w-1 h-0.5 bg-yellow-400 rounded-full transform -translate-x-2 -translate-y-1/2" />
              </div>
            </div>
          </div>
          
          {/* Moon icon */}
          <div className={`absolute transition-all duration-500 ${isDark ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-180 scale-0'}`}>
            <div className="relative">
              <span className="text-2xl">🌙</span>
              {/* Stars animation */}
              <div className="absolute -top-1 -right-1">
                <span className="text-xs animate-pulse" style={{ animationDelay: '0s' }}>✨</span>
              </div>
              <div className="absolute -bottom-1 -left-1">
                <span className="text-xs animate-pulse" style={{ animationDelay: '1s' }}>⭐</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Tooltip */}
        <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div className="bg-slate-800 dark:bg-white text-white dark:text-slate-800 text-xs px-3 py-1 rounded-lg shadow-lg whitespace-nowrap">
            {isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-slate-800 dark:border-b-white" />
          </div>
        </div>
        
        {/* Ripple effect on click */}
        <div className="absolute inset-0 rounded-2xl overflow-hidden">
          <div className="absolute inset-0 bg-medical-primary/20 scale-0 group-active:scale-100 transition-transform duration-200 rounded-full" />
        </div>
      </Button>
    </div>
  );
};

export default DarkModeToggle;