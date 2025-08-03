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
      className="fixed top-4 right-4 z-50 border-medical-secondary hover:bg-medical-accent transition-all duration-200"
      aria-label="Toggle dark mode"
    >
      {isDark ? (
        <span className="flex items-center gap-2">
          ☀️ Light
        </span>
      ) : (
        <span className="flex items-center gap-2">
          🌙 Dark
        </span>
      )}
    </Button>
  );
};

export default DarkModeToggle;