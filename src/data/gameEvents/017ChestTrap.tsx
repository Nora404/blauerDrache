import { GradientText } from "../../utility/Formatted/GradientText";
import PlayerTalk from "../../utility/PlayerTalk";
import { GameEvent } from "../eventData";

//#region [events]
export const event017ChestTrap: GameEvent = {
    id: "017ChestTrap",
    label: "Eine Falle!",
    description: descriptionText(),
    buttons: [
        {
            label: "Mist!",
            getAction: () => ({
                itemsDelta: { Stein: 1 },
                economyDelta: { gold: 1 },
                tempStatsDelta: { life: -10 },
                message: message1,
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