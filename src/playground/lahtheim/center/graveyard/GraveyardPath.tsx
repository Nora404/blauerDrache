// #region [imports]
import React from 'react';
import ActionButton from '../../../../layout/ActionButtons/ActionButton';
import { useNavigate } from 'react-router-dom';
// #endregion

// #region [prepare]
type GraveyardPathProps = {
};

const GraveyardPath: React.FC<GraveyardPathProps> = () => {
    const navigate = useNavigate();
    // #endregion

    // #region [handler]
    const handleBack = () => {
        navigate('/graveyard');
    };
    // #endregion

    // #region [jsx]
    return (
        <div className='max-width'>
            <h2>Den Weg entlang gehen</h2>
            <p className='mb-1 text-left'>
                Endtäuschst stellst du fest das die Autorin der Texte hier noch keinen Inhalt hinzugefügt hat. Außer diese paar Wörter, aber das hilft dir auch nicht weiter.
            </p><br />
            <ActionButton onClick={handleBack} label='Sich abwenden' />
        </div>
    );
    // #endregion
};

export default GraveyardPath;