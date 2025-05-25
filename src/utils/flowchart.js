// Validate the structure of the flowchart
export const validateFlowchart = (nodes, edges) => {
  const errors = [];
  const nodeIds = new Set(nodes.map((n) => n.id));

  // Track which nodes are connected
  const connectedNodes = new Set();
  edges.forEach((edge) => {
    connectedNodes.add(edge.from);
    connectedNodes.add(edge.to);
  });

  // Validate connections
  nodes.forEach((node) => {
    if (!connectedNodes.has(node.id)) {
      if (node.type === "start") {
        errors.push("Start node should have at least one outgoing connection");
      } else if (node.type === "end") {
        errors.push("End node should have at least one incoming connection");
      } else {
        errors.push(`Node '${node.label || node.id}' is unconnected`);
      }
    }
  });

  // Validate if all edges connect valid node IDs
  edges.forEach((edge) => {
    if (!nodeIds.has(edge.from) || !nodeIds.has(edge.to)) {
      errors.push(
        `Edge connects to a non-existent node (${edge.from} → ${edge.to})`
      );
    }
  });

  return errors;
};

// Detect cycles in the flowchart using DFS
export const detectCycles = (nodes, edges) => {
  const graph = {};
  const visited = {};
  const recursionStack = {};

  // Build adjacency list
  nodes.forEach((node) => {
    graph[node.id] = [];
  });

  edges.forEach((edge) => {
    if (graph[edge.from]) {
      graph[edge.from].push(edge.to);
    }
  });

  const isCyclicUtil = (nodeId) => {
    if (!visited[nodeId]) {
      visited[nodeId] = true;
      recursionStack[nodeId] = true;

      for (const neighbor of graph[nodeId]) {
        if (!visited[neighbor] && isCyclicUtil(neighbor)) {
          return true;
        } else if (recursionStack[neighbor]) {
          return true;
        }
      }
    }

    recursionStack[nodeId] = false;
    return false;
  };

  for (const node of nodes) {
    if (isCyclicUtil(node.id)) {
      return true;
    }
  }

  return false;
};

// Generate a unique ID for a new node
export const generateNodeId = () => {
  return "node-" + Math.random().toString(36).substr(2, 9);
};
