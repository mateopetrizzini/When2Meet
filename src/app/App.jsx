import { useAuth } from "../store/useAuth";
import Auth from "../pages/Auth";
import Notes from "../pages/Notes";
import Shared from "../pages/Shared";
import Settings from "../pages/Settings";
import '../styles/globals.css';
import '../styles/variables.css';
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

function App() {
  const { user } = useAuth();
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    document.body.className = theme;    
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev ==="dark" ? "light" : "dark"));
  };
  
  return (

    <BrowserRouter>
      <button onClick={toggleTheme} className="theme-toggle">
        {theme === "dark" ? "☀️" : "🌙"}
      </button>

      {user ? (
          <>
          <Navbar />

            <Routes>
              <Route path="/" element={<Navigate to="/notes"/>} />
              <Route path="/notes" element={<Notes />} />
              <Route path="/shared" element={<Shared />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </>
      ) : (
          <Auth />
      )}

    </BrowserRouter>
  );  
}

export default App;
