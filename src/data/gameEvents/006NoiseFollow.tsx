import { GradientText } from "../../utility/GradientText";
import NpcTalk from "../../utility/NpcTalk";
import { SYSTEM } from "../colorfullStrings";
import { GameEvent } from "../eventData";

//#region [events]
export const event006NoiseFollow: GameEvent = {
    id: "006NoiseFollow",
    label: "Dem Geräusch nachgehen",
    description: descriptionText(),
    buttons: [
        {
            label: "Weiter suchen",
            getAction: () => ({
                statsDelta: { rounds: -1 },
                message: message1,
            }),
        },
        {
            label: "Aufgeben",
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
        Vergeblich hast du nach der Quelle des Geräusches gesucht und nichts gefunden.
        Dabei ist so viel Zeit vergangen, dass du 1 {SYSTEM.Runden} verloren hast.
    </>
);

const message2 = (
    <>
        <NpcTalk>Button 2 gedrückt</NpcTalk>
    </>
);