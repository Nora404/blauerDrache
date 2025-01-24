// #region [imports]
import React from 'react';
import { WeightedEvent } from '../../../../data/eventData';
import { observer } from 'mobx-react-lite';
import PlaceTemplate from '../../../../layout/PlaceTemplate';
import { NPC } from '../../../../data/helper/colorfullStrings';
// #endregion

// #region [prepare]
type CourtyardBardProps = {};

const CourtyardBard: React.FC<CourtyardBardProps> = observer(() => {

    const possibleEvents: WeightedEvent[] = [];

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
                title={<>Dem {NPC.Barde} zuhören</>}
                description={description}
                noEventHappend={noEventHappend}
                backPath="/courtyard"
                possibleEvents={possibleEvents}
            />
        </div>
    );
    // #endregion
});

export default CourtyardBard;