// #region [imports]
import React from 'react';
import ActionButton from '../../../../layout/ActionButtons/ActionButton';
import { useNavigate } from 'react-router-dom';
import { NPC } from '../../../../data/helper/colorfullStrings';
// #endregion

// #region [prepare]
type WestWallHunterProps = {
};

const WestWallHunter: React.FC<WestWallHunterProps> = () => {
    const navigate = useNavigate();
    // #endregion

    // #region [handler]
    const handleBack = () => {
        navigate('/west-wall');
    };
    // #endregion

    // #region [jsx]
    return (
        <div className='max-width'>
            <h2>Mit der {NPC.Jägerin} sprechen</h2>
            <p className='mb-1 text-left'>
                Endtäuschst stellst du fest das die Autorin der Texte hier noch keinen Inhalt hinzugefügt hat. Außer diese paar Wörter, aber das hilft dir auch nicht weiter.
            </p><br />
            <ActionButton onClick={handleBack} label='Sich abwenden' />
        </div>
    );
    // #endregion
};

export default WestWallHunter;