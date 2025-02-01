import { GameEvent } from "../eventData";

//#region [events]
export const event019ChurchPeace: GameEvent = {
    id: "event019ChurchPeace",
    label: "",
    description: descriptionText(),
    buttons: [
        {
            label: "Ausruhen",
            result: "(Stimmung wird Normal und -1 {SYSTEM.Aktionen})",
            conditions: {
                operator: ">"
            },
            getAction: () => ({
                fluxDelta: { "feeling": "Normal" },
                stateDelta: { "actionPoints": -1 },
                message: message0
            })
        }
    ],
    places: []
};
//#endregion


function descriptionText() {
    return (
        `In dieser Stille findest du allmählich einen Anker, der deinen rastlosen Geist beruhigt. Jeder Atemzug füllt dich mit einer Mischung aus dem Geruch von altem Holz und der feinen Präsenz vergangener Gebete. Du spürst, wie sich die Schwere in deinen Schultern langsam löst und eine innere Leere Platz macht, die zugleich erholsam und befreiend wirkt.`
    );
}

const message0 = (
    `Dein Blick schweift über die Bank, deren Maserung Geschichten von längst vergangenen Momenten erzählt – und in diesem Augenblick scheinen auch deine eigenen Erlebnisse eine neue Bedeutung zu erhalten. Mit jedem Herzschlag wächst das Gefühl, dass du hier in der ruhigen Einsamkeit einen sicheren Hafen gefunden hast, in dem du deinen Geist ordnen und die trüben Wolken des Alltags vertreiben kannst.

Du bleibst sitzen, lauscht dem leisen Echo der Zeit und spürst, wie die Anspannung allmählich abnimmt. Der Augenblick wird zu einer stillen Meditation, in der du dich selbst wiederfindest. `
);
