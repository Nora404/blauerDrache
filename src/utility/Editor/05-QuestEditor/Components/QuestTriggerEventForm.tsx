import TextEditor from "../../Components/TextEditor/TextEditor";
import { useQuestCreatorContext } from "../../Context/QuestContext";

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

			<h4>Button: Annehmen</h4>
			<div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
				<label>Label</label>
				<input
					type="text"
					placeholder="Annehmen"
					value="Annehmen"
					style={{ width: "auto" }}
				/>
				<label>Beschreibung</label>
				<input
					type="text"
					placeholder="Beschreibung"
					value="Du hast die Quest angenommen."
					style={{ flex: 1 }}
				/>
			</div>

			<h4>Button: Ablehnen</h4>
			<div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
				<label>Label</label>
				<input
					type="text"
					placeholder="Ablehnen"
					value="Ablehnen"
					style={{ width: "auto" }}
				/>
				<label>Beschreibung</label>
				<input
					type="text"
					placeholder="Beschreibung"
					value="Du lehnst ab..."
					style={{ flex: 1 }}
				/>
			</div>
		</div>
	);
}
