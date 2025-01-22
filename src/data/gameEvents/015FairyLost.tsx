import { GradientText } from "../../utility/Formatted/GradientText";
import PlayerTalk from "../../utility/PlayerTalk";
import { GameEvent } from "../eventData";

//#region [events]
export const event015FairyLost: GameEvent = {
    id: "015FairyLost",
    label: "Du hast die Fee verloren",
    description: descriptionText(),
    buttons: [
        {
            label: "Mist!",
            getAction: () => ({
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
