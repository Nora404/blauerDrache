import { GameEvent } from "../eventData";

//#region [events]
export const event020ChurchTalk3: GameEvent = {
    id: "event020ChurchTalk-3",
    label: "Was hat es mit dem blauen Drachen auf sich?",
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
        `Die {NPC.dunkleGestalt} scheint sich über deine Frage zu freuen. {Talk|dunkleGestalt}„Ihm verdanken wir alles, was du siehst. Einst war dieses Land eine tote Ödnis, lebensfeindlich und karg. Doch der blaue Drache nahm eine seiner Schuppen und legte sie in die Erde. Daraus entsprang Wasser - und mit ihm erwachte das Land zu neuem Leben.“{/Talk}

Er lächelt, seine Stimme wird mit jedem Satz lebhafter. Mit leuchtenden Augen beschreibt er, wie der blaue Drache das Land beschützte und es immer wieder von der drohenden Dunkelheit befreite. Je länger du zuhörst, desto fantastischer klingen seine Erzählungen. Du fragst dich, wie viel davon tatsächlich überliefert wurde und wie viel er hinzufügt, um die Geschichte auszuschmücken. Nachdem er geendet hat, sieht er dich erwartungsvoll an. 
{Talk|dunkleGestalt}„Möchtest du noch etwas wissen?“{/Talk}`
    );
}

