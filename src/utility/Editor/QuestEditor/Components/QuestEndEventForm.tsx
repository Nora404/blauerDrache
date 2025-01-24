// QuestEndEventForm.tsx
import React from "react";

import ActionBtn from "./ActionBtn";
import DescriptionEditor from "../../EventEditor/Components/DescriptionEditor";
import { useQuestCreatorContext } from "../../Context/QuestContext";


export default function QuestEndEventForm() {
  const {
    endEventId,
    endDescription,
    setEndDescription,
    endButtons,
    setEndButtons,
  } = useQuestCreatorContext();

  return (
    <div style={{ border: "1px solid #ccc", padding: 10, margin: "10px 0" }}>
      <h4>End-Event ({endEventId || "?"})</h4>
      <label>Beschreibung:</label>
      <DescriptionEditor
        value={endDescription}
        onChange={(val) => setEndDescription(val)}
      />

      <ActionBtn
        buttons={endButtons}
        setButtons={setEndButtons}
        label="End-Buttons"
      />
    </div>
  );
}
