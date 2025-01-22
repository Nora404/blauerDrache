import { GradientText } from "../../utility/Formatted/GradientText";
import NpcTalk from "../../utility/NpcTalk";
import PlayerTalk from "../../utility/PlayerTalk";
import { GameEvent } from "../eventData";

//#region [events]
export const event011ChestJunk: GameEvent = {
    id: "011ChestJunk",
    label: "Plunder in Truhe gefunden",
    description: descriptionText(),
    buttons: [
        {
            label: "Plunder nehmen",
            getAction: () => ({
                itemsDelta: { Plunder: 3 },
                message: message1,
            }),
        },
        {
            label: "Truhe wieder schließen",
            getAction: () => ({
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