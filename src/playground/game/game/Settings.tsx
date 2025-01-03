import React from 'react';
import Header from '../../../layout/Header/Header';
import { useNavigate } from 'react-router-dom';
import { GradientText } from '../../../utility/GradientText';

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
            <p className='mb-1 text-left'>
                Ich lass mir noch einen sinnvollen Text einfallen! Du kannst hier deinen Charakter zurück setzten.
                Aber <GradientText colors={['#ff0000']}>Achtung!</GradientText> Das wird deinen aktuellen Charakter löschen.

            </p>

            <Header>Charakter</Header>
            <button onClick={handleResetCharakter}>Neuer Charakter (Dein aktueller Charakter wird gelöscht)</button>
        </div>
    );
};

export default Settings;