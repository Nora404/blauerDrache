import { useState } from "react";
import { GameEvent, GameAction } from "../../data/eventData";
import { parseDescription } from "../../utility/Helper/ParseTextToJSX";
import {
  getGameEventById,
  pickRandomNextEvent,
} from "../../utility/Helper/TriggerEvent";
import { useApplyGameAction } from "../../utility/Hooks/ApplyGameAction";

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
  const event = getGameEventById(eventId);
  const { applyGameAction } = useApplyGameAction();
  const [currentEvent, setCurrentEvent] = useState<GameEvent | null>(
    event || null
  );

  // Falls das Event nicht gefunden wird
  if (!currentEvent) {
    return <div>Unbekanntes Event: {eventId}</div>;
  }

  // Beschreibungstext parsen
  const descriptionJSX = parseDescription(currentEvent.description);

  // [NEU] Wenn der Spieler einen Button klickt
  const handleButtonClick = (getAction: () => GameAction) => {
    const action = getAction();

    // Aktion ausführen (Buffs, Stats, Items usw.)
    applyGameAction(action);

    // Falls ein Kampf getriggert wird
    if (action.triggerBattle) {
      onTriggerBattle(action.triggerBattle);
      return;
    }

    // Falls eine Quest gestartet wird
    if (action.triggerQuest) {
      onTriggerQuest(action.triggerQuest);
      return;
    }

    // Falls ein Folge-Event kommt
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

    // Wenn nichts mehr folgt, sind wir fertig
    onFinish();
  };

  // [NEU] Renderer
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
};

export default Event;
