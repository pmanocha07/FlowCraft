import { useState } from 'react';
import './TemplatesPage.css';

const algorithms = {
  sorting: [
    { 
      name: 'Merge Sort',
      type: 'sorting',
      flowchartImage: '/images/merge-sort-flowchart.png',
      code: `function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));
  return merge(left, right);
}

function merge(left, right) {
  let result = [];
  while (left.length && right.length) {
    left[0] < right[0] ? result.push(left.shift()) : result.push(right.shift());
  }
  return [...result, ...left, ...right];
}`
    },
    {
      name: 'Bubble Sort',
      type: 'sorting',
      flowchartImage: '/images/bubble-sort-flowchart.png',
      code: `function bubbleSort(arr) {
  let swapped;
  do {
    swapped = false;
    for (let i = 0; i < arr.length - 1; i++) {
      if (arr[i] > arr[i + 1]) {
        [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
        swapped = true;
      }
    }
  } while (swapped);
  return arr;
}`
    }
  ],
  searching: [
    {
      name: 'Binary Search',
      type: 'searching',
      flowchartImage: '/images/binary-search-flowchart.png',
      code: `function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) return mid;
    arr[mid] < target ? left = mid + 1 : right = mid - 1;
  }
  return -1;
}`
    },
    {
      name: 'Linear Search',
      type: 'searching',
      flowchartImage: '/images/linear-search-flowchart.png',
      code: `function linearSearch(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) return i;
  }
  return -1;
}`
    }
  ]
};

export default function TemplatesPage() {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState(null);
  const [fullscreenView, setFullscreenView] = useState(null);

  const openFullscreen = (type) => {
    setFullscreenView(type);
  };

  const closeFullscreen = () => {
    setFullscreenView(null);
  };

  return (
    <div className="templates-page">
      {/* Sorting Algorithms Section */}
      <section className="algorithm-section">
        <h2 className="section-title">Sorting Algorithms</h2>
        <div className="cards-container">
          {algorithms.sorting.map((algo, index) => (
            <div 
              key={index}
              className="algorithm-card"
              onClick={() => setSelectedAlgorithm(algo)}
            >
              <img
                src={algo.flowchartImage}
                alt={`${algo.name} Flowchart`}
                className="algorithm-image"
              />
              <h3 className="algorithm-name">{algo.name}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* Searching Algorithms Section */}
      <section className="algorithm-section">
        <h2 className="section-title">Searching Algorithms</h2>
        <div className="cards-container">
          {algorithms.searching.map((algo, index) => (
            <div 
              key={index}
              className="algorithm-card"
              onClick={() => setSelectedAlgorithm(algo)}
            >
              <img
                src={algo.flowchartImage}
                alt={`${algo.name} Flowchart`}
                className="algorithm-image"
              />
              <h3 className="algorithm-name">{algo.name}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* Algorithm Modal */}
      {selectedAlgorithm && (
        <div className="algorithm-modal">
          <div className="modal-content">
            <button 
              className="close-btn"
              onClick={() => setSelectedAlgorithm(null)}
            >
              &times;
            </button>
            <h2>{selectedAlgorithm.name}</h2>
            
            <div className="modal-columns">
              <div 
                className="modal-section code-section"
                onClick={() => openFullscreen('code')}
              >
                <h3>Code</h3>
                <pre className="algorithm-code">
                  {selectedAlgorithm.code}
                </pre>
              </div>
              
              <div 
                className="modal-section image-section"
                onClick={() => openFullscreen('flowchart')}
              >
                <h3>Flowchart</h3>
                <img
                  src={selectedAlgorithm.flowchartImage}
                  alt={`${selectedAlgorithm.name} Flowchart`}
                  className="modal-flowchart-image"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Fullscreen View */}
      {fullscreenView && (
        <div className="fullscreen-view" onClick={closeFullscreen}>
          <div className="fullscreen-content">
            {fullscreenView === 'code' ? (
              <pre className="fullscreen-code">
                {selectedAlgorithm.code}
              </pre>
            ) : (
              <img
                src={selectedAlgorithm.flowchartImage}
                alt={`${selectedAlgorithm.name} Flowchart`}
                className="fullscreen-image"
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}