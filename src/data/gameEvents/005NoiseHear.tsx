import { GradientText } from "../../utility/GradientText";
import NpcTalk from "../../utility/NpcTalk";
import PlayerTalk from "../../utility/PlayerTalk";
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