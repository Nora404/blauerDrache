import { GameEvent } from "../eventData";

//#region [events]
export const event001Stone: GameEvent = {
    id: "000",
    label: "name",
    description: descriptionText(),
    buttons: [
        {
            label: "some 1",
            getAction: () => ({
                itemsDelta: { Stein: 1 },
                economyDelta: { gold: 1 },
                statsDelta: { life: 1 },
                fluxDelta: { buff: { "Eisenhaut": 3 } },
                message: message1,
            }),
        },
        {
            label: "some 2",
            getAction: () => ({
                message: message2,
                nextEvents: [
                    { eventId: "001", probability: 10 },   // 10% Chance
                    { eventId: "002", probability: 50 },   // 50% Chance
                    { eventId: "003", probability: 90 },   // 90% Chance
                ],
            }),
        },
    ],
    places: [
        {
            place: "Wald",
            probability: 50,
        },
        {
            place: "Weg",
            probability: 70,
        },
    ],
};
//#endregion

// Ja das ist gewollt, ich will alle Texte hier unten haben
function descriptionText() {
    return (
            "Beschreibung"
    );
}

const message1 = (
        "Button 1 gedrückt"
);

const message2 = (
        "Button 2 gedrückt"
);