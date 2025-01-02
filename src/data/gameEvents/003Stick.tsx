import { GradientText } from "../../utility/GradientText";
import NpcTalk from "../../utility/NpcTalk";
import PlayerTalk from "../../utility/PlayerTalk";
import { GameEvent } from "../eventData";

//#region [events]
export const event003Stick: GameEvent = {
    id: "003Stick",
    label: "Du stolperst über ein Stöckchen",
    description: descriptionText(),
    buttons: [
        {
            label: "Stock aufheben",
            getAction: () => ({
                itemsDelta: { Stock: 1 },
                message: message1,
            }),
        },
        {
            label: "Stock liegen lassen",
            getAction: () => ({
                message: message2,
            }),
        },
    ],
    places: [
        {
            place: "Weg",
            probability: 20,
        },
        {
            place: "Waldrand",
            probability: 50,
        },
        {
            place: "Wald",
            probability: 80,
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