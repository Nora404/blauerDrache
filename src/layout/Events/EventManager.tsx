//#region [import]
import React, { useState, useEffect } from "react";
import { WeightedEvent } from "../../data/eventData";
import {
  filterEventsByConditions,
  pickRandomNextEvent,
} from "../../utility/Helper/TriggerEvent";
import { useRootStore } from "../../store";
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
  const {
    gameTime,
    gameState,
    playerStats,
    playerQuest,
    playerBase,
    playerFlux,
    playerMeta,
    playerEconomy,
  } = useRootStore();

  const [currentBattleId, setCurrentBattleId] = useState<string | null>(null);
  const [currentQuestId, setCurrentQuestId] = useState<string | null>(null);
  const [currentEventId, setCurrentEventId] = useState<string | null>(null);
  //#endregion

  //#region [useEffekt]
  useEffect(() => {
    if (events.length === 0 && forcedEventId === undefined) return;

    const validEvents = filterEventsByConditions(
      events,
      gameTime.data,
      gameState.data,
      playerStats.data,
      playerBase.data,
      playerFlux.data,
      playerMeta.data,
      playerQuest.data,
      playerEconomy.data
    );

    let chosenEventId: string | null = null;
    if (forcedEventId) {
      chosenEventId = forcedEventId;
    } else {
      chosenEventId = pickRandomNextEvent(validEvents);
    }

    if (chosenEventId) {
      setCurrentEventId(chosenEventId);
    } else {
      onFinish();
    }
  }, [
    events,
    forcedEventId,
    gameTime.data,
    gameState.data,
    playerStats.data,
    playerBase.data,
    playerFlux.data,
    playerMeta.data,
    playerQuest.data,
    playerEconomy.data,
    onFinish,
  ]);
  //#endregion

  //#region [jsx]
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
        onFinish={onFinish}
      />
    );
  }

  return <div>Kein Event verfügbar</div>;
  //#endregion
};
