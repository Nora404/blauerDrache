import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../../../layout/Header/Header';
import { useNewGameStore } from '../../../store/newGameStore';
import MultiColoredLetters from '../../../utility/MultiColoredLetters';
import { blueColors } from '../../../data/colorMappingData';

type GameNaviProps = {
    mobilePop?: () => void;
};

const GameNavi: React.FC<GameNaviProps> = ({ mobilePop }) => {
    const { store } = useNewGameStore();

    const handleClick = () => {
        mobilePop?.();
    }

    return (
        <div>
            <Header>Spiel</Header>
            <p className='text-left'>
                <Link onClick={handleClick} to="/start" className='mobileBtn'><MultiColoredLetters colors={blueColors}>Tor von Lahtheim</MultiColoredLetters></Link><br />
                {!store.gameState.creating && <><Link onClick={handleClick} to="/new-player" className='mobileBtn'><MultiColoredLetters colors={blueColors}>Erstelle neuen Charakter</MultiColoredLetters></Link><br /></>}
                <Link onClick={handleClick} to="/whatIs" className='mobileBtn'><MultiColoredLetters colors={blueColors}>Über dieses Spiel</MultiColoredLetters></Link><br />
                <Link onClick={handleClick} to="/map" className='mobileBtn'><MultiColoredLetters colors={blueColors}>Karte von Lahtheim</MultiColoredLetters></Link><br />
                <Link onClick={handleClick} to="/setting" className='mobileBtn'><MultiColoredLetters colors={blueColors}>Einstellungen</MultiColoredLetters></Link><br />
            </p>
        </div>
    );
};

export default GameNavi;