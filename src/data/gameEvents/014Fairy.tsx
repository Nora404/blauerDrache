import { GradientText } from "../../utility/Formatted/GradientText";
import NpcTalk from "../../utility/NpcTalk";
import PlayerTalk from "../../utility/PlayerTalk";
import { GameEvent } from "../eventData";

//#region [events]
export const event014Fairy: GameEvent = {
    id: "014Fairy",
    label: "Eine Fee ist aufgetaucht",
    description: descriptionText(),
    buttons: [
        {
            label: "Fee verfolgen",
            getAction: () => ({
                message: message1,
                nextEvents: [
                    { eventId: "015FairyLost", probability: 80 },
                    { eventId: "016FairyWish", probability: 20 },
                ],
            }),
        },
        {
            label: "Fee anstarren",
            getAction: () => ({
                message: message2,
            }),
        },
    ],
    places: [
        {
            place: "Wald",
            probability: 30,
        },
        {
            place: "Waldrand",
            probability: 10,
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