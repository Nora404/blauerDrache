import { GameEvent } from "../eventData";

//#region [events]
export const event999Test: GameEvent = {
    id: "event999Test",
    label: "Das Label",
    description: descriptionText(),
    buttons: [
        {
            label: "Button Label (mindestens Level 10)",
            conditions: {
                playerBase: {
                    level: 7
                },
                operator: ">"
            },
            getAction: () => ({
                economyDelta: { "gold": 1 },
                message: message0
            })
        }
    ],
    places: []
};
//#endregion


function descriptionText() {
    return (
        `Die Beschreibung {SYSTEM.Erfahrung} mit verschiedenen {CREATURE.geflügelteWesen} in verschiedenen {PLACES.Ostmauer} Und auch Komponenten wie {GradientText|greenColors}DeinText{/GradientText} oder {MultiColoredLetters|greenColors}DeinText{/MultiColoredLetters}`
    );
}

const message0 = (
    `Button Beschreibung und ein {SYSTEM.Gold}`
);
