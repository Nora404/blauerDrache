import { GameEvent } from "../../eventData";

export const event001ThreeStoneTrigger: GameEvent = {
  id: "E001ThreeStoneTrigger",
  label: "Drei Steine gesucht",
  description: "Die Leute am Brunnen suchen Hilfe beim Steine-Sammeln.",
  buttons: [
    {
      label: "Annehmen",
      getAction: () => {
        return {
          message: "Du hast die Quest angenommen!",
          triggerQuest: "Q001ThreeStone", // <-- ruft updateQuest("Q001ThreeStone") auf
        };
      },
    },
    {
      label: "Ablehnen",
      getAction: () => {
        return {
          message: "Du lehntest ab...",
          // kein triggerQuest => Keine Quest
        };
      },
    },
  ],
  places: [],
};
