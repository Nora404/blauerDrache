import { GameEvent } from "../../eventData";

//#region [events]
export const event003Stick: GameEvent = {
    id: "003Stick",
    label: "Du stolperst über ein Stöckchen",
    description: descriptionText(),
    buttons: [
        {
            label: "Stock aufheben",
            getAction: () => ({
                itemsDelta: { Stock: 1 },
                message: message1,
            }),
        },
        {
            label: "Stock liegen lassen",
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
            probability: 50,
        },
        {
            place: "Wald",
            probability: 80,
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