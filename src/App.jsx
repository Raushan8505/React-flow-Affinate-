import React, { useCallback, useState } from "react";
import ReactFlow, {
  ReactFlowProvider,
  useNodesState,
  useEdgesState,
  addEdge,
  Controls,
} from "reactflow";

import ZoomNode from "./ZoomNode";

import "reactflow/dist/style.css";
import "./index.css";

const snapGrid = [20, 20];
const nodeTypes = {
  zoom: ZoomNode,
};

const initialNodes = [
  {
    id: "1",
    type: "zoom",
    data: {
      content: (
        <div>
          <h4>Unveiling the Mysteries of UI</h4>
          <p>
            Welcome to an exciting exploration of the fascinating world of User
            Interface (UI) design! In this blog, we embark on a journey of
            discovery as we delve into the most common questions surrounding UI
            design and provide simple and insightful answers.
          </p>
        </div>
      ),
      zoom: 1,
    },
    position: { x: 500, y: 250 },
  },
  {
    id: "2",
    type: "zoom",
    data: {
      content: (
        <div>
          <h4>Interaction Metaphors</h4>
          <p>
            Interaction design creates technology experiences that seamlessly
            respond to human intent, balancing form and function for intuitive
            use.
          </p>
        </div>
      ),
      zoom: 1,
    },
    position: { x: 50, y: 50 },
  },
  {
    id: "3",
    type: "zoom",
    data: {
      content: (
        <div>
          <h4>Kinetics Physics</h4>
          <p>
            In physics and engineering, kinetics is the branch of classical
            mechanics that is concerned with the relationship between the motion
            and its causes, specifically, forces and torques.
          </p>
        </div>
      ),
      zoom: 1,
    },
    position: { x: 50, y: 250 },
  },
  {
    id: "4",
    type: "zoom",
    data: {
      content: (
        <div>
          <h4>Swipe gestures</h4>
          <p>
            A swipe gesture occurs when a person moves one or more fingers
            across the screen in a specific horizontal or vertical direction.
          </p>
        </div>
      ),
      zoom: 1,
    },
    position: { x: 50, y: 450 },
  },
  {
    id: "5",
    type: "zoom",
    data: {
      content: (
        <div>
          <h4>Frequency and Novelty</h4>
          <p>
            Frequency (matching) and novelty principles have been shown
            previously to operate in transfer tests following paired-associate
            learning, but not under the same stimulus and response conditions.
          </p>
        </div>
      ),
      zoom: 1,
    },
    position: { x: 900, y: 50 },
  },
  {
    id: "6",
    type: "zoom",
    data: {
      content: (
        <div>
          <h4>Fitts’ Law</h4>
          <p>
            Fitts’ law states that the amount of time required for a person to
            move a pointer (e.g., mouse cursor) to a target area is a function
            of the distance to the target divided by the size of the target.
          </p>
        </div>
      ),
      zoom: 1,
    },
    position: { x: 900, y: 350 },
  },
];

const initialEdges = [
  {
    id: "e1-2",
    source: "2",
    target: "1",
    sourceHandle: "right",
    // animated: true,
  },
  {
    id: "e1-3",
    source: "3",
    target: "1",
    sourceHandle: "right",
    // animated: true,
  },
  {
    id: "e1-4",
    source: "4",
    target: "1",
    sourceHandle: "right",
    // animated: true,
  },
  {
    id: "e1-5",
    source: "1",
    target: "5",
    targetHandle: "left",
    // animated: true,
  },
  {
    id: "e1-6",
    source: "1",
    target: "6",
    targetHandle: "left",
    // animated: true,
  },
];

const defaultViewport = { x: 0, y: 0, zoom: 1 };

const ContextualZoomFlow = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [focusedNode, setFocusedNode] = useState(null);
  const [zoom, setZoom] = useState(1);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge({ ...params, animated: true }, eds)),
    []
  );

  const handleNodeClick = (event, node) => {
    setFocusedNode(node.id);
    setZoom(node.data.zoom || 1); 
  };

  const handleZoomChange = (event) => {
    const newZoom = parseFloat(event.target.value);
    setZoom(newZoom);
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === focusedNode) {
          return {
            ...node,
            data: {
              ...node.data,
              zoom: newZoom,
            },
          };
        } else {
          const minZoom = 0.3; 
          const decrementFactor = 0.7;
          const otherNodeZoom = Math.max(
            minZoom,
            1 - (newZoom - 1) * decrementFactor
          );
          return {
            ...node,
            data: {
              ...node.data,
              zoom: otherNodeZoom,
            },
          };
        }
      })
    );
  };

  return (
    <div style={{ height: "100vh" }}>
      <ReactFlow
        nodes={nodes.map((node) => ({
          ...node,
          data: {
            ...node.data,
            focused: node.id === focusedNode,
          },
        }))}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        snapToGrid={true}
        snapGrid={snapGrid}
        defaultViewport={defaultViewport}
        onNodeClick={handleNodeClick}
        attributionPosition="top-right"
      >
        <Controls />
      </ReactFlow>
      {focusedNode && (
        <div className="zoom-controls">
          <label>Focused:</label>
          <input
            type="range"
            min="0.5"
            max="3"
            step="0.1"
            value={zoom}
            onChange={handleZoomChange}
            className="zoom-slider"
          />
          <div className="zoom-scale">
            {[...Array(26).keys()].map((i) => (
              <div key={i} className="tick">
                {i % 5 === 0 && (
                  <span className="tick-label">{(i / 10).toFixed(1)}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const WrappedContextualZoomFlow = () => (
  <ReactFlowProvider>
    <ContextualZoomFlow />
  </ReactFlowProvider>
);

export default WrappedContextualZoomFlow;
