// #region [imports]
import React from 'react';
import PlaceTemplate from '../../../../layout/PlaceTemplate';
import { WeightedEvent } from '../../../../data/eventData';
// #endregion

// #region [prepare]
type ChurchPeaceProps = {
};

const ChurchPeace: React.FC<ChurchPeaceProps> = () => {
    const possibleEvents: WeightedEvent[] = [
        { eventId: "event019ChurchPeace", probability: 100 },
    ];

    const description = (
        <p className="mb-1 text-left">
            Du lässt dich langsam auf eine der abgenutzten Holzbänke sinken – der knarrende Klang unter deinem Gewicht wirkt viel lauter, störender als es sein sollte. Für einen Moment schließt du die Augen, lässt die raue Oberfläche und die Kühle des alten Holzes auf dich wirken, während du tief durchatmest. Die spärlichen Lichtstrahlen, die durch die hohen Fenster dringen, tanzen sanft auf deinen geschlossenen Lidern und scheinen den Schatten deiner Gedanken zu zerstreuen.
        </p>
    );
    // #endregion

    // #region [jsx]
    return (
        <div className="max-width">
            <PlaceTemplate
                title={<>Inneren Frieden finden</>}
                description={description}
                backPath="/church"
                possibleEvents={possibleEvents}
                chanceOfAnyEvent={1}
            />
        </div>
    );
    // #endregion
};

export default ChurchPeace;