//#region [imports]
import React from "react";
import { GameAction } from "../../data/eventData";
import { parseDescription } from "../../utility/Helper/ParseTextToJSX";
import {
  getBattleTiggerById,
  getGameEventById,
  getQuestTriggerById,
  pickRandomNextEvent,
} from "../../utility/Helper/TriggerEvent";
import { useApplyGameAction } from "../../utility/Hooks/ApplyGameAction";
import ActionButton from "../ActionButtons/ActionButton";
import HeaderSmall from "../Header/HeaderSmall";
//#endregion

//#region [prepare]
type EventProps = {
  eventId: string;
  onTriggerBattle?: (battleId: string) => void;
  onTriggerQuest?: (questId: string) => void;
  onNextEvent?: (nextEventId: string) => void;
  onFinish: () => void;
};

const Event: React.FC<EventProps> = ({
  eventId,
  onTriggerBattle,
  onTriggerQuest,
  onNextEvent,
  onFinish,
}) => {
  const { applyGameAction } = useApplyGameAction();

  // Suche das Event in den Listen (Game, Quest, Battle)
  const event =
    getGameEventById(eventId) ||
    getQuestTriggerById(eventId) ||
    getBattleTiggerById(eventId);

  if (!event) {
    return <div>Unbekanntes Event: {eventId}</div>;
  }

  const descriptionJSX = parseDescription(event.description);

  const handleButtonClick = (getAction: () => GameAction) => {
    const action = getAction();
    applyGameAction(action);

    // Falls ein Kampf oder eine Quest getriggert wird, an den Manager weitergeben
    if (action.triggerBattle) {
      onTriggerBattle?.(action.triggerBattle);
      return;
    }
    if (action.triggerQuest) {
      onTriggerQuest?.(action.triggerQuest);
      return;
    }

    // Ermitteln des Folge-Events (falls vorhanden)
    let nextEventId: string | null = null;
    if (action.nextEvents && action.nextEvents.length > 0) {
      nextEventId = pickRandomNextEvent(action.nextEvents);
    } else if (action.nextEvents) {
      nextEventId = action.nextEvents[0].eventId;
    }

    if (nextEventId) {
      // Statt die gesamte Kette lokal zu pflegen, übergeben wir den nächsten Event
      onNextEvent?.(nextEventId);
    } else {
      onFinish();
    }
  };

  return (
    <div className="max-width">
      {event.label && <HeaderSmall>{event.label}</HeaderSmall>}
      <p className="mb-1 text-left">{descriptionJSX}</p>
      {event.buttons.map((btn) => (
        <ActionButton
          key={btn.label}
          onClick={() => handleButtonClick(btn.getAction)}
          label={btn.label}
          result={btn.result}
        />
      ))}
      <ActionButton onClick={onFinish} label="Sich abwenden" />
    </div>
  );
};

export default Event;
//#endregion
