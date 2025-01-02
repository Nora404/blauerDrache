import { GameEvent } from "../eventData";

export const event001Stone: GameEvent = {
    id: "001Stone",
    label: "Stein",
    description: <>Ein Stein liegt auf dem Boden!</>,
    buttons: [
        {
            label: "Stein aufheben",
            getAction: () => ({
                economyDelta: { gold: 2 },
                itemsDelta: { Stein: 1 },
                message: <>Du hast unter dem Stein etwas Gold gefunden.</>,
            }),
        },
        {
            label: "Stein liegen lassen",
            getAction: () => ({
                message: <>Du ignorierst den Stein.</>,
            }),
        },
    ],
    places: [
        {
            place: "Wald",
            probability: 50,
        },
        {
            place: "Nordtor",
            probability: 70,
        },
    ],
};