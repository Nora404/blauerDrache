import { GameEvent } from "../../eventData";

export const event001ThreeStoneEnd: GameEvent = {
  id: "E001ThreeStoneEnd",
  label: "Drei Steine abgegeben",
  description: "Die Leute am Brunnen snd dir sehr Dankbar.",
  buttons: [
    {
      label: "gern geschehen",
      getAction: () => {
        return {
          message: "Du hast für die Steine 5 {SYSTEM.Gold} bekommen",
          endQuest: "Q001ThreeStone",
          itemsDelta: { Stein: -3 },
          economyDelta: { gold: 5 },
          baseDelta: { reputation: 3 },
        };
      },
    },
  ],
  places: [],
};
