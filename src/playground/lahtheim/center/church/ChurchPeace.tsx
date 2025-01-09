import React from 'react';
import ActionButton from '../../../../layout/ActionButtons/ActionButton';
import { useNavigate } from 'react-router-dom';

type ChurchPeaceProps = {
};

const ChurchPeace: React.FC<ChurchPeaceProps> = () => {
    const navigate = useNavigate();

    const handleBack = () => {
        navigate('/church');
    };

    return (
        <div className='max-width'>
            <h2>Inneren Frieden suchen</h2>
            <p className='mb-1 text-left'>
                Endtäuschst stellst du fest das die Autorin der Texte hier noch keinen Inhalt hinzugefügt hat. Außer diese paar Wörter, aber das hilft dir auch nicht weiter.
            </p><br />
            <ActionButton onClick={handleBack} label='Sich abwenden' />
        </div>
    );
};

export default ChurchPeace;