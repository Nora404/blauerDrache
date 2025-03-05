//#region [imports]
import React, { useState, useEffect } from "react";
import { WeightedEvent } from "../../data/eventData";
import { pickRandomEvent } from "../../utility/Event/TriggerEvent";
import { useEventFilter } from "../../utility/Hooks/EventFilter";
import Combat from "./Combat";
import Quest from "./Quest";
import Event from "./Event";
import { useNavigate } from "react-router-dom";
import ActionButton from "../ActionButtons/ActionButton";
//#endregion

//#region [prepare]
type EventManagerProps = {
  events: WeightedEvent[];
  forcedEventId?: string;
  backPath?: string,
  chanceOfAnyEvent?: number;
  allowNoEvent?: boolean;
  backBtn?: boolean;
  onFinish?: () => void;
};

export const EventManager: React.FC<EventManagerProps> = ({
  events,
  forcedEventId,
  chanceOfAnyEvent = 0.50,
  allowNoEvent = false,
  backPath = "/",
  backBtn = false,
  onFinish,
}) => {

  const navigate = useNavigate();
  const validEvents = useEventFilter(events);
  const [currentBattleId, setCurrentBattleId] = useState<string | null>(null);
  const [currentQuestId, setCurrentQuestId] = useState<string | null>(null);
  const [currentEventId, setCurrentEventId] = useState<string | null>(null);

  const handleFinishEvent = () => {
    if (onFinish) {
      onFinish();
    } else {
      navigate(backPath);
    }
  }

  // Entweder das forcedEventId oder ein zufälliges Event auswählen
  useEffect(() => {
    if (currentEventId !== null) return;
    if (events.length === 0 && !forcedEventId) return;

    const options = { allowNoEvent, chanceOfAnyEvent };
    const chosenEventId = forcedEventId ? forcedEventId : pickRandomEvent(validEvents, options);
    if (chosenEventId) {
      setCurrentEventId(chosenEventId);
    } else {
      handleFinishEvent();
    }
    // Wichtig: currentEventId ist nicht als Dependency, damit einmalig gewählt wird.
  }, [forcedEventId, events, validEvents, onFinish]);

  if (currentBattleId) {
    return <Combat battleId={currentBattleId} />;
  }

  if (currentQuestId) {
    return <Quest questId={currentQuestId} />;
  }

  if (currentEventId) {
    return (
      <Event
        eventId={currentEventId}
        onTriggerBattle={setCurrentBattleId}
        onTriggerQuest={setCurrentQuestId}
        onNextEvent={(nextId) => {
          setCurrentEventId(nextId);
        }}
        onFinish={handleFinishEvent}
      />
    );
  }

  return <>{backBtn && <ActionButton onClick={handleFinishEvent} label="Sich abwenden" />}</>;
};
//#endregion
