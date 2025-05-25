// src/components/MiniMap.js
import { useRef, useEffect } from "react";

const MiniMap = ({ nodes, edges, viewport, onViewportChange }) => {
  const canvasRef = useRef(null);
  const scale = 0.15; // 15% of original size

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw all nodes
    nodes.forEach((node) => {
      ctx.fillStyle =
        node.type === "start"
          ? "#4CAF50"
          : node.type === "end"
          ? "#F44336"
          : "#2196F3";
      ctx.fillRect(
        node.x * scale,
        node.y * scale,
        node.width * scale,
        node.height * scale
      );
    });

    // Draw viewport rectangle
    ctx.strokeStyle = "rgba(255,0,0,0.5)";
    ctx.lineWidth = 2;
    ctx.strokeRect(
      viewport.x * scale,
      viewport.y * scale,
      viewport.width * scale,
      viewport.height * scale
    );
  }, [nodes, viewport]);

  const handleClick = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / scale;
    const y = (e.clientY - rect.top) / scale;

    onViewportChange({
      x: x - viewport.width / 2,
      y: y - viewport.height / 2,
    });
  };

  return (
    <canvas
      ref={canvasRef}
      className="mini-map"
      width={viewport.width * scale}
      height={viewport.height * scale}
      onClick={handleClick}
    />
  );
};
