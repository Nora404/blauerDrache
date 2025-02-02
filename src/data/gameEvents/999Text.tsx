import { GameEvent } from "../eventData";

export const event999test: GameEvent = {
    id: "999test",
    label: "Teste Bedingungen",
    description: descriptionText(),
    buttons: [
        {
            label: "Ich darf nur erscheinen bei Tage",
            conditions: {
                operator: ">",
                gameTime: {
                    gameDay: "Tag"
                }
            },
            getAction: () => ({
                message: message0
            })
        },
        {
            label: "Ich darf nur erscheinen bei Nacht",
            conditions: {
                operator: "=",
                gameTime: {
                    mode: "inside",
                    gameDay: "Nacht"
                }
            },
            getAction: () => ({
                message: message1
            })
        },
        {
            label: "Ich darf nur zwischen 15:00 und 16:00 erscheinen",
            conditions: {
                operator: "=",
                gameTime: {
                    fromTime: "15:00",
                    toTime: "16:00",
                    mode: "inside"
                }
            },
            getAction: () => ({
                message: message2
            })
        },
        {
            label: "Ich darf nur außerhalb von 15:00 und 16:00 erscheinen",
            conditions: {
                operator: "=",
                gameTime: {
                    fromTime: "15:00",
                    toTime: "16:00",
                    mode: "outside"
                }
            },
            getAction: () => ({
                message: message3
            })
        }
    ],
    places: []
};

function descriptionText() {
    return ``;
}

const message0 = `Test Bestanden`;

const message1 = `Test Bestanden`;

const message2 = `Test Bestanden`;

const message3 = `Test Bestanden`;
