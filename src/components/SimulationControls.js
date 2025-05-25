// src/components/SimulationControls.js
import { useState, useEffect } from "react";

const SimulationControls = ({
  isRunning,
  onStart,
  onPause,
  onStep,
  onReset,
}) => {
  const [decision, setDecision] = useState("");

  return (
    <div className="simulation-controls">
      <button onClick={isRunning ? onPause : onStart}>
        {isRunning ? "⏸ Pause" : "▶ Start"}
      </button>
      <button onClick={onStep} disabled={!isRunning}>
        ⏭ Step
      </button>
      <button onClick={onReset}>🔄 Reset</button>

      {decision && (
        <div className="decision-prompt">
          <select onChange={(e) => setDecision(e.target.value)}>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
          <button onClick={() => onStep(decision)}>Confirm</button>
        </div>
      )}
    </div>
  );
};
