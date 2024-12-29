import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../../../layout/Header/Header';
import ColoredLetter from '../../../utility/ColoredLetter';
import { useGameState } from '../../../data/gameState';
import { useGameStore } from '../../../data/gameStore';

type InfoNaviProps = {
};

const InfoNavi: React.FC<InfoNaviProps> = () => {
    const { gameData } = useGameStore();
    const gameState = useGameState();
    if (!gameState) return null;

    const { gameTime, gameDay } = gameState;

    return (
        <div>
            <Header>Infos</Header>
            <p className='mb-1 text-left'>
                <Link to="/map"><ColoredLetter>Karte</ColoredLetter> von Lahtheim</Link><br />
                {gameData.meta.creating && <Link to="/new-day">Aktueller <ColoredLetter>Tag</ColoredLetter></Link>}<br />
                {gameData.meta.creating && <Link to="/player-info">Dein <ColoredLetter>Steckbrief</ColoredLetter></Link>}<br />
            </p>

            <p className='text-left'>
                Zeit: <b>{gameTime}</b><br />
                Es ist: <b>{gameDay}</b><br />
                Wetter: <b>{gameData.meta.weather}</b><br />
                Temperatur: <b>{gameData.meta.temperature}</b><br />
            </p>
        </div>
    );
};

export default InfoNavi;