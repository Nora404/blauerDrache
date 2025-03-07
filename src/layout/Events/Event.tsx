//#region [imports]
import React, { useState } from "react";
import { GameAction } from "../../data/eventData";
import { parseDescription } from "../../utility/Helper/ParseTextToJSX";
import {
  getBattleTiggerById,
  getGameEventById,
  getQuestTriggerById,
  pickRandomNextEvent,
} from "../../utility/Event/TriggerEvent";
import { useApplyGameAction } from "../../utility/Hooks/ApplyGameAction";
import ActionButton from "../ActionButtons/ActionButton";
import HeaderSmall from "../Header/HeaderSmall";
import { useButtonFilter } from "../../utility/Hooks/EventFilter";
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
  const [finalOutcome, setFinalOutcome] = useState<React.ReactNode | null>(null);

  const event =
    getGameEventById(eventId) || getQuestTriggerById(eventId) || getBattleTiggerById(eventId);

  // Hooks müssen vor Bedingungen/Early-Return aufgerufen werden
  const validButtons = useButtonFilter(event ? event.buttons : []);

  if (!event) {
    return <div>Unbekanntes Event: {eventId}</div>;
  }

  const descriptionJSX = parseDescription(event.description);
  //#endregion

  //#region [handler]
  const handleButtonClick = (getAction: () => GameAction) => {
    const action = getAction();
    applyGameAction(action);

    if (action.triggerBattle) {
      onTriggerBattle?.(action.triggerBattle);
      return;
    }
    if (action.triggerQuest) {
      onTriggerQuest?.(action.triggerQuest);
      return;
    }

    let nextEventId: string | null = null;
    if (action.nextEvents && action.nextEvents.length > 0) {
      nextEventId = pickRandomNextEvent(action.nextEvents);
    } else if (action.nextEvents) {
      nextEventId = action.nextEvents[0].eventId;
    }

    const outcomeMsg = parseDescription(action.message ?? "");

    if (nextEventId) {
      onNextEvent?.(nextEventId);
    } else {
      setFinalOutcome(outcomeMsg);
    }
  };
  //#endregion

  //#region [jsx]
  return (
    <div className="max-width">
      {event.label && <HeaderSmall>{event.label}</HeaderSmall>}
      <p className="mb-1 text-left">{descriptionJSX}</p>
      {finalOutcome === null ? (
        validButtons.map((btn) => (
          <ActionButton
            key={btn.label}
            onClick={() => handleButtonClick(btn.getAction)}
            label={btn.label}
            result={btn.result}
          />
        ))
      ) : (
        <p className="mb-1 text-left" style={{ color: "#aaffff" }}>
          {finalOutcome}
        </p>
      )}
      <ActionButton onClick={onFinish} label="Sich abwenden" />
    </div>
  );
};

export default Event;
//#endregion
