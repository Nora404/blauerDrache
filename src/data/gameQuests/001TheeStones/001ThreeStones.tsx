import { GameQuest } from "../../questData";

export const quest001ThreeStone: GameQuest = {

    id: "Q001ThreeStone",
    label: "Sammle 3 Steine",
    description: <span>Sammle 3 Steine für die Leute am Brunnen.</span>,
    triggerEvent: "E001ThreeStoneTrigger",
    conditions: {
        requiredDaytime: "Tag",
    },
    progress: [
        {
            type: "item",
            target: "/fountain-people",
            triggerEvent: "stoneCollected",
            isDone: false,
            haveItem: { item: "Stein", need: 3 },
        },
    ],
    rewards: {
        economy: { gold: 5 },
    },
    followQuestId: "",
    repeat: true,

};
