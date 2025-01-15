import React from "react";
import { useEditorContext } from "../Context/Context";

const BaseInfo: React.FC = () => {
  const { eventId, label, description, setEventId, setLabel, setDescription } =
    useEditorContext();

  return (
    <div className="max-widht">
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
      <div className="form-group">
        <label>Beschreibung:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
        />
      </div>
    </div>
  );
};

export default BaseInfo;
