import { observer } from "mobx-react-lite";
import { GameEventChain } from "./GameEventChain";
import { useNavigate, useParams } from "react-router-dom";

type QuestProps = {};

const Quest: React.FC<QuestProps> = observer(() => {
  const navigate = useNavigate();
  const { eventId, backPath } = useParams<{
    eventId: string;
    backPath: string;
  }>();

  console.log(backPath);
  const handleFinishEvent = () => {
    // navigate(backPath || "/start");
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
