import { GameEvent } from "../../eventData";

//#region [events]
export const event002Mashroom: GameEvent = {
    id: "002Mashroom",
    label: "Da wächst ein Pilz",
    description: descriptionText(),
    buttons: [
        {
            label: "Pilz pflücken",
            getAction: () => ({
                itemsDelta: { Pilz: 1 },
                message: message1,
            }),
        },
        {
            label: "Lieber nicht anfassen",
            getAction: () => ({
                message: message2,
            }),
        },
    ],
    places: [
        {
            place: "Waldrand",
            probability: 50,
        },
        {
            place: "Wald",
            probability: 70,
        },
    ],
};
//#endregion

// Ja das ist gewollt, ich will alle Texte hier unten haben
function descriptionText(): string {
    return (
        "Am Boden, zwischen Steinen und Moos, wächst ein kleiner {GradientText}Pilz{/GradientText}. " +
        "Auf seinem kurzen, breiten Stiel sitzt eine fleischige, braune Kappe mit leichten, helleren Sprenkeln. " +
        "Dieser {GradientText}Pilz{/GradientText} sieht zwar lecker aus, aber du kannst nicht erkennen, um welche Art von Pilz es sich handelt."
    );
}

const message1 = "Du beschließt, den {GradientText}Pilz{/GradientText} für ungefährlich zu halten. " +
    "Mit einer gekonnten Handbewegung löst du den {GradientText}Pilz{/GradientText} vom Boden " +
    "und steckst ihn in deinen Beutel. Was könnte man daraus machen? Tränke oder doch ein leckeres Mittagessen?";

const message2 = "Du lässt den Pilz sicherheitshalber in Ruhe.";