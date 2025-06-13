//#region [import]
import { observer } from "mobx-react-lite";
import ActionButton from "../ActionButtons/ActionButton";
import { emptyQuest, getGameQuestById } from "../../data/questData";
import { parseDescription } from "../../utility/Helper/ParseTextToJSX";
import { greenColors } from "../../data/helper/colorMappingData";
//#endregion

//#region [prepare]
type QuestProps = {
	questId: string;
	onFinish: () => void;
};

/**
 * @param {string} questId - ID der anzuzeigenden Quest.
 * @param {Function} onFinish - Callback, der ausgeführt wird, wenn die Quest abgeschlossen ist.
 */
const Quest: React.FC<QuestProps> = observer(({ questId, onFinish }) => {
	const quest = getGameQuestById(questId) || emptyQuest;
	const label = parseDescription(quest?.label || "Unbekannte Aufgabe");
	const description = parseDescription(quest?.description || "");
	const reward = parseDescription(quest?.reward || "");
	//#endregion

	// #region [jsx]
	return (
		<div className="max-width flex-center">
			<div className="text-left questbox paper">
				({quest.progress.type}) <strong>{quest.label}</strong>
				<p>{label}</p>
				<p className="mb-1">{description}</p>
				<p className="mb-1">{reward}</p>
				<ActionButton
					onClick={onFinish}
					color={greenColors}
					bgColor="green"
					label="Aufgabe notiert"
				/>
			</div>
		</div>
	);
	// #endregion
});

export default Quest;
