import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { WeightedEvent } from "../../data/eventData";
import { useRootStore } from "../../store";
import { filterEventsByConditions } from "../Helper/TriggerEvent";
import { pickRandomEvent } from "../Random/RandomPickedEvent";
import { getQuestByEventId } from "../../data/questData";

export function useLocationEvents(
  possibleEvents: WeightedEvent[],
  backPath: string,
  chanceOfAnyEvent?: number,
) {
  const {
    gameTime,
    gameState,
    playerStats,
    playerBase,
    playerFlux,
    playerMeta,
    playerQuest,
    playerEconomy,
  } = useRootStore();

  const [localRandomEvent, setLocalRandomEvent] = useState<string | null>(null);
  const [questName, setQuestName] = useState<string | null>(null);
  const navigate = useNavigate();

  const queue = gameState.data.currentEventQueue;
  const path = gameState.data.currentPath;
  const firstEvent =
    Object.entries(queue).find(([eventId, eventPath]) => {
      return eventPath === path;
    })?.[0] || null;

  useEffect(() => {
    if (firstEvent !== null) {
      const questObj = getQuestByEventId(firstEvent);
      // setLocalRandomEvent(null);
      setQuestName(questObj?.label || null);
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
      playerQuest.data,
      playerEconomy.data,
    );
    if (!filtered.length) return;

    const randomEventId = pickRandomEvent(filtered, chanceOfAnyEvent);
    if (!randomEventId) return;

    const foundEvent = filtered.find((e) => e.eventId === randomEventId);
    if (foundEvent?.questId) {
      const isQuestActive = !!playerQuest.data.activeQuests[foundEvent.questId];
      if (isQuestActive) {
        // setLocalRandomEvent(null);
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
    playerEconomy.data,
  ]);

  const handleBack = () => {
    navigate(backPath);
  };

  const handleFinishEvent = () => {
    setLocalRandomEvent(null);
    navigate(backPath);
  };

  const handleFinishQuest = () => {
    navigate("/quest/" + firstEvent + "" + backPath);
  };

  return {
    localRandomEvent,
    firstEvent,
    questName,
    handleBack,
    handleFinishEvent,
    handleFinishQuest,
  };
}
