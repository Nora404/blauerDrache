import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../../../layout/Header/Header';
import ColoredLetter from '../../../utility/ColoredLetter';
import { useNewGameStore } from '../../../store/newGameStore';

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
                <Link onClick={handleClick} to="/start"><ColoredLetter>Tor</ColoredLetter> von Lahtheim</Link><br />
                {!store.gameState.creating && <><Link onClick={handleClick} to="/new-player">Erstelle neuen <ColoredLetter>Charakter</ColoredLetter></Link><br /></>}
                <Link onClick={handleClick} to="/whatIs"> Über dieses <ColoredLetter>Spiel</ColoredLetter></Link><br />
                <Link onClick={handleClick} to="/setting"><ColoredLetter>Einstellungen</ColoredLetter></Link><br />
            </p>
        </div>
    );
};

export default GameNavi;