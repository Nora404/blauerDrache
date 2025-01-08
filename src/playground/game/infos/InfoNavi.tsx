import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../../../layout/Header/Header';
import { useNewGameStore } from '../../../store/newGameStore';
import MultiColoredLetters from '../../../utility/MultiColoredLetters';
import { blueColors } from '../../../data/colorMappingData';


type InfoNaviProps = {
    mobilePop?: () => void;
};

const InfoNavi: React.FC<InfoNaviProps> = ({ mobilePop }) => {
    const { store } = useNewGameStore();

    const handleClick = () => {
        mobilePop?.();
    }

    return (
        <div>
            <Header>Infos</Header>
            <p className='mb-1 text-left'>
                <Link onClick={handleClick} to="/map" className='mobileBtn'><MultiColoredLetters colors={blueColors}>Karte von Lahtheim</MultiColoredLetters></Link><br />
                {store.gameState.creating && <Link onClick={handleClick} to="/new-day" className='mobileBtn'><MultiColoredLetters colors={blueColors}>Aktueller Tag</MultiColoredLetters></Link>}<br />
                {store.gameState.creating && <Link onClick={handleClick} to="/player-info" className='mobileBtn'><MultiColoredLetters colors={blueColors}>Dein Steckbrief</MultiColoredLetters></Link>}<br />
                {store.gameState.creating && <Link onClick={handleClick} to="/player-inventar" className='mobileBtn'><MultiColoredLetters colors={blueColors}>Dein Inventar</MultiColoredLetters></Link>}<br />
            </p>

            <p className='text-left'>
                Zeit: <b>{store.gameTime.gameTime}</b><br />
                Es ist: <b>{store.gameTime.gameDay}</b><br />
                Wetter: <b>{store.gameState.weather}</b><br />
                Temperatur: <b>{store.gameState.temperature}</b><br />
            </p>
        </div>
    );
};

export default InfoNavi;