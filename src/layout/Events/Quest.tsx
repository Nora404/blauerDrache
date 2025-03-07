import { observer } from "mobx-react-lite";
import { useNavigate, useParams } from "react-router-dom";
import Event from "./Event";
import ActionButton from "../ActionButtons/ActionButton";

type QuestProps = {
	questId: string;
	onFinish: () => void;
};

const Quest: React.FC<QuestProps> = observer(({ questId, onFinish }) => {
	const navigate = useNavigate();
	const { eventId, backPath } = useParams<{
		eventId: string;
		backPath: string;
	}>();

	const handleFinishEvent = () => {
		navigate(`/${backPath}`, { replace: true });
	};

	// #region [jsx]
	return (
		<div className="max-width">
			Das ist ein Test
			<ActionButton onClick={onFinish} label="Sich abwenden" />
		</div>
	);
	// #endregion
});

export default Quest;
