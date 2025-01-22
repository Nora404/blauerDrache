import { GradientText } from "../../utility/Formatted/GradientText";
import NpcTalk from "../../utility/NpcTalk";
import PlayerTalk from "../../utility/PlayerTalk";
import { GameEvent } from "../eventData";

//#region [events]
export const event012ChestGold: GameEvent = {
    id: "event012ChestGold",
    label: "In der Truhe lag Gold",
    description: descriptionText(),
    buttons: [
        {
            label: "Gold nehmen",
            getAction: () => ({
                economyDelta: { gold: 50 },
                tempStatsDelta: { luck: 5 },
                message: message1,
            }),
        },
        {
            label: "Truhe schließen",
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