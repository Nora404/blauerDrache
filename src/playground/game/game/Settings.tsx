import React from 'react';
import Header from '../../../layout/Header/Header';
import { useNavigate } from 'react-router-dom';
import { GradientText } from '../../../utility/GradientText';
import FullscreenToggleButton from '../../../layout/FullscreenButton';

type SettingsProps = {
};

const Settings: React.FC<SettingsProps> = () => {

    const handleResetCharakter = () => {
        navigation("/new-player")
    }
    const navigation = useNavigate();

    return (
        <div className='max-width'>
            <h2>Einstellungen</h2>

            <Header>Charakter</Header>
            <p className='mb-1 text-left'>
                Du kannst hier deinen Charakter zurück setzten.
                Aber <GradientText colors={['#ff0000']}>Achtung!</GradientText> Das wird deinen aktuellen Charakter löschen.
            </p>

            <button className="btn-border" onClick={handleResetCharakter}>Neuer Charakter (Dein aktueller Charakter wird gelöscht)</button><br />
            <br />
            <Header>Anzeige</Header>

            <FullscreenToggleButton />
        </div>
    );
};

export default Settings;