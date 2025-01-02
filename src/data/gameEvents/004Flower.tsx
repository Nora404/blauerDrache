import { GradientText } from "../../utility/GradientText";
import NpcTalk from "../../utility/NpcTalk";
import PlayerTalk from "../../utility/PlayerTalk";
import { GameEvent } from "../eventData";

//#region [events]
export const event004Flower: GameEvent = {
    id: "004Flower",
    label: "Dort ist eine schöne Blume",
    description: descriptionText(),
    buttons: [
        {
            label: "some 1",
            getAction: () => ({
                itemsDelta: { Stein: 1 },
                economyDelta: { gold: 1 },
                statsDelta: { life: 1 },
                message: message1,
            }),
        },
        {
            label: "some 2",
            getAction: () => ({
                message: message2,
                nextEvents: [
                    { eventId: "001", probability: 10 },
                    { eventId: "002", probability: 50 },
                    { eventId: "003", probability: 90 },
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