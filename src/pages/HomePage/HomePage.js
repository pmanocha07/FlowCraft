import { Link } from "react-router-dom";
import "./HomePage.css";

export default function HomePage() {
  return (
    <div className="home-container">
      <div className="hero-section">
        <h1>Create Flowcharts with Ease</h1>
        <p>Design, visualize, and share your algorithms and processes</p>
        <Link to="/workspace" className="cta-button">
          Start Creating
        </Link>
      </div>

      <div className="features-section">
        <div className="feature-card">
          <h3>Simple Interface</h3>
          <p>Drag and drop nodes to build your flowchart quickly</p>
        </div>
        <div className="feature-card">
          <h3>Offline Support</h3>
          <p>Works completely offline - no internet required</p>
        </div>
        <div className="feature-card">
          <h3>Dark Theme</h3>
          <p>Eye-friendly dark mode for extended work sessions</p>
        </div>
      </div>
    </div>
  );
}
