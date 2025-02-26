import { observer } from "mobx-react-lite";
import { GameEventChain } from "./GameEventChain";
import { useNavigate, useParams } from "react-router-dom";

type QuestProps = {
  questId: string;
};

const Quest: React.FC<QuestProps> = observer(({ questId }) => {
  const navigate = useNavigate();
  const { eventId, backPath } = useParams<{
    eventId: string;
    backPath: string;
  }>();

  console.log(backPath);
  console.log(questId);
  const handleFinishEvent = () => {
    navigate(`/${backPath}`, { replace: true });
  };

  // #region [jsx]
  return (
    <div className="max-width">
      <GameEventChain
        initialEventName={eventId || ""}
        onFinishChain={handleFinishEvent}
      />
    </div>
  );
  // #endregion
});

export default Quest;
