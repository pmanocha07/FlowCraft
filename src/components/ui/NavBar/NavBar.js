import { useState } from "react";
import { Link } from "react-router-dom";
import SaveModal from "../../modals/SaveModal";
import Sidebar from "../Sidebar/Sidebar";
import "./NavBar.css";

export default function NavBar({ darkMode, setDarkMode }) {
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <div className="logo" onClick={() => setShowSidebar(true)}>
          <span className="logo-icon">⟁</span>
          <span className="logo-text">FlowCraft</span>
        </div>
      </div>

      <div className="navbar-right">
        <Link to="/" className="nav-btn dashboard-btn">
          Dashboard
        </Link>
        
        <button className="nav-btn" onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? "☀️" : "🌙"}
        </button>

        <button
          className="nav-btn save-btn"
          onClick={() => setShowSaveModal(true)}
        >
          Save
        </button>

        <Link to="/workspace" className="nav-btn new-btn">
          New
        </Link>
      </div>

      {showSaveModal && <SaveModal onClose={() => setShowSaveModal(false)} />}

      <Sidebar isOpen={showSidebar} onClose={() => setShowSidebar(false)} />
    </nav>
  );
}