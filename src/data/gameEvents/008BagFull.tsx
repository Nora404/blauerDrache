import { GradientText } from "../../utility/Formatted/GradientText";
import NpcTalk from "../../utility/NpcTalk";
import { SYSTEM } from "../helper/colorfullStrings";
import { GameEvent } from "../eventData";
import { getRandomItem, ItemName } from "../ItemData";

const possibleItems: ItemName[] = ['Plunder', 'Kupfererz', 'Leere Flasche', 'Wasserflasche', 'Lederstück'];
const randomItem: ItemName = getRandomItem(possibleItems);

//#region [events]
export const event008BagFull: GameEvent = {
    id: "008BagFull",
    label: "Beutel mit wertvollem Inhalt",
    description: descriptionText(),
    buttons: [
        {
            label: "Inhalt einstecken",
            getAction: () => ({
                itemsDelta: { [randomItem]: 1 },
                economyDelta: { gold: 5 },
                message: message1,
            }),
        },
        {
            label: "some 2",
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
        Du hast aus dem beutel 5 {SYSTEM.Gold} und <GradientText>{randomItem}</GradientText> erhalten.
        Breit grinsend steckst du dir beides in deine Taschen.
    </>
);

const message2 = (
    <>
        <NpcTalk>Button 2 gedrückt</NpcTalk>
    </>
);


