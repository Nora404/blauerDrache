// QuestTriggerEventForm.tsx

import TextEditor from "../../Components/TextEditor/TextEditor";
import { useQuestCreatorContext } from "../../Context/QuestContext";
import ActionBtn from "./ActionBtn";

//   ^ dein existierendes Buttons-UI, falls du es recyceln willst
//   oder du schreibst eine eigene Komponente, die "triggerButtons" statt "buttons" verwendet.

export default function QuestTriggerEventForm() {
	const {
		triggerEventId,
		triggerDescription,
		setTriggerDescription,
		triggerButtons,
		setTriggerButtons,
	} = useQuestCreatorContext();

	return (
		<div className="border-dotted" style={{ padding: 10, margin: "10px 0" }}>
			<h4>Trigger-Event ({triggerEventId || "?"})</h4>
			<label>Beschreibung:</label>
			<TextEditor value={triggerDescription} onChange={(val) => setTriggerDescription(val)} />

			{/* Buttons: Du kannst dein ActionBtn anpassen, 
          damit es statt useEditorContext() den "triggerButtons" state nutzt */}
			<ActionBtn buttons={triggerButtons} setButtons={setTriggerButtons} label="Trigger-Buttons" />
		</div>
	);
}
