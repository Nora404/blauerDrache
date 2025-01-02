import { GradientText } from "../../utility/GradientText";
import NpcTalk from "../../utility/NpcTalk";
import PlayerTalk from "../../utility/PlayerTalk";
import { GameEvent } from "../eventData";

//#region [events]
export const event009BagEmpty: GameEvent = {
    id: "009BagEmpty",
    label: "Der Beutel ist leer",
    description: descriptionText(),
    buttons: [
        {
            label: "Den leeren Beutel weg werfen",
            getAction: () => ({
                message: message1,
            }),
        },
        {
            label: "Den leeren Beutel einstecken",
            getAction: () => ({
                itemsDelta: { Lederstück: 1 },
                message: message2,
            }),
        },
    ],
    places: [],
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