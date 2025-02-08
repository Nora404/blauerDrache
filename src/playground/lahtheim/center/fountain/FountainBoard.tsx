// #region [imports]
import React from 'react';
import ActionButton from '../../../../layout/ActionButtons/ActionButton';
import { useNavigate } from 'react-router-dom';
// #endregion

// #region [prepare]
type FountainBoardProps = {
};

const FountainBoard: React.FC<FountainBoardProps> = () => {
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
            <h2><b>Schwarzes Brett</b></h2>
            <p className='mb-1 text-left'>
                Endtäuschst stellst du fest das die Autorin der Texte hier noch keinen Inhalt hinzugefügt hat. Außer diese paar Wörter, aber das hilft dir auch nicht weiter.
            </p> <br />
            <p className='mb-1 text-left questcontainer'>
                <div className='text-left questbox'><strong>Begegnung</strong><br />Finde die gesuchte Person und rede mit ihr</div>
                <div className='text-left questbox'><strong>Besorgen</strong><br />Bestimmte Gegenstände müsen besorgt werden</div>
                <div className='text-left questbox'><strong>Erkundung</strong><br />Ein bestimmter Ort muss erreicht werden</div>
                <div className='text-left questbox'><strong>Benutzten</strong><br />An einem bestimmten Ort muss etwas benutzt werden</div>
                <div className='text-left questbox'><strong>Besiegen</strong><br />Es gibt ein Kopfgeld auf bestimmte Gegner</div>
                <div className='text-left questbox'><strong>Erfahrung</strong><br />Jemand sucht nach Personen mit Erfahrung</div>
                <div className='text-left questbox'><strong>Verbessern</strong><br />Zeige das du dich verbessern und stärker werden kannst</div>
            </p><br />
            <ActionButton onClick={handleBack} label='Sich abwenden' />
        </div>
    );
    // #endregion
};

export default FountainBoard;