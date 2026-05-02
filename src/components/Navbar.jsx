import { NavLink } from "react-router-dom";
import { supabase } from "../services/supabase";

function Navbar() {

    const handleLogout = async () => {
        await supabase.auth.signOut();
    };


  return (

    <nav className="navbar">

        <h2 className="logo">When2Meet</h2>

        <div className="nav-links">

            <NavLink to="/notes">Notes</NavLink>
            <NavLink to="/shared">Shared</NavLink>
            <NavLink to="/settings">Settings</NavLink>

            <button onClick={handleLogout} className="logout-btn">
                Logout
            </button>

        </div>

    </nav>
  )
}

export default Navbar;