import { observer } from "mobx-react-lite";
import { useNavigate, useParams } from "react-router-dom";
import Event from "./Event";

type QuestProps = {
  questId: string;
};

const Quest: React.FC<QuestProps> = observer(({ questId }) => {
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
      <Event
        eventId={questId || ""}
        onFinish={handleFinishEvent}
      />
    </div>
  );
  // #endregion
});

export default Quest;
