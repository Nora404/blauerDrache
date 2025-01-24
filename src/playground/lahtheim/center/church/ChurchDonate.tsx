// #region [imports]
import React from 'react';
import { WeightedEvent } from '../../../../data/eventData';
import { observer } from 'mobx-react-lite';
import PlaceTemplate from '../../../../layout/PlaceTemplate';
import { SYSTEM } from '../../../../data/helper/colorfullStrings';
// #endregion

// #region [prepare]
type ChurchDonateProps = {};

const ChurchDonate: React.FC<ChurchDonateProps> = observer(() => {

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
                title={<>Ein paar {SYSTEM.Gold} der Kirche spenden</>}
                description={description}
                backPath="/church"
                possibleEvents={possibleEvents}
            />
        </div>
    );
    // #endregion
});

export default ChurchDonate;