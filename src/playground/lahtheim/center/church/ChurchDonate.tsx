//#region [imports]
import React from 'react';
import { PLACES } from '../../../../data/helper/colorfullStrings';
import ActionButton from '../../../../layout/ActionButtons/ActionButton';
import { useNavigate } from 'react-router-dom';
//#endregion

//#region [prepare]
type ChurchDonateProps = {
};

const ChurchDonate: React.FC<ChurchDonateProps> = () => {
    const navigate = useNavigate();
    //#endregion

    //#region [handler]
    const handleBack = () => {
        navigate('/church');
    };
    //#endregion

    //#region [jsx]
    return (
        <div className='max-width'>
            <h2>Etwas der {PLACES.Kirche} spenden</h2>
            <p className='mb-1 text-left'>
                Endtäuschst stellst du fest das die Autorin der Texte hier noch keinen Inhalt hinzugefügt hat. Außer diese paar Wörter, aber das hilft dir auch nicht weiter.
            </p><br />
            <ActionButton onClick={handleBack} label='Sich abwenden' />
        </div>
    );
    //#endregion
};

export default ChurchDonate;