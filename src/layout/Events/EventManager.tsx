//#region [imports]
import React, { useState, useEffect } from "react";
import { WeightedEvent } from "../../data/eventData";
import { pickRandomNextEvent } from "../../utility/Event/TriggerEvent";
import { useEventFilter } from "../../utility/Hooks/EventFilter";
import Combat from "./Combat";
import Quest from "./Quest";
import Event from "./Event";
//#endregion

//#region [prepare]
type EventManagerProps = {
  events: WeightedEvent[];
  forcedEventId?: string;
  onFinish: () => void;
};

export const EventManager: React.FC<EventManagerProps> = ({
  events,
  forcedEventId,
  onFinish,
}) => {

  const validEvents = useEventFilter(events);
  const [currentBattleId, setCurrentBattleId] = useState<string | null>(null);
  const [currentQuestId, setCurrentQuestId] = useState<string | null>(null);
  const [currentEventId, setCurrentEventId] = useState<string | null>(null);

  useEffect(() => {
    // Wenn bereits ein Event ausgewählt wurde (z. B. Folgeevent), nicht neu berechnen!
    if (currentEventId !== null) return;

    // Falls weder Events noch forcedEvent vorhanden sind, nichts tun
    if (events.length === 0 && !forcedEventId) return;

    // Falls forcedEventId existiert, diesen nutzen – ansonsten zufällig aus den gefilterten Events wählen
    const chosenEventId = forcedEventId ? forcedEventId : pickRandomNextEvent(validEvents);
    if (chosenEventId) {
      setCurrentEventId(chosenEventId);
    } else {
      onFinish();
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
        onFinish={onFinish}
      />
    );
  }

  return <div>Kein Event verfügbar</div>;
};
//#endregion
