import { PlacesKeys } from "../../data/helper/colorfullStrings";
import {
  Conditions,
  GameEvent,
  gameEvents,
  NextEventOption,
  WeightedEvent,
} from "../../data/eventData";
import { ItemCartegoryName, ItemName, items } from "../../data/ItemData";
import { gameQuestEvents, getGameQuestById } from "../../data/questData";
import { GameState, GameTime, PlayerBase, PlayerFlux, PlayerMeta, PlayerQuest, PlayerStats } from "../../store/types";

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
//#endregion

//#region [random next event]
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
    if (conditions.playerFlux) {
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
//#endregion

//#region 
export function categorizeItems(): Record<ItemCartegoryName, ItemName[]> {
  return items.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item.name);
    return acc;
  }, {} as Record<ItemCartegoryName, ItemName[]>);
}
//#endregion

//#region [checkTime]
function checkGameTime(
  conditions: Partial<Conditions>, gameTimeData: Partial<GameTime>): boolean {
  // Helper-Funktion: Wandelt "HH:MM" in eine Zahl um
  const convertTimeToNumber = (time: string): number => {
    const [hours, minutes] = time.split(":").map(Number);
    return hours * 100 + minutes;
  };

  // Überprüfung von gameTime
  if (conditions.gameTime?.gameTime !== undefined) {
    const conditionTime = convertTimeToNumber(conditions.gameTime.gameTime ?? "");
    const currentTime = convertTimeToNumber(gameTimeData.gameTime ?? "");
    const operator = conditions.operator || "=";

    switch (operator) {
      case "<":
        if (!(currentTime < conditionTime)) return false;
        break;
      case ">":
        if (!(currentTime > conditionTime)) return false;
        break;
      default:
        if (!(currentTime === conditionTime)) return false;
    }
  }

  // Überprüfung von gameDay
  if (conditions.gameTime?.gameDay !== undefined) {
    if (conditions.gameTime?.gameDay !== gameTimeData.gameDay) {
      return false;
    }
  }

  // Alle Bedingungen erfüllt
  return true;
}
//#endregion

//#region [checkGame]
function checkGameState(
  conditionObj: Partial<Conditions>,
  gameStateData: Partial<GameState>
): boolean {
  const conditions = conditionObj.gameState;

  // Keine Bedingungen vorhanden
  if (!conditions) return true;

  const { weather, temperature, currentPath, currentEventQueue, switch: conditionSwitch } = conditions;

  // 1. Überprüfe `weather`
  if (weather !== undefined && weather !== gameStateData.weather) {
    return false;
  }

  // 2. Überprüfe `temperature`
  if (temperature !== undefined && temperature !== gameStateData.temperature) {
    return false;
  }

  // 3. Überprüfe `currentPath`
  if (currentPath !== undefined && currentPath !== gameStateData.currentPath) {
    return false;
  }

  // 4. Überprüfe `currentEventQueue`
  if (currentEventQueue) {
    for (const eventId in currentEventQueue) {
      const expectedPath = currentEventQueue[eventId];
      if (!gameStateData.currentEventQueue?.[eventId] || gameStateData.currentEventQueue[eventId] !== expectedPath) {
        return false;
      }
    }
  }

  // 5. Überprüfe `switch`
  if (conditionSwitch) {
    for (const key in conditionSwitch) {
      const expectedValue = conditionSwitch[key];
      if (gameStateData.switch?.[key] !== expectedValue) {
        return false;
      }
    }
  }

  // Alle Bedingungen erfüllt
  return true;
}
//#endregion

//#region [checkPlayer]
function checkPlayerStats(
  conditionObj: Partial<Conditions>,
  playerStatsData: Partial<PlayerStats>
): boolean {

  const conditions = conditionObj.playerStats;
  // Wenn keine Bedingungen für playerStats gesetzt sind, ist die Prüfung automatisch erfüllt
  if (!conditions) return true;

  // Helper-Funktion: Vergleiche zwei Zahlen basierend auf dem Operator
  const compareWithOperator = (value: number, conditionValue: number, operator: "<" | ">" | "="): boolean => {
    switch (operator) {
      case "<":
        return value < conditionValue;
      case ">":
        return value > conditionValue;
      case "=":
      default:
        return value === conditionValue;
    }
  };

  // Überprüfung jedes Werts in `playerStats`
  for (const statKey in conditions) {
    const conditionValue = conditions[statKey as keyof PlayerStats];
    const operator = conditionObj.operator || "=";
    const playerValue = playerStatsData[statKey as keyof PlayerStats];

    // Überprüfen, ob ein Vergleich notwendig ist
    if (conditionValue !== undefined && playerValue !== undefined) {
      if (!compareWithOperator(playerValue, conditionValue, operator)) {
        return false;
      }
    }
  }

  // Alle Bedingungen erfüllt
  return true;
}
//#endregion

//#region [checkBase]
// Ja, es wiederholt sich, aber das ist besser zu lesen und zu verstehen
// Ich arbeite alleine, ich darf das!
function checkPlayerBase(
  conditionObj: Partial<Conditions>,
  playerBaseData: Partial<PlayerBase>
): boolean {

  const conditions = conditionObj.playerBase;
  // Wenn keine Bedingungen für playerBase gesetzt sind, ist die Prüfung automatisch erfüllt
  if (!conditions) return true;

  // Helper-Funktion: Vergleiche zwei Zahlen basierend auf dem Operator
  const compareWithOperator = (value: number, conditionValue: number, operator: "<" | ">" | "="): boolean => {
    switch (operator) {
      case "<":
        return value < conditionValue;
      case ">":
        return value > conditionValue;
      case "=":
      default:
        return value === conditionValue;
    }
  };

  // Überprüfung jedes Werts in `playerBase`
  for (const baseKey in conditions) {
    const conditionValue = conditions[baseKey as keyof PlayerBase];
    const operator = conditionObj.operator || "="; // Standard: `=`
    const playerValue = playerBaseData[baseKey as keyof PlayerBase];

    // Überprüfen, ob ein Vergleich notwendig ist
    if (conditionValue !== undefined && playerValue !== undefined) {
      if (!compareWithOperator(playerValue, conditionValue, operator)) {
        return false;
      }
    }
  }

  // Alle Bedingungen erfüllt
  return true;
}
//#endregion

//#region [checkFlux]
function checkPlayerFlux(
  conditionObj: Partial<Conditions>,
  playerFluxData: Partial<PlayerFlux>
): boolean {

  const conditions = conditionObj.playerFlux;
  // Wenn keine Bedingungen für playerFlux gesetzt sind, ist die Prüfung automatisch erfüllt
  if (!conditions && conditionObj.haveBuffs === undefined && conditionObj.haveDebuffs === undefined) {
    return true;
  }

  // 1. Überprüfung von `haveBuffs`
  if (conditionObj.haveBuffs !== undefined) {
    const hasBuffs = playerFluxData.buff && Object.keys(playerFluxData.buff).length > 0;
    if (conditionObj.haveBuffs !== hasBuffs) {
      return false;
    }
  }

  // 2. Überprüfung von `haveDebuffs`
  if (conditionObj.haveDebuffs !== undefined) {
    const hasDebuffs = playerFluxData.debuff && Object.keys(playerFluxData.debuff).length > 0;
    if (conditionObj.haveDebuffs !== hasDebuffs) {
      return false;
    }
  }

  // 3. Überprüfung von `feeling`
  if (conditions?.feeling !== undefined) {
    if (conditions.feeling !== playerFluxData.feeling) {
      return false;
    }
  }

  // 4. Überprüfung von `buff`
  if (conditions?.buff) {
    for (const buffName in conditions.buff) {
      const requiredBuffValue = conditions.buff[buffName as keyof typeof conditions.buff];
      const playerBuffValue = playerFluxData.buff?.[buffName as keyof typeof conditions.buff];

      if (requiredBuffValue !== undefined) {
        // Prüfen, ob der Buff existiert
        if (playerBuffValue === undefined) {
          return false;
        }
      }
    }
  }

  // 5. Überprüfung von `debuff`
  if (conditions?.debuff) {
    for (const debuffName in conditions.debuff) {
      const requiredDebuffValue = conditions.debuff[debuffName as keyof typeof conditions.debuff];
      const playerDebuffValue = playerFluxData.debuff?.[debuffName as keyof typeof conditions.debuff];

      if (requiredDebuffValue !== undefined) {
        // Prüfen, ob der Debuff existiert
        if (playerDebuffValue === undefined) {
          return false;
        }
      }
    }
  }

  // 6. Überprüfung von `weapon`
  if (conditions?.weapon !== undefined) {
    if (conditions.weapon !== playerFluxData.weapon) {
      return false;
    }
  }

  // 7. Überprüfung von `armor`
  if (conditions?.armor !== undefined) {
    if (conditions.armor !== playerFluxData.armor) {
      return false;
    }
  }

  // 8. Überprüfung von `item`
  if (conditions?.item !== undefined) {
    if (conditions.item !== playerFluxData.item) {
      return false;
    }
  }

  // Alle Bedingungen erfüllt
  return true;
}
//#endregion

//#region [checkMeta]
function checkPlayerMeta(
  conditionObj: Partial<Conditions>,
  playerMetaData: Partial<PlayerMeta>
): boolean {

  const conditions = conditionObj.playerMeta;
  // Wenn keine Bedingungen für playerMeta gesetzt sind, ist die Prüfung automatisch erfüllt
  if (!conditions) return true;

  // 1. Überprüfung von `name`
  if (conditions.name !== undefined) {
    if (conditions.name !== playerMetaData.name) {
      return false;
    }
  }

  // 2. Überprüfung von `race`
  if (conditions.race !== undefined) {
    if (conditions.race !== playerMetaData.race) {
      return false;
    }
  }

  // 3. Überprüfung von `origin`
  if (conditions.origin !== undefined) {
    if (conditions.origin !== playerMetaData.origin) {
      return false;
    }
  }

  // 4. Überprüfung von `calling`
  if (conditions.calling !== undefined) {
    if (conditions.calling !== playerMetaData.calling) {
      return false;
    }
  }

  // 5. Überprüfung von `titel`
  if (conditions.titel !== undefined) {
    if (conditions.titel !== playerMetaData.titel) {
      return false;
    }
  }

  // 6. Überprüfung von `colortype`
  if (conditions.colortype !== undefined) {
    if (conditions.colortype !== playerMetaData.colortype) {
      return false;
    }
  }

  // 7. Überprüfung von `colors` (Array)
  if (conditions.colors !== undefined) {
    for (const color of conditions.colors) {
      // Jede Farbe aus den Bedingungen muss in den Player-Daten vorhanden sein
      if (!playerMetaData.colors?.includes(color)) {
        return false;
      }
    }
  }

  // Alle Bedingungen erfüllt
  return true;
}
//#endregion