import { PLACES, SYSTEM } from "../../helper/colorfullStrings";
import { GameQuest } from "../../questData";

export const quest001ThreeStone: GameQuest = {
  id: "Q001ThreeStone",
  label: "Sammle 3 Steine",
  description:
    "Die Leute am {PLACES.Brunnen} brauchen Hilfe Steine zu besorgen.",
  reward:
    "Du wirst etwas {SYSTEM.Gold} bekommen und dein {SYSTEM.Ruf} verbessern.",
  path: "/fountain-people",
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
