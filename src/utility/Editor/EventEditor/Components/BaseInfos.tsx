// BaseInfo.tsx
import React from "react";
import { useEditorContext } from "../../Context/EventContext";
import DescriptionEditor from "./DescriptionEditor";

const BaseInfo: React.FC = () => {
  const {
    eventId,
    label,
    description,
    setEventId,
    setLabel,
    setDescription,
  } = useEditorContext();

  return (
    <div className="max-widht" style={{ border: "1px dashed gray", padding: "15px", marginBottom: "25px" }}>
      <div className="form-group">
        <label>ID*:</label>
        <input
          type="text"
          value={eventId}
          onChange={(e) => setEventId(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label>Label*:</label>
        <input
          type="text"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          required
        />
      </div>

      <DescriptionEditor
        value={description}
        onChange={(newVal) => setDescription(newVal)}
      />
    </div>
  );
};

export default BaseInfo;
