// #region [imports]
import React from 'react';
import { WeightedEvent } from '../../../../data/eventData';
import { observer } from 'mobx-react-lite';
import PlaceTemplate from '../../../../layout/PlaceTemplate';
import { NPC } from '../../../../data/helper/colorfullStrings';
// #endregion

// #region [prepare]
const CourtyardBard: React.FC = observer(() => {

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
                title={<>Dem {NPC.Barde} zuhören</>}
                description={description}
                backPath="/courtyard"
                possibleEvents={possibleEvents}
            />
        </div>
    );
    // #endregion
});

export default CourtyardBard;