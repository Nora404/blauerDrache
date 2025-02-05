import { GameEvent } from "../../../eventData";

//#region [events]
export const event020ChurchTalk2: GameEvent = {
    id: "event020ChurchTalk-2",
    label: "Welche Bedeutung hat das Kreuz?",
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
        `Die {NPC.dunkleGestalt} deutet dir, ihm zu folgen. Gemeinsam geht ihr zum vorderen Podest, auf dem das Kreuz ruht. Die bemalte Holzoberfläche ist rissig, doch kein Staub bedeckt sie. Erst jetzt erkennst du es: Im blauen Stein schimmert die Silhouette eines Drachen. {Talk|player}„Der blaue Drache…!“ {/Talk} flüsterst du ehrfürchtig.

Dein Blick wandert entlang der kunstvollen Verzierungen bis hin zu den vier Armen des Kreuzes. Schwach kannst du erkennen, dass sich die Farben wie Ranken zur Mitte hin schlängeln - einige verschmelzen miteinander, andere verblassen, während wieder andere kräftiger hervortreten. Die dunkle Gestalt folgt deinem Blick. {Talk|dunkleGestalt}„Das sind die Ersten“{/Talk}, sagt er leise. {Talk|dunkleGestalt}„Einst gab es nur Alles und Nichts. Dann entstanden die Ersten. In einem ewigen Kampf vereinten sie sich, löschten sich gegenseitig aus oder wurden stärker. Aus ihnen entsprang der blaue Drache.“{/Talk}

{Talk|player}„Dann… ist der blaue Drache einer der Ersten? Was ist mit den anderen? Gibt es sie noch?“{/Talk} fragst du.
Nachdenklich blickt er ins Leere. {Talk|dunkleGestalt}„Der Kampf hat nie wirklich geendet. Der blaue Drache beschützt uns noch immer.“{/Talk} Einen Moment lang herrscht Stille. {Talk|dunkleGestalt}„Hast du noch Fragen, mein Kind?“{/Talk}`
    );
}

