import { useDrag } from "react-dnd";
import { useFlowStore } from "../../../state/store";
import "./Node.css";

export default function Node({ node }) {
  const { updateNode } = useFlowStore();
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "NODE",
    item: { id: node.id },
    collect: (monitor) => ({ isDragging: !!monitor.isDragging() }),
  }));

  const handleTextChange = (e) => {
    updateNode(node.id, { text: e.target.value });
  };

  return (
    <div
      ref={drag}
      className={`node-container ${isDragging ? "dragging" : ""}`}
      style={{ left: `${node.x}px`, top: `${node.y}px` }}
    >
      <div className={`node ${node.type}-node`}>
        {node.type === "decision" ? (
          <div className="decision-content">{node.text}</div>
        ) : (
          <input
            type="text"
            value={node.text}
            onChange={handleTextChange}
            className="node-input"
            onClick={(e) => e.stopPropagation()}
          />
        )}
      </div>
    </div>
  );
}
