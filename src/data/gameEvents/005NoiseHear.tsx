import { GameEvent } from "../eventData";

//#region [events]
export const event005NoiseHear: GameEvent = {
    id: "005NoiseHear",
    label: "Du hörst ein Geräusch",
    description: descriptionText(),
    buttons: [
        {
            label: "Dem Geräusch nach gehen",
            getAction: () => ({
                message: message1,
                nextEvents: [
                    { eventId: "006NoiseFollow", probability: 100 },
                ]
            }),
        },
        {
            label: "Das Geräusch ignorieren",
            getAction: () => ({
                message: message2,
            }),
        },
    ],
    places: [
        {
            place: "Waldrand",
            probability: 30,
        },
        {
            place: "Wald",
            probability: 50,
        },
    ],
};
//#endregion

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