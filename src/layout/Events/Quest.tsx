import { observer } from "mobx-react-lite";
import ActionButton from "../ActionButtons/ActionButton";
import { getGameQuestById } from "../../data/questData";
import { parseDescription } from "../../utility/Helper/ParseTextToJSX";

type QuestProps = {
	questId: string;
	onFinish: () => void;
};

const Quest: React.FC<QuestProps> = observer(({ questId, onFinish }) => {
	// Keine Ahnung was ich mir hierbei gedacht habe!
	// const navigate = useNavigate();
	// const { eventId, backPath } = useParams<{
	// 	eventId: string;
	// 	backPath: string;
	// }>();
	// const handleFinishEvent = () => {
	// 	navigate(`/${backPath}`, { replace: true });
	// };

	const quest = getGameQuestById(questId);
	const label = parseDescription(quest?.label || "Unbekannte Aufgabe");
	const description = parseDescription(quest?.description || "");
	const reward = parseDescription(quest?.reward || "");

	// #region [jsx]
	return (
		<div className="max-width">
			<div>{label}</div>
			<div>{description}</div>
			<div className="mb-1">{reward}</div>
			<ActionButton onClick={onFinish} label="Aufgabe notiert" />
		</div>
	);
	// #endregion
});

export default Quest;
