import { GradientText } from "../../utility/GradientText";
import NpcTalk from "../../utility/NpcTalk";
import PlayerTalk from "../../utility/PlayerTalk";
import { GameEvent } from "../eventData";

//#region [events]
export const event007Bag: GameEvent = {
    id: "007Bag",
    label: "Du findest einen Beutel",
    description: descriptionText(),
    buttons: [
        {
            label: "Beutel aufheben und öffnen",
            getAction: () => ({
                message: message1,
                nextEvents: [
                    { eventId: "008BagFull", probability: 10 },
                    { eventId: "009BagEmpty", probability: 50 },
                ],
            }),
        },
        {
            label: "Liegen lassen",
            getAction: () => ({
                message: message2,
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

function descriptionText(): JSX.Element {
    return (
        <>
            <GradientText>Beschreibung</GradientText>
        </>
    );
}

const message1 = (
    <>
        <PlayerTalk>Button 1 gedrückt</PlayerTalk>
    </>
);

const message2 = (
    <>
        <NpcTalk>Button 2 gedrückt</NpcTalk>
    </>
);