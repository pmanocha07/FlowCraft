export const saveToLocal = (name, flowchart) => {
  const flowcharts = JSON.parse(localStorage.getItem("flowcharts") || "{}");
  const id = "flow-" + Date.now();
  flowcharts[id] = { id, name, ...flowchart };
  localStorage.setItem("flowcharts", JSON.stringify(flowcharts));
  return id;
};

export const loadFromLocal = (id) => {
  const flowcharts = JSON.parse(localStorage.getItem("flowcharts") || "{}");
  return flowcharts[id] || null;
};

export const exportAsJSON = (flowchart) => {
  return (
    "data:application/json;charset=utf-8," +
    encodeURIComponent(JSON.stringify(flowchart, null, 2))
  );
};
