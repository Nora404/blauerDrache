import { GameEvent } from "../../eventData";

//#region [events]
export const event004Flower: GameEvent = {
    id: "004Flower",
    label: "Dort ist eine schöne Blume",
    description: descriptionText(),
    buttons: [
        {
            label: "Blume pflücken",
            getAction: () => ({
                itemsDelta: { Blume: 1 },
                message: message1,
            }),
        },
        {
            label: "Anschauen und stehen lassen",
            getAction: () => ({
                message: message2,
            }),
        },
    ],
    places: [
        {
            place: "Weg",
            probability: 50,
        },
        {
            place: "Waldrand",
            probability: 30,
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