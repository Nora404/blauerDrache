import { GameEvent } from "../../eventData";

export const event000Nothing: GameEvent = {
    id: "000Nothing",
    label: "",
    description: descriptionText(),
    buttons: [],
    places: []
};

function descriptionText() {
    return `Hier passiert absolut nichts Interessantes. Kein seltsames Geräusch lässt dich aufhorchen, kein Gegenstand weckt dein Interesse. Nichts lenkt dich von deinen Gedanken oder Taten ab.`;
}
