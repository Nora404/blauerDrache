import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../../../layout/Header/Header';
import ColoredLetter from '../../../utility/ColoredLetter';
import { useGameState } from '../../../data/gameState';

type OtherThingsNaviProps = {
};

const OtherThingsNavi: React.FC<OtherThingsNaviProps> = () => {
    const gameState = useGameState();
    if (!gameState) return null;

    const { gameTime, gameDay, gameWeather, gameTemperature } = gameState;

    return (
        <div>
            <Header>Anderes</Header>
            <p className='mb-1 text-left'>
                <Link to="/map"><ColoredLetter>Karte</ColoredLetter> von Lahtheim</Link><br />
                <Link to="/start"><ColoredLetter>Einstellungen</ColoredLetter></Link><br />
            </p>

            <p className='text-left'>
                Zeit: <b>{gameTime}</b><br />
                Es ist: <b>{gameDay}</b><br />
                Wetter: <b>{gameWeather}</b><br />
                Temperatur: <b>{gameTemperature}</b><br />
            </p>
        </div>
    );
};

export default OtherThingsNavi;