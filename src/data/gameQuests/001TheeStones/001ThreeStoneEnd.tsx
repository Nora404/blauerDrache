import { GameEvent } from "../../eventData";

export const event001ThreeStoneEnd: GameEvent = {
    id: "E001ThreeStoneEnd",
    label: "Drei Steine abgegeben",
    description: <span>Die Leute am Brunnen snd dir sehr Dankbar.</span>,
    buttons: [
        {
            label: "gern geschehen",
            getAction: () => {
                return {
                    message: <span>Du hast für die Steine 5 Gold bekommen</span>,
                    economyDelta: { gold: 5 },
                    base: { reputation: 3 },
                };
            },
        },
    ],
    places: [],
};
