import { GameQuest } from "../../questData";

export const quest001ThreeStone: GameQuest = {

    id: "Q001ThreeStone",
    label: "Sammle 3 Steine",
    description: <span>Sammle 3 Steine für die Leute am Brunnen.</span>,
    path: "/fountain-people",
    eventByEnd: "E001ThreeStoneEnd",
    progress:
    {
        type: "Besorgen",
        path: "/fountain-people",
        eventByEnd: "stoneCollected",
        isDone: false,
        task: { haveItem: [{ item: "Stein", need: 3, count: 0 }] },
    },

    rewards: {
        economy: { gold: 5 },
    },
    repeat: true,
};
