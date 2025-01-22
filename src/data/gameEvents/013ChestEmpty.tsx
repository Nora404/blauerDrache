import { GradientText } from "../../utility/Formatted/GradientText";
import PlayerTalk from "../../utility/PlayerTalk";
import { GameEvent } from "../eventData";

//#region [events]
export const event013ChestEmpty: GameEvent = {
    id: "013ChestEmpty",
    label: "Die Truhe war leer",
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
