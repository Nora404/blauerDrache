import { GameEvent } from "../../../eventData";

//#region [events]
export const event020ChurchTalk4: GameEvent = {
    id: "event020ChurchTalk-4",
    label: "Ich möchte ein Geistlicher werden",
    description: descriptionText(),
    buttons: [
        {
            label: "Ich habe noch eine Frage",
            result: "",
            getAction: () => ({
                nextEvents: [{ "eventId": "event020ChurchTalk", "probability": 100 }]
            })
        }
    ],
    places: []
};
//#endregion


function descriptionText() {
    return (
        `Ungläubig starrt er dich an. {Talk|dunkleGestalt}„Wirklich?“{/Talk} murmelt er leise. Nachdenklich mustert er dich, dann fragt er: {Talk|dunkleGestalt}„Willst du dich diesem Haus anschließen – den Hütern des blauen Drachen?“{/Talk}`
    );
}

