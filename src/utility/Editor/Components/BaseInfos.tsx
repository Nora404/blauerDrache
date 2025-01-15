// BaseInfo.tsx
import React from "react";
import { useEditorContext } from "../Context/Context";
import DescriptionEditor from "./DescriptionEditor"; // Der Pfad zu deinem neuen File

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

      {/* Hier nutzen wir jetzt unseren Editor für die Beschreibung */}
      <DescriptionEditor
        value={description}            // der aktuelle Wert
        onChange={(newVal) => setDescription(newVal)} // State aktualisieren
      />
    </div>
  );
};

export default BaseInfo;
