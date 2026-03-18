import { useEffect, useState } from "react";

const Theme = () => {
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);

    const themeColorMeta = document.querySelector('meta[name="theme-color"]');
    if (themeColorMeta) {
      themeColorMeta.setAttribute(
        "content",
        theme === "dark" ? "#000000" : "#ffffff"
      );
    }
  }, [theme]);

  return { theme, setTheme };
};

export default Theme;
