// src/components/Sidebar/Sidebar.js
import { Link } from "react-router-dom";
import "./Sidebar.css";

export default function Sidebar({ isOpen, onClose }) {
  return (
    <div className={`sidebar ${isOpen ? "open" : ""}`}>
      <div className="sidebar-header">
        <h2>Menu</h2>
        <button className="close-btn" onClick={onClose}>
          &times;
        </button>
      </div>
      <div className="sidebar-menu">
        <Link to="/templates" className="menu-item" onClick={onClose}>
          Templates
        </Link>
        <Link to="/symbols" className="menu-item" onClick={onClose}>
          Symbols
        </Link>
        <Link to="/diy" className="menu-item" onClick={onClose}>
          DIY
        </Link>
      </div>
    </div>
  );
}