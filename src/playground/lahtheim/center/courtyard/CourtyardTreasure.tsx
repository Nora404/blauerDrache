// #region [imports]
import React from 'react';
import { WeightedEvent } from '../../../../data/eventData';
import { observer } from 'mobx-react-lite';
import PlaceTemplate from '../../../../layout/PlaceTemplate';
// #endregion

// #region [prepare]
type CourtyardTreasureProps = {};

const CourtyardTreasure: React.FC<CourtyardTreasureProps> = observer(() => {

    const possibleEvents: WeightedEvent[] = [
        { eventId: "001StoneCoin", probability: 50 },
        { eventId: "004Flower", probability: 60 },
        { eventId: "007Bag", probability: 20 },
    ];

    const description =
        <>
            <p className='mb-1 text-left'>
                Endtäuschst stellst du fest das die Autorin der Texte hier noch keinen Inhalt hinzugefügt hat. Außer diese paar Wörter, aber das hilft dir auch nicht weiter.
            </p>
        </>;

    const noEventHappend =
        <>
            <p className='mb-1 text-left'>
                Links von dir ist Umgebung, rechts von dir ist Umgebung – alles sieht völlig normal und unauffällig aus. Es ist schon fast langweilig, wie ereignislos die letzten Schritte waren.
            </p>
        </>;
    // #endregion


    // #region [jsx]
    return (
        <div className='max-width'>
            <PlaceTemplate
                title={<>PLACES.vergessen</>}
                description={description}
                noEventHappend={noEventHappend}
                backPath="/courtyard"
                possibleEvents={possibleEvents}
            />
        </div>
    );
    // #endregion
});

export default CourtyardTreasure;