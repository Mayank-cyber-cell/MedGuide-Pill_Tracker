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
    <Button
      onClick={toggleDarkMode}
      variant="outline"
      size="sm"
      className="fixed top-6 right-6 z-50 h-12 px-4 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border-2 border-medical-secondary/30 hover:border-medical-primary hover:bg-medical-accent/20 transition-all duration-300 rounded-xl shadow-lg hover:shadow-xl"
      aria-label="Toggle dark mode"
    >
      {isDark ? (
        <span className="flex items-center gap-2 font-medium">
          <span className="text-lg">☀️</span>
          Light
        </span>
      ) : (
        <span className="flex items-center gap-2 font-medium">
          <span className="text-lg">🌙</span>
          Dark
        </span>
      )}
    </Button>
  );
};

export default DarkModeToggle;