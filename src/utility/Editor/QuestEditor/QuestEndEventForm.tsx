// QuestEndEventForm.tsx
import React from "react";
import { useQuestCreatorContext } from "../Context/QuestContext";
import DescriptionEditor from "../Components/DescriptionEditor";
import ActionBtn from "./ActionBtn";
import SingleButtonForm from "../Components/SingeBtnForm";


export default function QuestEndEventForm() {
  const {
    endEventId,
    endDescription,
    setEndDescription,
    endButtons,
    setEndButtons,
  } = useQuestCreatorContext();

  return (
    <div style={{ padding: 10, margin: "10px 0" }}>
      <h4>End-Event ({endEventId || "?"})</h4>
      <label>Beschreibung:</label>
      <DescriptionEditor
        value={endDescription}
        onChange={(val) => setEndDescription(val)}
      />

<SingleButtonForm
        title="Abschluss-Button"
        button={endButtons}
        setButton={setEndButtons}
      />
    </div>
  );
}
