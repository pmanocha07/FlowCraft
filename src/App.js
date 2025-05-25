import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import Workspace from "./pages/Workspace/Workspace";
import TemplatesPage from "./pages/TemplatesPage";
import SymbolsPage from "./pages/SymbolsPage";
import DIYPage from "./pages/DIYPage";
import NavBar from "./components/ui/NavBar/NavBar";
import "./styles/App.css";

export default function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div
      className={`app ${darkMode ? "dark" : "light"} ${
        sidebarOpen ? "sidebar-open" : ""
      }`}
    >
      <Router>
        <NavBar
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          onSidebarToggle={setSidebarOpen}
        />
        <div className="app-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/workspace" element={<Workspace />} />
            <Route path="/templates" element={<TemplatesPage />} />
            <Route path="/symbols" element={<SymbolsPage />} />
            <Route path="/diy" element={<DIYPage />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}