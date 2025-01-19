import { PlacesKeys } from "../data/colorfullStrings";
import {
  GameEvent,
  gameEvents,
  NextEventOption,
  WeightedEvent,
} from "../data/eventData";
import { ItemCartegoryName, ItemName, items } from "../data/ItemData";
import { gameQuestEvents, getGameQuestById } from "../data/questData";
import { useRootStore } from "../store";
import { TimeStore } from "../store/TimeStore";
import { GameState, GameStore, GameTime, PlayerBase, PlayerFlux, PlayerMeta, PlayerQuest, PlayerStats } from "../store/types";

//#region [gray]
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

//#region [gray]
export function getGameEventById(id: string): GameEvent | undefined {
  return gameEvents.find((event) => event.id === id);
}

export function getQuestTriggerById(id: string): GameEvent | undefined {
  return gameQuestEvents.find((event) => event.id === id);
}
//#endregion

//#region [gray]
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
//#endregion

//#region [helper]
export function filterEventsByConditions(
  events: WeightedEvent[],
  gameTimeData: GameTime,
  gameStateData: GameState,
  playerStatsData: PlayerStats,
  playerBaseData: PlayerBase,
  playerFluxData: PlayerFlux,
  playerMetaData: PlayerMeta,
  playerQuestData: PlayerQuest): WeightedEvent[] {

  return events.filter((evt) => {
    // Falls das Event gar keine conditions hat, ist es direkt ok
    if (!evt.conditions) return true;

    const { conditions } = evt;

    // 1) gameTime check
    if (conditions.gameTime) {
      if (!checkPartialMatch(gameTimeData, conditions.gameTime)) {
        return false;
      }
    }

    // 2) gameState check
    if (conditions.gameState) {
      if (!checkPartialMatch(gameStateData, conditions.gameState)) {
        return false;
      }
    }

    // 3) playerStats check
    if (conditions.playerStats) {
      if (!checkPartialMatch(playerStatsData, conditions.playerStats)) {
        return false;
      }
    }

    // 4) playerBase check
    if (conditions.playerBase) {
      if (!checkPartialMatch(playerBaseData, conditions.playerBase)) {
        return false;
      }
    }

    // 5) playerFlux check
    if (conditions.playerFlux) {
      if (!checkPartialMatch(playerFluxData, conditions.playerFlux)) {
        return false;
      }
    }

    // 6) playerMeta check
    if (conditions.playerMeta) {
      if (!checkPartialMatch(playerMetaData, conditions.playerMeta)) {
        return false;
      }
    }

    // 7) Quest check
    if (evt.questId) {
      const questDef = getGameQuestById(evt.questId);
      if (questDef) {
        const isDone = playerQuestData.completedQuest.includes(evt.questId);
        if (isDone && questDef.repeat === false) {
          return false;
        }
      }
    }

    // Wenn alles passt:
    return true;
  });
}

// checkPartialMatch(obj, part) => true, wenn alle Keys in 'part' übereinstimmen
// Falls du an manchen Stellen “größer/kleiner” Prüfungen willst (z.B. “life >= 50”),
// müsstest du das natürlich entsprechend anpassen. Aktuell ist es nur eine Gleichheitsprüfung.
function checkPartialMatch<T extends object>(
  obj: T,
  part: Partial<T>
): boolean {
  // Wenn keine Bedingungen gesetzt => true
  if (!part) return true;

  // Für jeden Key in 'part': prüfen, ob obj[key] === part[key]
  for (const key in part) {
    if (obj[key] !== part[key]) {
      return false;
    }
  }
  return true;
}
//#endregion

export function categorizeItems(): Record<ItemCartegoryName, ItemName[]> {
  return items.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item.name);
    return acc;
  }, {} as Record<ItemCartegoryName, ItemName[]>);
}
