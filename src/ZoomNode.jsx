import React, { memo } from "react";
import { Handle, Position } from "reactflow";

const ZoomNode = ({ id, data }) => {
  const nodeZoom = data.zoom || 1;
  const isMinimized = nodeZoom < 0.8;
  const borderColor = data.focused ? "blue" : "black";

  return (
    <div
      style={{
        transform: `scale(${nodeZoom})`,
        padding: 10,
        border: `2px solid ${borderColor}`,
        backgroundColor: "white",
        borderRadius: "5px",
        width: "250px",
        overflow: "hidden",
      }}
    >
      <Handle type="target" position={Position.Left} />
      {isMinimized ? (
        <h4>{data.content.props.children[0].props.children}</h4>
      ) : (
        data.content
      )}
      <Handle type="source" position={Position.Right} />
    </div>
  );
};

export default memo(ZoomNode);
