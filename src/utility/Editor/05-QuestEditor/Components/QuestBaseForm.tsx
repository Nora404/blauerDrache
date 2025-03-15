// Pfad anpassen! Reuse deinen Editor, wenn du möchtest.

import Talk from "../../../Formatted/Talk";
import TextEditor from "../../Components/TextEditor/TextEditor";
import VariableInput from "../../Components/VariableInputText/VariableInput";
import { useQuestCreatorContext } from "../../Context/QuestContext";

export default function QuestBaseForm() {
	const {
		baseId,
		setBaseId,
		questId,
		triggerEventId,
		endEventId,
		label,
		setLabel,
		description,
		setDescription,
		reward,
		setReward,
		repeat,
		setRepeat,
		abort,
		setAbort
	} = useQuestCreatorContext();

	return (
		<div className="border-dotted" style={{ padding: "10px", margin: "1rem 0" }}>
			<h3>Basis Quest-Daten</h3>
			<div className="form-group">
				<label>Basis-ID* (z.B. "003FindStone"):</label>
				<input type="text" value={baseId} onChange={(e) => setBaseId(e.target.value)} />
				<ul>
					<li>Quest-ID lautet: <Talk>{questId || ""}</Talk></li>
					<li>Trigger-ID lautet: <Talk>{triggerEventId || ""}</Talk></li>
					<li>End-ID lautet: <Talk>{endEventId || ""}</Talk></li>
				</ul>
			</div>

			<div className="form-group">
				<label>Label:</label>
				<input type="text" value={label} onChange={(e) => setLabel(e.target.value)} />
			</div>

			<div className="form-group">
				<label>Beschreibung (DescriptionEditor):</label>
				<TextEditor value={description} onChange={(newVal) => setDescription(newVal)} />
			</div>

			<div className="form-group">
				<label>Beschreibung der Belohnung:</label>
				<VariableInput value={reward} onChange={(newVal) => setReward(newVal)} />
			</div>

			<div className="form-group">
				<label>
					<input type="checkbox" checked={repeat} onChange={(e) => setRepeat(e.target.checked)} />
					Quest darf sich wiederholen?
				</label>
				<label>
					<input type="checkbox" checked={abort} onChange={(e) => setAbort(e.target.checked)} />
					Quest darf abgebrochen werden?
				</label>
			</div>
		</div>
	);
}
