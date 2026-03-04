//this function is called when the theme switch is toggled

import { useState } from "react";

//it toggles between light and dark themes
export function useThemeToggle() {
  const [isLightTheme, setIsLightTheme] = useState(true);

  const toggleTheme = () => {
    setIsLightTheme(!isLightTheme);
  };

  return {isLightTheme, setIsLightTheme, toggleTheme};
}
