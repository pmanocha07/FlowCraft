export default function Edge({ edge, nodes }) {
  const fromNode = nodes.find((n) => n.id === edge.from);
  const toNode = nodes.find((n) => n.id === edge.to);

  if (!fromNode || !toNode) return null;

  const getNodeCenter = (node) => {
    const width = node.type === "decision" ? 80 : 60;
    const height = node.type === "decision" ? 80 : 60;
    return {
      x: node.x + width / 2,
      y: node.y + height / 2,
    };
  };

  const from = getNodeCenter(fromNode);
  const to = getNodeCenter(toNode);

  // Calculate arrow path
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const angle = Math.atan2(dy, dx);
  const headLength = 10;
  const headAngle = Math.PI / 6;

  const pathData = `M${from.x},${from.y} L${to.x},${to.y}`;
  const arrowPoints = [
    [to.x, to.y],
    [
      to.x - headLength * Math.cos(angle - headAngle),
      to.y - headLength * Math.sin(angle - headAngle),
    ],
    [
      to.x - headLength * Math.cos(angle + headAngle),
      to.y - headLength * Math.sin(angle + headAngle),
    ],
  ]
    .map((p) => p.join(","))
    .join(" ");

  return (
    <>
      <path
        d={pathData}
        stroke="#6C5CE7"
        strokeWidth="2"
        fill="none"
        markerEnd="url(#arrowhead)"
      />
      <polygon points={arrowPoints} fill="#6C5CE7" />
    </>
  );
}
