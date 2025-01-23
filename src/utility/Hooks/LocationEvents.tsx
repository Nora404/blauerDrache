import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { WeightedEvent } from "../../data/eventData";
import { useRootStore } from "../../store";
import { filterEventsByConditions } from "../Helper/TriggerEvent";
import { pickRandomEvent } from "../Random/RandomPickedEvent";

export function useLocationEvents(
  possibleEvents: WeightedEvent[],
  backPath: string
) {
  const {
    gameTime,
    gameState,
    playerStats,
    playerBase,
    playerFlux,
    playerMeta,
    playerQuest,
  } = useRootStore();

  const [localRandomEvent, setLocalRandomEvent] = useState<string | null>(null);
  const navigate = useNavigate();

  const queue = gameState.data.currentEventQueue;
  const path = gameState.data.currentPath;
  const firstEvent =
    Object.entries(queue).find(([eventId, eventPath]) => {
      return eventPath === path;
    })?.[0] || null;

  useEffect(() => {
    if (firstEvent !== null) {
      setLocalRandomEvent(null);
      return;
    }

    if (!possibleEvents.length) {
      return;
    }

    const filtered = filterEventsByConditions(
      possibleEvents,
      gameTime.data,
      gameState.data,
      playerStats.data,
      playerBase.data,
      playerFlux.data,
      playerMeta.data,
      playerQuest.data
    );
    if (!filtered.length) return;

    const randomEventId = pickRandomEvent(filtered, 0.8);
    if (!randomEventId) return;

    const foundEvent = filtered.find((e) => e.eventId === randomEventId);
    if (foundEvent?.questId) {
      const isQuestActive = !!playerQuest.data.activeQuests[foundEvent.questId];
      if (isQuestActive) {
        setLocalRandomEvent(null);
        return;
      }
    }

    setLocalRandomEvent(randomEventId);
  }, [
    firstEvent,
    possibleEvents,
    gameTime.data,
    gameState.data,
    playerStats.data,
    playerBase.data,
    playerFlux.data,
    playerMeta.data,
    playerQuest.data,
  ]);

  const handleBack = () => {
    navigate(backPath);
  };

  const handleFinishLocalEvent = () => {
    setLocalRandomEvent(null);
    navigate(backPath);
  };

  const handleFinishQuestEvent = () => {
    // if (firstEvent !== null) {
    //   const newQueue = { ...queue };
    //   delete newQueue[firstEvent];
    //   gameState.setGameState({ currentEventQueue: newQueue });
    navigate(backPath);
    // }
  };

  return {
    localRandomEvent,
    firstEvent,
    handleBack,
    handleFinishLocalEvent,
    handleFinishQuestEvent,
  };
}
