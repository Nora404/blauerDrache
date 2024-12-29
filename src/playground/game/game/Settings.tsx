import React from 'react';
import Header from '../../../layout/Header/Header';
import { useNavigate } from 'react-router-dom';

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
                Ich lass mir noch einen sinnvollen Text einfallen!
            </p>

            <Header>Charakter</Header>
            <button onClick={handleResetCharakter}>Neuer Charakter (Dein aktueller Charakter wird gelöscht)</button>
        </div>
    );
};

export default Settings;