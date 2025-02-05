import { GameEvent } from "../../../eventData";

//#region [events]
export const event020ChurchTalk1: GameEvent = {
    id: "event020ChurchTalk-1",
    label: "Warum ist die Kirche verlassen?",
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
        `{Talk|dunkleGestalt}„Der Glaube verblasst - genau wie die Erinnerung an den blauen Drachen“{/Talk}, murmelt die {NPC.dunkleGestalt} traurig. {Talk|dunkleGestalt}„Die Menschen haben vergessen, was sie ihm verdanken. Heute kümmern sie sich nur noch um ihre eigenen Belange.“{/Talk} Zum ersten Mal hörst du Bitterkeit in seiner Stimme. {Talk|dunkleGestalt}„Die Stadt hat kein Interesse mehr an unserem Glauben. Dieses Haus überlebt nur noch durch die Spenden der wenigen Besucher – nicht mehr durch die Bürger oder die Stadt selbst.“{/Talk} Langsam dreht er sich um und blickt hinauf zum großen Kreuz, in dessen Mitte der blaue Stein ruht. {Talk|dunkleGestalt}„Ich bin der Letzte. Wenn ich gehe, wird das Wissen der Ersten nur noch in Büchern existieren. Es wird zu Märchen… zu Mythen verkommen.“{/Talk}`
    );
}

