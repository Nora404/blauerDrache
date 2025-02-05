// #region [imports]
import React from 'react';
import { WeightedEvent } from '../../../../data/eventData';
import { observer } from 'mobx-react-lite';
import PlaceTemplate from '../../../../layout/PlaceTemplate';
// #endregion

// #region [prepare]
type FountainWarriorProps = {};

const FountainWarrior: React.FC<FountainWarriorProps> = observer(() => {

    const possibleEvents: WeightedEvent[] = [];

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
                title={<>Mit einem Krieger sprechen</>}
                description={description}
                backPath="/fountain-warrior"
                possibleEvents={possibleEvents}
                buttons={[{ label: 'Verlorene Tasche', startEventId: '007Bag' }]}
            />
        </div>
    );
    // #endregion
});

export default FountainWarrior;