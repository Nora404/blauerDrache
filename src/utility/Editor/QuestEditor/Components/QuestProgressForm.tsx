// QuestProgressForm.tsx
import React, { useState } from "react";

import TaskEditor from "./TaskEditor";
import { TaskType } from "../../../../data/questData";
import { useQuestCreatorContext } from "../../Context/QuestContext";

export default function QuestProgressForm() {
  const { progress, setProgress } = useQuestCreatorContext();

  const handleTypeChange = (newType: TaskType) => {
    setProgress({ ...progress, type: newType });
  };

  return (
    <div style={{ border: "1px solid #ccc", padding: "10px", margin: "1rem 0" }}>
      <h3>Progress / Aufgabe</h3>
      <div className="form-group">
        <label>Type:</label>
        <select
          value={progress.type}
          onChange={(e) => handleTypeChange(e.target.value as TaskType)}
        >
          <option value="Begegnung">Begegnung</option>
          <option value="Besorgen">Besorgen</option>
          <option value="Benutzten">Benutzten</option>
          <option value="Besuchen">Besuchen</option>
          <option value="Besiegen">Besiegen</option>
          <option value="Erfahrung">Erfahrung</option>
          <option value="Verbessern">Verbessern</option>
          <option value="Geheimnis">Geheimnis</option>
        </select>
      </div>

      <div className="form-group">
        <label>path (wo schließt man ab?):</label>
        <input
          type="text"
          value={progress.path}
          onChange={(e) => setProgress({ ...progress, path: e.target.value })}
        />
      </div>

      <div className="form-group">
        <label>eventByEnd:</label>
        <input
          type="text"
          value={progress.eventByEnd}
          onChange={(e) =>
            setProgress({ ...progress, eventByEnd: e.target.value })
          }
        />
      </div>

      {/* TaskEditor für label, talkWith, haveItem usw. */}
      <TaskEditor />

    </div>
  );
}
