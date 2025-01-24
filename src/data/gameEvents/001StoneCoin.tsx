import { GameEvent } from "../eventData";

//#region [events]
export const event001StoneCoin: GameEvent = {
    id: "001StoneCoin",
    label: "Ein Stein liegt am Boden",
    description: descriptionText(),
    buttons: [
        {
            label: "Stein aufheben",
            getAction: () => ({
                economyDelta: { gold: 1 },
                itemsDelta: { Stein: 1 },
                message: message1,
            }),
        },
        {
            label: "Stein liegen lassen",
            getAction: () => ({
                message: message2,
            }),
        },
    ],
    places: [
        {
            place: "Wald",
            probability: 20,
        },
        {
            place: "Weg",
            probability: 70,
        },
        {
            place: "Nordtor",
            probability: 70,
        },
    ],
};
//#endregion

function descriptionText() {
    return (

        "Ein {Talk|grau}Stein{/Talk} liegt auf dem Boden!" +
        "Er ist klein und hart, hat eine gräuliche Farbe und - sieht aus wie jeder andere Stein auch." +
        "Warum bist du stehen geblieben um diesen {Talk|grau}Stein{/Talk} zu betrachten?"

    );
}

const message1 =
    "Unglaublich! Du hast unter dem {Talk|grau}Stein{/Talk} etwas " +
    "{SYSTEM.Gold} gefunden. Du steckst den {Talk|grau}Stein{/Talk} und das Goldstück in deinen Beutel ein. " +
    "Steine kann man bestimmt irgendwann mal brauchen.";

const message2 = "Du ignorierst den {Talk|grau}Stein{/Talk} und gehst weiter.";