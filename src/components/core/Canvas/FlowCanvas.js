import { useRef, useState } from "react";
import { useFlowStore } from "../../../state/store";
import Node from "./Node";
import Edge from "./Edge";
import "./FlowCanvas.css";

export default function FlowCanvas() {
  const canvasRef = useRef(null);
  const { nodes, edges, addNode } = useFlowStore();
  const [zoom, setZoom] = useState(1);

  const handleCanvasClick = (e) => {
    if (e.target === canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / zoom;
      const y = (e.clientY - rect.top) / zoom;

      addNode({
        id: `node-${Date.now()}`,
        type: "process",
        x,
        y,
        text: "New Node",
      });
    }
  };

  return (
    <div className="flow-canvas" ref={canvasRef} onClick={handleCanvasClick}>
      <div className="zoom-controls">
        <button onClick={() => setZoom((prev) => Math.min(prev + 0.1, 2))}>
          +
        </button>
        <button onClick={() => setZoom((prev) => Math.max(prev - 0.1, 0.5))}>
          -
        </button>
      </div>

      <div className="nodes-container" style={{ transform: `scale(${zoom})` }}>
        {nodes.map((node) => (
          <Node key={node.id} node={node} />
        ))}
      </div>

      <svg className="edges-container">
        {edges.map((edge, i) => (
          <Edge key={`edge-${i}`} edge={edge} nodes={nodes} />
        ))}
      </svg>
    </div>
  );
}
