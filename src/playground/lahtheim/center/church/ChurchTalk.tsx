//#region [imports]
import React from 'react';
import { WeightedEvent } from '../../../../data/eventData';
import { NPC } from '../../../../data/helper/colorfullStrings';
import Talk from '../../../../utility/Formatted/Talk';
import PlaceTemplate from '../../../../layout/PlaceTemplate';
//#endregion

//#region [prepare]
type ChurchTalkProps = {
};
//#endregion

//#region [prepare]
const ChurchTalk: React.FC<ChurchTalkProps> = () => {
    const possibleEvents: WeightedEvent[] = [
        { eventId: "event020ChurchTalk", probability: 100 },
    ];

    const description = (
        <p className="mb-1 text-left">
            Kurz scheint die {NPC.dunkleGestalt} verwirrt, dann lächelt er dich an. <Talk color="dunkleGestalt">„Du möchtest mehr erfahren? Ich will dir all deine Fragen beantworten, soweit ich die Antwort kenne. Es gibt viele Mysterien in dieser Welt.“</Talk>           Gedankenverloren blickte die {NPC.dunkleGestalt} in die Leere. Er wirkte, als ob angenehme Erinnerungen sein Gemüt erhellten. Dann wurde sein Blick betrübt und er senkte ihn. <Talk color="dunkleGestalt">„Früher waren wir viele“</Talk>, begann er. <Talk color="dunkleGestalt">„Dieses Haus war hell erleuchtet und voller Stimmen, die Rat und Wissen suchten…“</Talk><br />
            Du hörst der dunklen Gestalt, dem letzten verbliebenen Geistlichen, zu. Er scheint sich eine große Last von der Seele reden zu wollen. Du erkennst seine Einsamkeit und die Sehnsucht nach alten Zeiten, in denen der Glaube an den blauen Drachen noch stärker, noch präsenter war. Im Hintergrund siehst du das Kreuz – vier gleichlange Arme, die einst in verschiedenen Farben leuchteten, jetzt aber nur noch blass erkennbar sind.
            In der Mitte liegt ein großer, blauer Stein, verziert mit filigranen Holzschnitzereien, die Blumen und Fische darstellen.<br />
            <Talk color="dunkleGestalt">„… Der blaue Drache wird eines Tages zurückkommen. Ich sorge mich, dass wir nicht bereit sein werden, ihn zu unterstützen.“</Talk> Er zögerte einen Moment, dann sah er dich leicht erschrocken an.
            <Talk color="dunkleGestalt">„Entschuldige, ich bin ein alter Mann. Du wolltest etwas von mir?“</Talk>
        </p>
    );
    // #endregion

    // #region [jsx]
    return (
        <div className="max-width">
            <PlaceTemplate
                title={<>Mit der {NPC.dunkleGestalt} spechen</>}
                description={description}
                backPath="/church"
                possibleEvents={possibleEvents}
                chanceOfAnyEvent={1}
            />
        </div>
    );
    //#endregion
};

export default ChurchTalk;