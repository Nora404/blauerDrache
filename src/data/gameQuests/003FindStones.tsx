import { GameEvent } from "../eventData";
import { GameQuest } from "../questData";

export const quest003FindStone: GameQuest = {
  id: "Q002FindStone",
  label: "Sammle 3 Steine",
  description:
    "Die Leute am {PLACES.Brunnen} brauchen Hilfe Steine zu besorgen.",
  reward:
    "Du wirst etwas {SYSTEM.Gold} bekommen und dein {SYSTEM.Ruf} verbessern.",
  eventByEnd: "E001ThreeStoneEnd",
  progress: {
    type: "Besorgen",
    path: "/fountain-people",
    eventByEnd: "E001ThreeStoneEnd",
    isDone: false,
    task: { haveItem: [{ item: "Stein", need: 3, count: 0 }] },
  },

  repeat: true,
};

export const event003FindStoneTrigger: GameEvent = {
  id: "E002FindStoneTrigger",
  label: "Drei Steine gesucht",
  description: "Die Leute am Brunnen suchen Hilfe beim Steine-Sammeln.",
  buttons: [
    {
      label: "Annehmen",
      getAction: () => {
        return {
          message: "Du hast die Quest angenommen!",
          triggerQuest: "Q003FFindStone",
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

export const event001ThreeStoneEnd: GameEvent = {
  id: "E00FindStoneEnd",
  label: "Drei Steine abgegeben",
  description: "Die Leute am Brunnen snd dir sehr Dankbar.",
  buttons: [
    {
      label: "gern geschehen",
      getAction: () => {
        return {
          message: "Du hast für die Steine 5 {SYSTEM.Gold} bekommen",
          endQuest: "Q002FindStone",
          itemsDelta: { Stein: -3 },
          economyDelta: { gold: 5 },
          baseDelta: { reputation: 3 },
        };
      },
    },
  ],
  places: [],
};
