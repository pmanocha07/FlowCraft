import { useDrag } from "react-dnd";
import { useFlowStore } from "../../../state/store";
import "./NodeToolbar.css";

const nodeTypes = [
  { type: "start", label: "Start" },
  { type: "process", label: "Process" },
  { type: "decision", label: "Decision" },
  { type: "end", label: "End" },
];

export default function NodeToolbar() {
  const { addNode } = useFlowStore();

  return (
    <div className="node-toolbar">
      {nodeTypes.map((nodeType) => (
        <NodeButton
          key={nodeType.type}
          type={nodeType.type}
          label={nodeType.label}
          onAdd={addNode}
        />
      ))}
    </div>
  );
}

function NodeButton({ type, label, onAdd }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "NODE_BUTTON",
    item: { type },
    end: (item, monitor) => {
      if (monitor.didDrop()) {
        const dropResult = monitor.getDropResult();
        onAdd({
          id: `node-${Date.now()}`,
          type,
          x: dropResult.x,
          y: dropResult.y,
          text: label,
        });
      }
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <button
      ref={drag}
      className={`tool-button ${type}-button ${isDragging ? "dragging" : ""}`}
    >
      {label}
    </button>
  );
}
