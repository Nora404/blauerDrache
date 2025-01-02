import { GradientText } from "../../utility/GradientText";
import { SYSTEM } from "../colorfullStrings";
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
            probability: 50,
        },
        {
            place: "Nordtor",
            probability: 70,
        },
    ],
};
//#endregion

function descriptionText(): JSX.Element {
    return (
        <>
            Ein <GradientText>Stein</GradientText> liegt auf dem Boden!
            Er ist klein und hart, hat eine gräuliche Farbe und - sieht aus wie jeder andere Stein auch.
            Warum bist du stehen geblieben um diesen <GradientText>Stein</GradientText> zu betrachten?
        </>
    );
}

const message1 = (
    <>
        Unglaublich! Du hast unter dem <GradientText>Stein</GradientText> etwas {SYSTEM.Gold} gefunden.
        Du steckst den <GradientText>Stein</GradientText> und das Goldstück in deinen Beutel ein.
        Steine kann man bestimmt irgendwann mal brauchen.
    </>
);

const message2 = (
    <>
        Du ignorierst den <GradientText>Stein</GradientText> und gehst weiter.
    </>
);