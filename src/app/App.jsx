import { useAuth } from "../store/useAuth";
import Auth from "../pages/Auth";
import Notes from "../pages/Notes";
import '../styles/globals.css';
import '../styles/variables.css';
import { useEffect, useState } from "react";

function App() {
  const { user } = useAuth();
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    document.body.className = theme;    
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev ==="dark" ? "light" : "dark"));
  };
  
  return user ? (
    <>

      <button onClick={toggleTheme} className="theme-toggle">
        {theme === "dark" ? "☀️" : "🌙"}
      </button>

      <Notes />

    </>
  ) : (
        <Auth />
      )


  
}

export default App;
