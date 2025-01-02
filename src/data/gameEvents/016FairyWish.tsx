import { GradientText } from "../../utility/GradientText";
import NpcTalk from "../../utility/NpcTalk";
import PlayerTalk from "../../utility/PlayerTalk";
import { GameEvent } from "../eventData";

//#region [events]
export const event016FairyWish: GameEvent = {
    id: "016FairyWish",
    label: "Fee gewährt einen Wunsch",
    description: descriptionText(),
    buttons: [
        {
            label: "Für heute großes Glück",
            getAction: () => ({
                tempStatsDelta: { luck: 10 },
                message: message1,
            }),
        },
        {
            label: "Für heute viel mehr Angriff",
            getAction: () => ({
                tempStatsDelta: { attack: 10 },
                message: message2,
            }),
        },
        {
            label: "Für heute viel größere Verteidigung",
            getAction: () => ({
                tempStatsDelta: { defense: 10 },
                message: message3,
            }),
        },
        {
            label: "Dauerhaft wenig mehr Glück",
            getAction: () => ({
                statsDelta: { luck: 1 },
                message: message4,
            }),
        },
        {
            label: "Dauerhaft wenig mehr Angriff",
            getAction: () => ({
                statsDelta: { attack: 1 },
                message: message5,
            }),
        },
        {
            label: "Dauerhaft wenig mehr Verteidigung",
            getAction: () => ({
                statsDelta: { defense: 1 },
                message: message6,
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

const message3 = (
    <>
        <NpcTalk>Button 3 gedrückt</NpcTalk>
    </>
);

const message4 = (
    <>
        <NpcTalk>Button 4 gedrückt</NpcTalk>
    </>
);

const message5 = (
    <>
        <NpcTalk>Button 5 gedrückt</NpcTalk>
    </>
);

const message6 = (
    <>
        <NpcTalk>Button 6 gedrückt</NpcTalk>
    </>
);