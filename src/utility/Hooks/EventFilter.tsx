import { useMemo } from "react";
import { useRootStore } from "../../store";
import { EventActionButtons, WeightedEvent } from "../../data/eventData";
import {
  checkAllConditions,
  filterEventsByConditions,
} from "../Event/TriggerEvent";

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

export function useButtonFilter(buttons: EventActionButtons[]) {
  const {
    gameTime,
    gameState,
    playerStats,
    playerBase,
    playerFlux,
    playerMeta,
    playerEconomy,
  } = useRootStore();

  const filterButtons = buttons.filter((btn) => {
    return checkAllConditions(
      btn.conditions,
      gameTime.data,
      gameState.data,
      playerStats.data,
      playerBase.data,
      playerFlux.data,
      playerMeta.data,
      playerEconomy.data
    );
  });

  return filterButtons;
}
