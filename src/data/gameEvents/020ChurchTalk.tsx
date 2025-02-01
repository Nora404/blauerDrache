import { GameEvent } from "../eventData";

//#region [events]
export const event020ChurchTalk: GameEvent = {
    id: "event020ChurchTalk",
    label: "",
    description: "",
    buttons: [
        {
            label: "Fragen warum die Kirche verlassen ist",
            result: "",
            getAction: () => ({
                nextEvents: [{ "eventId": "event020ChurchTalk-1", "probability": 100 }]
            })
        },
        {
            label: "Nach der Bedeutung des Kreuzes fragen",
            result: "",
            getAction: () => ({
                nextEvents: [{ "eventId": "event020ChurchTalk-2", "probability": 100 }]
            })
        },
        {
            label: "Fragen was es mit dem blauen Drachen auf sich hat",
            result: "",
            getAction: () => ({
                nextEvents: [{ "eventId": "event020ChurchTalk-3", "probability": 100 }]
            })
        },
        {
            label: "Erwähnen das du als Geistlicher nach Lahtheim gekommen bist",
            result: "",
            conditions: {
                operator: "=",
                playerMeta: {
                    calling: "Geistlicher"
                }
            },
            getAction: () => ({
                nextEvents: [{ "eventId": "event020ChurchTalk-4", "probability": 100 }]
            })
        }
    ],
    places: []
};
//#endregion
