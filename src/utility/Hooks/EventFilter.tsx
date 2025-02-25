import { useMemo } from "react";
import { useRootStore } from "../../store";
import { WeightedEvent } from "../../data/eventData";
import { filterEventsByConditions } from "../Helper/TriggerEvent";

export function useEventFilter(events: WeightedEvent[]): WeightedEvent[] {
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

  const filteredEvents = useMemo(() => {
    return filterEventsByConditions(
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
  }, [
    events,
    gameTime.data,
    gameState.data,
    playerStats.data,
    playerBase.data,
    playerFlux.data,
    playerMeta.data,
    playerQuest.data,
    playerEconomy.data,
  ]);

  return filteredEvents;
}
