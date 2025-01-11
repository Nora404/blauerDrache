import { GameQuest } from "../../questData";

export const quest001ThreeStone: GameQuest = {

    id: "Q001ThreeStone",
    label: "Sammle 3 Steine",
    description: <span>Die Leute am Brunnen brauchen Steine.</span>,
    path: "/fountain-people",
    eventByEnd: "E001ThreeStoneEnd",
    progress:
    {
        type: "Besorgen",
        path: "/fountain-people",
        eventByEnd: "E001ThreeStoneEnd",
        isDone: false,
        task: { haveItem: [{ item: "Stein", need: 3, count: 0 }] },
    },

    rewards: {
        economy: { gold: 5 },
        base: { reputation: 3 },
    },
    repeat: true,
};
