// src/pages/SymbolsPage.js
import './SymbolsPage.css';

const symbols = [
  {
    name: "Start/End",
    description: "Represents the beginning or end of a process",
    image: "https://cdn.staticaly.com/gh/drawio/flowchart-symbols/main/start-end.png"
  },
  {
    name: "Input/Output",
    description: "Indicates data input or output operation",
    image: "https://cdn.staticaly.com/gh/drawio/flowchart-symbols/main/input-output.png"
  },
  {
    name: "Process",
    description: "Represents a processing step or operation",
    image: "https://cdn.staticaly.com/gh/drawio/flowchart-symbols/main/process.png"
  },
  {
    name: "Decision",
    description: "Indicates a decision point with multiple outcomes",
    image: "https://cdn.staticaly.com/gh/drawio/flowchart-symbols/main/decision.png"
  },
  {
    name: "Connector",
    description: "Shows connection between different parts",
    image: "https://cdn.staticaly.com/gh/drawio/flowchart-symbols/main/connector.png"
  },
  {
    name: "Predefined Process",
    description: "Named process defined elsewhere",
    image: "https://cdn.statualy.com/gh/drawio/flowchart-symbols/main/predefined-process.png"
  },
  {
    name: "Flow Line",
    description: "Shows direction of process flow",
    image: "https://cdn.staticaly.com/gh/drawio/flowchart-symbols/main/flow-line.png"
  }
];

export default function SymbolsPage() {
  return (
    <div className="symbols-page">
      <header className="symbols-header">
        <h1>Flowchart Symbols Library</h1>
        <p>Standard symbols used in flowchart diagrams</p>
      </header>
      
      <div className="symbols-grid">
        {symbols.map((symbol, index) => (
          <div key={index} className="symbol-card">
            <div className="symbol-image-container">
              <img 
                src={symbol.image}
                alt={symbol.name}
                className="symbol-image"
                loading="lazy"
              />
            </div>
            <div className="symbol-info">
              <h3 className="symbol-name">{symbol.name}</h3>
              <p className="symbol-description">{symbol.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}