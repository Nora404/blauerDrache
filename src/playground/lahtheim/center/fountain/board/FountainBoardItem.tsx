// #region [imports]
import React from 'react';
import { observer } from 'mobx-react-lite';
import { WeightedEvent } from '../../../../../data/eventData';
import PlaceTemplate from '../../../../../layout/PlaceTemplate';
// #endregion

// #region [prepare]
type FountainBoardItemProps = {};

const FountainBoardItem: React.FC<FountainBoardItemProps> = observer(() => {

    const possibleEvents: WeightedEvent[] = [
        { eventId: "E003FindStoneTrigger", probability: 100, questId: "Q003FindStone" },
    ];

    const description =
        <>
            <p className='mb-1 text-left'>
                Endtäuschst stellst du fest das die Autorin der Texte hier noch keinen Inhalt hinzugefügt hat. Außer diese paar Wörter, aber das hilft dir auch nicht weiter.
            </p>
        </>;

    // #endregion


    // #region [jsx]
    return (
        <div className='max-width'>
            <PlaceTemplate
                title={<>PLACES.vergessen</>}
                description={description}
                backPath="/fountain-board"
                possibleEvents={possibleEvents}
            />
        </div>
    );
    // #endregion
});

export default FountainBoardItem;