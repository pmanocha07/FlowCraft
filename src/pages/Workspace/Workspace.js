import React, { useState, useEffect, useCallback, useRef } from "react";
import { useFlowStore } from "../../state/store";
import "./Workspace.css";

const NODE_TYPES = [
  {
    id: "start",
    label: "Start",
    icon: "⭕",
    color: "#4CAF50",
    width: 60,
    height: 60,
    shape: "circle",
  },
  {
    id: "end",
    label: "End",
    icon: "🔴",
    color: "#F44336",
    width: 60,
    height: 60,
    shape: "circle",
  },
  {
    id: "process",
    label: "Process",
    icon: "⚙️",
    color: "#2196F3",
    width: 120,
    height: 60,
    shape: "rectangle",
  },
  {
    id: "decision",
    label: "Decision",
    icon: "❓",
    color: "#FFC107",
    width: 80,
    height: 80,
    shape: "diamond",
  },
  {
    id: "io",
    label: "Input/Output",
    icon: "📥",
    color: "#9C27B0",
    width: 120,
    height: 60,
    shape: "rectangle",
  },
  {
    id: "loop",
    label: "Loop",
    icon: "🔄",
    color: "#009688",
    width: 100,
    height: 100,
    shape: "ellipse",
  },
];

const FlowNode = ({
  node,
  onDragStart,
  onDrag,
  onDragEnd,
  onConnectStart,
  onConnectEnd,
  isSelected,
  onClick,
}) => {
  const nodeRef = useRef(null);
  const nodeType = NODE_TYPES.find((t) => t.id === node.type);

  const getNodeStyle = () => {
    const baseStyle = {
      left: node.x,
      top: node.y,
      backgroundColor: nodeType?.color,
      width: nodeType?.width,
      height: nodeType?.height,
    };

    if (nodeType?.shape === "circle") {
      return { ...baseStyle, borderRadius: "50%" };
    }
    if (nodeType?.shape === "diamond") {
      return { ...baseStyle, transform: "rotate(45deg)" };
    }
    if (nodeType?.shape === "ellipse") {
      return { ...baseStyle, borderRadius: "50%" };
    }
    return baseStyle;
  };

  return (
    <div
      ref={nodeRef}
      className={`flow-node ${node.type}-node ${isSelected ? "selected" : ""}`}
      style={getNodeStyle()}
      draggable
      onDragStart={(e) => {
        e.dataTransfer.setData("nodeId", node.id);
        const rect = nodeRef.current.getBoundingClientRect();
        onDragStart(node.id, e.clientX - rect.left, e.clientY - rect.top);
      }}
      onDrag={(e) => {
        if (e.clientX !== 0 && e.clientY !== 0) {
          onDrag(node.id, e.clientX, e.clientY);
        }
      }}
      onDragEnd={(e) => {
        onDragEnd(node.id, e.clientX, e.clientY);
      }}
      onClick={(e) => {
        e.stopPropagation();
        onClick(node.id);
      }}
    >
      <div
        className="node-content"
        style={
          nodeType?.shape === "diamond" ? { transform: "rotate(-45deg)" } : {}
        }
      >
        <div className="node-icon">{nodeType?.icon}</div>
        <div className="node-label">{node.label}</div>
      </div>

      {node.type !== "end" && (
        <div
          className="connector output"
          onMouseDown={(e) => {
            e.stopPropagation();
            onConnectStart(node.id);
          }}
          title="Drag to connect"
        />
      )}

      {node.type !== "start" && (
        <div
          className="connector input"
          onMouseUp={(e) => {
            e.stopPropagation();
            onConnectEnd(node.id);
          }}
          title="Drop to connect"
        />
      )}
    </div>
  );
};

const Edge = ({ from, to, isSelected, onClick }) => {
  const pathData = `M${from.x + from.width / 2} ${from.y + from.height / 2} 
                   Q ${(from.x + to.x) / 2} ${(from.y + to.y) / 2}, 
                   ${to.x + to.width / 2} ${to.y + to.height / 2}`;

  return (
    <path
      d={pathData}
      stroke={isSelected ? "#f39c12" : "#666"}
      fill="none"
      markerEnd="url(#arrowhead)"
      strokeWidth={isSelected ? 3 : 2}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
    />
  );
};

const Workspace = () => {
  const {
    nodes,
    edges,
    addNode,
    moveNode,
    addEdge,
    deleteNode,
    deleteEdge,
    history,
    setHistory,
  } = useFlowStore();

  const [selectedTool, setSelectedTool] = useState(null);
  const [connectorStart, setConnectorStart] = useState(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [selectedNodeId, setSelectedNodeId] = useState(null);
  const [selectedEdgeId, setSelectedEdgeId] = useState(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const canvasRef = useRef(null);

  // Add node when clicking on canvas
  const handleCanvasClick = (e) => {
    if (selectedTool && e.target === canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect();
      const nodeType = NODE_TYPES.find((t) => t.id === selectedTool);

      const newNode = {
        id: `node-${Date.now()}`,
        type: selectedTool,
        x: e.clientX - rect.left - nodeType.width / 2,
        y: e.clientY - rect.top - nodeType.height / 2,
        label: nodeType?.label || "",
        width: nodeType.width,
        height: nodeType.height,
      };

      addNode(newNode);
      setSelectedNodeId(newNode.id);
      setSelectedEdgeId(null);
    } else {
      setSelectedNodeId(null);
      setSelectedEdgeId(null);
    }
  };

  // Handle node connections
  const handleConnectStart = (nodeId) => {
    setConnectorStart(nodeId);
    setIsConnecting(true);
    setSelectedNodeId(nodeId);
  };

  const handleConnectEnd = (nodeId) => {
    if (isConnecting && connectorStart && connectorStart !== nodeId) {
      const newEdge = {
        id: `edge-${Date.now()}`,
        from: connectorStart,
        to: nodeId,
      };
      addEdge(newEdge);
      setSelectedEdgeId(newEdge.id);
    }
    setConnectorStart(null);
    setIsConnecting(false);
  };

  // Node dragging handlers
  const handleDragStart = (nodeId, offsetX, offsetY) => {
    setDragOffset({ x: offsetX, y: offsetY });
    setSelectedNodeId(nodeId);
    setSelectedEdgeId(null);
  };

  const handleDrag = (nodeId, clientX, clientY) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const newX = clientX - rect.left - dragOffset.x;
    const newY = clientY - rect.top - dragOffset.y;
    moveNode(nodeId, { x: newX, y: newY });
  };

  const handleDragEnd = (nodeId, clientX, clientY) => {
    handleDrag(nodeId, clientX, clientY);
  };

  // Delete selected items
  const handleDelete = () => {
    if (selectedNodeId) {
      deleteNode(selectedNodeId);
      setSelectedNodeId(null);
    }
    if (selectedEdgeId) {
      deleteEdge(selectedEdgeId);
      setSelectedEdgeId(null);
    }
  };

  // Undo/Redo functionality
  const handleUndo = useCallback(() => {
    if (history.past.length === 0) return;
    const previous = history.past[history.past.length - 1];
    setHistory({
      past: history.past.slice(0, -1),
      present: previous,
      future: [history.present, ...history.future],
    });
  }, [history, setHistory]);

  const handleRedo = useCallback(() => {
    if (history.future.length === 0) return;
    const next = history.future[0];
    setHistory({
      past: [...history.past, history.present],
      present: next,
      future: history.future.slice(1),
    });
  }, [history, setHistory]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Delete") {
        handleDelete();
      }
      if (e.ctrlKey || e.metaKey) {
        if (e.key === "z") handleUndo();
        if (e.key === "y") handleRedo();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleUndo, handleRedo, selectedNodeId, selectedEdgeId]);

  return (
    <div className="workspace-container">
      <div className="toolbar">
        <div className="toolbar-section">
          <h3>Flowchart Elements</h3>
          {NODE_TYPES.map((nodeType) => (
            <button
              key={nodeType.id}
              className={`tool-button ${
                selectedTool === nodeType.id ? "active" : ""
              }`}
              onClick={() => {
                setSelectedTool(nodeType.id);
                setSelectedNodeId(null);
                setSelectedEdgeId(null);
              }}
              style={{ borderLeft: `4px solid ${nodeType.color}` }}
            >
              <span
                className="node-icon"
                style={{ backgroundColor: nodeType.color }}
              >
                {nodeType.icon}
              </span>
              {nodeType.label}
            </button>
          ))}
        </div>

        <div className="toolbar-section">
          <h3>Actions</h3>
          <button
            className="tool-button"
            onClick={() => {
              setSelectedTool(null);
              setSelectedNodeId(null);
              setSelectedEdgeId(null);
            }}
          >
            <span className="node-icon">✖</span>
            Cancel Selection
          </button>
          <button
            className="tool-button danger"
            onClick={handleDelete}
            disabled={!selectedNodeId && !selectedEdgeId}
          >
            <span className="node-icon">🗑</span>
            Delete Selected
          </button>
        </div>

        <div className="toolbar-section">
          <h3>History</h3>
          <button
            className="tool-button"
            onClick={handleUndo}
            disabled={history.past.length === 0}
          >
            <span className="node-icon">↩</span>
            Undo (Ctrl+Z)
          </button>
          <button
            className="tool-button"
            onClick={handleRedo}
            disabled={history.future.length === 0}
          >
            <span className="node-icon">↪</span>
            Redo (Ctrl+Y)
          </button>
        </div>
      </div>

      <div className="canvas-container" onClick={handleCanvasClick}>
        <div className="canvas-area" ref={canvasRef}>
          {nodes.map((node) => (
            <FlowNode
              key={node.id}
              node={node}
              onDragStart={handleDragStart}
              onDrag={handleDrag}
              onDragEnd={handleDragEnd}
              onConnectStart={handleConnectStart}
              onConnectEnd={handleConnectEnd}
              isSelected={selectedNodeId === node.id}
              onClick={(nodeId) => setSelectedNodeId(nodeId)}
            />
          ))}

          <svg className="edges-layer">
            <defs>
              <marker
                id="arrowhead"
                markerWidth="10"
                markerHeight="7"
                refX="8"
                refY="3.5"
                orient="auto"
              >
                <polygon points="0 0, 10 3.5, 0 7" fill="#666" />
              </marker>
            </defs>

            {edges.map((edge) => {
              const fromNode = nodes.find((n) => n.id === edge.from);
              const toNode = nodes.find((n) => n.id === edge.to);
              return fromNode && toNode ? (
                <Edge
                  key={edge.id}
                  from={fromNode}
                  to={toNode}
                  isSelected={selectedEdgeId === edge.id}
                  onClick={() => setSelectedEdgeId(edge.id)}
                />
              ) : null;
            })}

            {/* Temporary connecting line during connection */}
            {isConnecting && connectorStart && (
              <path
                className="connecting-line"
                d={`M${
                  nodes.find((n) => n.id === connectorStart)?.x +
                  nodes.find((n) => n.id === connectorStart)?.width / 2
                } 
                 ${
                   nodes.find((n) => n.id === connectorStart)?.y +
                   nodes.find((n) => n.id === connectorStart)?.height / 2
                 }
                 L${
                   nodes.find((n) => n.id === connectorStart)?.x +
                   nodes.find((n) => n.id === connectorStart)?.width
                 } 
                 ${
                   nodes.find((n) => n.id === connectorStart)?.y +
                   nodes.find((n) => n.id === connectorStart)?.height / 2
                 }`}
              />
            )}
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Workspace;
