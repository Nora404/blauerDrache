//#region [import]
import { useState } from "react";
import { GameEvent, GameAction } from "../../data/eventData";
import { parseDescription } from "../../utility/Helper/ParseTextToJSX";
import {
  getBattleTiggerById,
  getGameEventById,
  getQuestTriggerById,
  pickRandomNextEvent,
} from "../../utility/Helper/TriggerEvent";
import { useApplyGameAction } from "../../utility/Hooks/ApplyGameAction";
//#endregion

//#region [prepare]
type EventProps = {
  eventId: string;
  onTriggerBattle: (battleId: string) => void;
  onTriggerQuest: (questId: string) => void;
  onFinish: () => void;
};

const Event: React.FC<EventProps> = ({
  eventId,
  onTriggerBattle,
  onTriggerQuest,
  onFinish,
}) => {
  const event =
    getGameEventById(eventId) ||
    getQuestTriggerById(eventId) ||
    getBattleTiggerById(eventId);

  const { applyGameAction } = useApplyGameAction();
  const [currentEvent, setCurrentEvent] = useState<GameEvent | null>(
    event || null
  );

  if (!currentEvent) {
    return <div>Unbekanntes Event: {eventId}</div>;
  }
  const descriptionJSX = parseDescription(currentEvent.description);
  //#endregion

  //#region [handle]
  const handleButtonClick = (getAction: () => GameAction) => {
    const action = getAction();
    applyGameAction(action);

    if (action.triggerBattle) {
      console.log("🔍 trigger battle: ", action.triggerBattle);
      onTriggerBattle(action.triggerBattle);
      return;
    }

    if (action.triggerQuest) {
      onTriggerQuest(action.triggerQuest);
      return;
    }

    if (action.nextEvents && action.nextEvents.length > 0) {
      const nextEventId = pickRandomNextEvent(action.nextEvents);
      if (nextEventId) {
        const nextEvent = getGameEventById(nextEventId);
        if (nextEvent) {
          setCurrentEvent(nextEvent);
          return; // => Nächstes Event
        }
      }
    }

    onFinish();
  };
  //#endregion

  //#region [jsx]
  return (
    <div className="max-width">
      <h3>{currentEvent.label || currentEvent.id}</h3>
      <div className="mb-1">{descriptionJSX}</div>

      {currentEvent.buttons.map((btn) => (
        <button
          key={btn.label}
          onClick={() => handleButtonClick(btn.getAction)}
          style={{ margin: "0.5rem" }}
        >
          {btn.label}
        </button>
      ))}
    </div>
  );
  //#endregion
};

export default Event;
