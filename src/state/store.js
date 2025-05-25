import { create } from "zustand";

export const useFlowStore = create((set) => ({
  nodes: [],
  edges: [],
  history: {
    past: [],
    present: { nodes: [], edges: [] },
    future: [],
  },

  addNode: (node) =>
    set((state) => {
      const newNodes = [...state.nodes, node];
      return {
        nodes: newNodes,
        history: updateHistory(state.history, {
          nodes: newNodes,
          edges: state.edges,
        }),
      };
    }),

  moveNode: (nodeId, position) =>
    set((state) => {
      const newNodes = state.nodes.map((node) =>
        node.id === nodeId ? { ...node, ...position } : node
      );
      return {
        nodes: newNodes,
        history: updateHistory(state.history, {
          nodes: newNodes,
          edges: state.edges,
        }),
      };
    }),

  deleteNode: (nodeId) =>
    set((state) => {
      const newNodes = state.nodes.filter((node) => node.id !== nodeId);
      const newEdges = state.edges.filter(
        (edge) => edge.from !== nodeId && edge.to !== nodeId
      );
      return {
        nodes: newNodes,
        edges: newEdges,
        history: updateHistory(state.history, {
          nodes: newNodes,
          edges: newEdges,
        }),
      };
    }),

  addEdge: (edge) =>
    set((state) => {
      // Prevent duplicate connections and self-connections
      if (edge.from === edge.to) return state;
      if (state.edges.some((e) => e.from === edge.from && e.to === edge.to))
        return state;

      const newEdges = [...state.edges, edge];
      return {
        edges: newEdges,
        history: updateHistory(state.history, {
          nodes: state.nodes,
          edges: newEdges,
        }),
      };
    }),

  deleteEdge: (edgeId) =>
    set((state) => {
      const newEdges = state.edges.filter((edge) => edge.id !== edgeId);
      return {
        edges: newEdges,
        history: updateHistory(state.history, {
          nodes: state.nodes,
          edges: newEdges,
        }),
      };
    }),

  setHistory: (newHistory) =>
    set({
      history: newHistory,
      nodes: newHistory.present.nodes,
      edges: newHistory.present.edges,
    }),
}));

function updateHistory(history, newPresent) {
  return {
    past: [...history.past, history.present],
    present: newPresent,
    future: [],
  };
}
