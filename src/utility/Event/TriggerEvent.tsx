import { PlacesKeys } from "../../data/helper/colorfullStrings";
import {
  Conditions,
  GameEvent,
  NextEventOption,
  WeightedEvent,
} from "../../data/eventData";
import { getGameQuestById } from "../../data/questData";
import {
  GameState,
  GameTime,
  PlayerBase,
  PlayerEconomy,
  PlayerFlux,
  PlayerMeta,
  PlayerQuest,
  PlayerStats,
} from "../../store/types";
import { gameEvents } from "../../data/eventList";
import { gameQuestEvents } from "../../data/questList";
import { gameBattlesEvents } from "../../data/battleList";
import { checkGameState } from "./CheckGameStateConditions";
import { checkGameTime } from "./CheckGameTimeConditions";
import { checkPlayerBase } from "./CheckPlayerBaseConditions";
import { checkPlayerEconomy } from "./CheckPlayerEconomyConditions";
import { checkPlayerFlux } from "./CheckPlayerFluxConditions";
import { checkPlayerMeta } from "./CheckPlayerMetaConditions";
import { checkPlayerStats } from "./CheckPlayerStatsConditions";

//#region [event by place]
export function getEventByPlace(currentPlace: PlacesKeys): GameEvent | null {
  // 40%-Chance dass überhaupt was passiert
  if (Math.random() > 0.4) {
    return null;
  }

  // alle Events, die dieses place haben
  const relevantEvents = gameEvents.filter((event: GameEvent) =>
    event.places.some((p) => p.place === currentPlace)
  );
  if (relevantEvents.length === 0) {
    return null;
  }

  // randomNum 1..100 => filtern nach probability
  const randomNum = Math.floor(Math.random() * 100) + 1;
  const filteredEvents = relevantEvents.filter((ev) => {
    const placeData = ev.places.find((p) => p.place === currentPlace);
    return placeData && randomNum <= placeData.probability;
  });
  if (filteredEvents.length === 0) {
    return null;
  }

  // wenn mehrere Events infrage kommen, wähle eines
  const pickIndex = Math.floor(Math.random() * filteredEvents.length);
  return filteredEvents[pickIndex];
}
//#endregion

//#region [event by id]
export function getGameEventById(id: string): GameEvent | undefined {
  return gameEvents.find((event) => event.id === id);
}

export function getQuestTriggerById(id: string): GameEvent | undefined {
  return gameQuestEvents.find((event) => event.id === id);
}

export function getBattleTiggerById(id: string): GameEvent | undefined {
  return gameBattlesEvents.find((event) => event.id === id);
}
//#endregion

//#region [random event]
export function pickRandomNextEvent(
  eventOptions: NextEventOption[]
): string | null {
  const totalProbability = eventOptions.reduce(
    (sum, option) => sum + option.probability,
    0
  );
  if (totalProbability <= 0) {
    return null;
  }

  let randomValue = Math.random() * totalProbability;

  // Ist probability < randomValue wenn ja dann hat das Event gewonnen
  // Wenn nein wird probability vom randomValue abgezogen und die Schleife geht weiter
  // Je größer die Warscheinlichkeit des Events umso mehr "Bereich" hat es in randomValue
  for (const option of eventOptions) {
    if (randomValue < option.probability) {
      return option.eventId;
    }
    randomValue -= option.probability;
  }

  return null;
}

export function pickRandomEvent(
  eventPool: WeightedEvent[],
  options?: { allowNoEvent?: boolean; chanceOfAnyEvent?: number }
): string | null {
  const allowNoEvent = options?.allowNoEvent ?? true;
  const chanceOfNoEvent = options?.chanceOfAnyEvent ?? 0.5;

  if (allowNoEvent && Math.random() < chanceOfNoEvent) {
    console.log("No Event");
    return null;
  }

  const totalWeight = eventPool.reduce((sum, e) => sum + e.probability, 0);
  if (totalWeight <= 0) return null;
  console.log("TotalWeight: ", totalWeight);

  let randomValue = Math.random() * totalWeight;
  for (const e of eventPool) {
    if (randomValue < e.probability) {
      return e.eventId;
    }
    randomValue -= e.probability;
  }

  return eventPool[eventPool.length - 1].eventId;
}

//#endregion

//#region [check conditions]
export function checkAllConditions(
  conditions: Conditions | undefined,
  gameTimeData: GameTime,
  gameStateData: GameState,
  playerStatsData: PlayerStats,
  playerBaseData: PlayerBase,
  playerFluxData: PlayerFlux,
  playerMetaData: PlayerMeta,
  playerEconomyData: PlayerEconomy
): boolean {
  console.log("CheckAllFN: ", playerEconomyData);

  // Falls gar keine conditions gesetzt sind, ist alles ok:
  if (!conditions) return true;

  // 1) gameTime check
  if (conditions.gameTime) {
    if (!checkGameTime(conditions, gameTimeData)) {
      return false;
    }
  }

  // 2) gameState check
  if (conditions.gameState) {
    if (!checkGameState(conditions, gameStateData)) {
      return false;
    }
  }

  // 3) playerStats check
  if (conditions.playerStats) {
    if (!checkPlayerStats(conditions, playerStatsData)) {
      return false;
    }
  }

  // 4) playerBase check
  if (conditions.playerBase) {
    if (!checkPlayerBase(conditions, playerBaseData)) {
      return false;
    }
  }

  // 5) playerFlux check
  if (
    conditions.playerFlux ||
    conditions.haveBuffs !== undefined ||
    conditions.haveDebuffs !== undefined
  ) {
    if (!checkPlayerFlux(conditions, playerFluxData)) {
      return false;
    }
  }

  // 6) playerMeta check
  if (conditions.playerMeta) {
    if (!checkPlayerMeta(conditions, playerMetaData)) {
      return false;
    }
  }

  // 7) playerEconomy check
  if (conditions.playerEconomy) {
    if (!checkPlayerEconomy(conditions, playerEconomyData)) {
      return false;
    }
  }

  return true;
}

export function filterEventsByConditions(
  events: WeightedEvent[],
  gameTimeData: GameTime,
  gameStateData: GameState,
  playerStatsData: PlayerStats,
  playerBaseData: PlayerBase,
  playerFluxData: PlayerFlux,
  playerMetaData: PlayerMeta,
  playerQuestData: PlayerQuest,
  playerEconomyData: PlayerEconomy
): WeightedEvent[] {
  return events.filter((evt) => {
    console.log("FilterFN: ", playerEconomyData);
    // Falls das Event gar keine conditions hat, ist es direkt ok
    if (!evt.conditions) return true;

    const pass = checkAllConditions(
      evt.conditions,
      gameTimeData,
      gameStateData,
      playerStatsData,
      playerBaseData,
      playerFluxData,
      playerMetaData,
      playerEconomyData
    );
    if (!pass) return false;

    if (evt.questId) {
      const questDef = getGameQuestById(evt.questId);
      if (questDef) {
        const isDone = playerQuestData.completedQuest.includes(evt.questId);
        if (isDone && questDef.repeat === false) {
          return false;
        }
      }
    }

    return true;
  });
}
//#endregion
