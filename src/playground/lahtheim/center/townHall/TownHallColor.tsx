// #region [imports]
import React from 'react';
import ActionButton from '../../../../layout/ActionButtons/ActionButton';
import { useNavigate } from 'react-router-dom';
import MultiColoredLetters from '../../../../utility/MultiColoredLetters';
import { rainbowColors } from '../../../../data/helper/colorMappingData';
// #endregion

// #region [prepare]
type TownHallColorProps = {
};

const TownHallColor: React.FC<TownHallColorProps> = () => {
    const navigate = useNavigate();
    // #endregion

    // #region [handler]
    const handleBack = () => {
        navigate('/townhall');
    };
    // #endregion

    // #region [jsx]
    return (
        <div className='max-width'>
            <h2><MultiColoredLetters colors={rainbowColors}>Namen mit Farben anpassen</MultiColoredLetters></h2>
            <p className='mb-1 text-left'>
                Endtäuschst stellst du fest das die Autorin der Texte hier noch keinen Inhalt hinzugefügt hat. Außer diese paar Wörter, aber das hilft dir auch nicht weiter.
            </p><br />
            <ActionButton onClick={handleBack} label='Sich abwenden' />
        </div>
    );
    // #endregion
};

export default TownHallColor;