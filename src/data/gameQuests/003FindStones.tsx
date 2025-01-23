import { GameEvent } from "../eventData";
import { GameQuest } from "../questData";

export const quest003FindStone: GameQuest = {
  id: "Q003FindStone",
  label: "Sammle 3 Steine",
  description:
    "Die Leute am {PLACES.Brunnen} brauchen Hilfe Steine zu besorgen.",
  reward:
    "Du wirst etwas {SYSTEM.Gold} bekommen und dein {SYSTEM.Ruf} verbessern.",
  eventByEnd: "E003ThreeStoneEnd",
  progress: {
    type: "Besorgen",
    path: "/fountain-people",
    eventByEnd: "E003FindStoneEnd",
    isDone: false,
    task: { haveItem: [{ item: "Stein", need: 3, count: 0 }] },
  },

  repeat: true,
};

export const event003FindStoneTrigger: GameEvent = {
  id: "E003FindStoneTrigger",
  label: "Drei Steine gesucht",
  description: "Die Leute am Brunnen suchen Hilfe beim Steine-Sammeln.",
  buttons: [
    {
      label: "Annehmen",
      getAction: () => {
        return {
          message: "Du hast die Quest angenommen!",
          triggerQuest: "Q003FindStone",
        };
      },
    },
    {
      label: "Ablehnen",
      getAction: () => {
        return {
          message: "Du lehntest ab...",
        };
      },
    },
  ],
  places: [],
};

export const event003FindStoneEnd: GameEvent = {
  id: "E003FindStoneEnd",
  label: "Drei Steine abgegeben",
  description: "Die Leute am Brunnen snd dir sehr Dankbar.",
  buttons: [
    {
      label: "gern geschehen",
      getAction: () => {
        return {
          message: "Du hast für die Steine 5 {SYSTEM.Gold} bekommen",
          endQuest: "Q003FindStone",
          itemsDelta: { Stein: -3 },
          economyDelta: { gold: 5 },
          baseDelta: { reputation: 3 },
        };
      },
    },
  ],
  places: [],
};
