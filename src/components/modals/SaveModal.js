import { useState } from "react";
import { useFlowStore } from "../../state/store";
import { saveToLocal } from "../../utils/storage";
import "./SaveModal.css";

export default function SaveModal({ onClose }) {
  const { nodes, edges } = useFlowStore();
  const [name, setName] = useState("Untitled Flowchart");
  const [error, setError] = useState("");

  const handleSave = () => {
    if (!name.trim()) {
      setError("Please enter a name");
      return;
    }

    saveToLocal(name, { nodes, edges });
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Save Flowchart</h3>

        <div className="input-group">
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter flowchart name"
          />
          {error && <p className="error-message">{error}</p>}
        </div>

        <div className="modal-actions">
          <button className="cancel-btn" onClick={onClose}>
            Cancel
          </button>
          <button className="save-btn" onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
