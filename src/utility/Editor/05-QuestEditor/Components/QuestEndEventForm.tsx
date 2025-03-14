// QuestEndEventForm.tsx
import ActionBtn from "./ActionBtn";
import { useQuestCreatorContext } from "../../Context/QuestContext";
import TextEditor from "../../Components/TextEditor/TextEditor";

export default function QuestEndEventForm() {
	const { endEventId, endDescription, setEndDescription, endButtons, setEndButtons } =
		useQuestCreatorContext();

	return (
		<div style={{ border: "1px solid #ccc", padding: 10, margin: "10px 0" }}>
			<h4>End-Event ({endEventId || "?"})</h4>
			<label>Beschreibung:</label>
			<TextEditor value={endDescription} onChange={(val) => setEndDescription(val)} />

			<ActionBtn buttons={endButtons} setButtons={setEndButtons} label="End-Buttons" />
		</div>
	);
}
