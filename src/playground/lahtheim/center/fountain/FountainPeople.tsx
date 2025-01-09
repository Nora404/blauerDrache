// #region [imports]
import React from 'react';
import ActionButton from '../../../../layout/ActionButtons/ActionButton';
import { useNavigate } from 'react-router-dom';
// #endregion

// #region [prepare]
type FountainPeopleProps = {
};

const FountainPeople: React.FC<FountainPeopleProps> = () => {
    const navigate = useNavigate();
    // #endregion

    // #region [handler]
    const handleBack = () => {
        navigate('/fountain');
    };
    // #endregion

    // #region [jsx]
    return (
        <div className='max-width'>
            <h2>mit einem der Leute sprechen</h2>
            <p className='mb-1 text-left'>
                Endtäuschst stellst du fest das die Autorin der Texte hier noch keinen Inhalt hinzugefügt hat. Außer diese paar Wörter, aber das hilft dir auch nicht weiter.
            </p><br />
            <ActionButton onClick={handleBack} label='Sich abwenden' />
        </div>
    );
    // #endregion
};

export default FountainPeople;