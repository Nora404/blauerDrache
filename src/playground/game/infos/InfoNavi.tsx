import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../../../layout/Header/Header';
import ColoredLetter from '../../../utility/ColoredLetter';
import { useNewGameStore } from '../../../store/newGameStore';


type InfoNaviProps = {
};

const InfoNavi: React.FC<InfoNaviProps> = () => {
    const { store } = useNewGameStore();

    return (
        <div>
            <Header>Infos</Header>
            <p className='mb-1 text-left'>
                <Link to="/map"><ColoredLetter>Karte</ColoredLetter> von Lahtheim</Link><br />
                {store.gameState.creating && <Link to="/new-day">Aktueller <ColoredLetter>Tag</ColoredLetter></Link>}<br />
                {store.gameState.creating && <Link to="/player-info">Dein <ColoredLetter>Steckbrief</ColoredLetter></Link>}<br />
                {store.gameState.creating && <Link to="/player-inventar">Dein <ColoredLetter>Inventar</ColoredLetter></Link>}<br />
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