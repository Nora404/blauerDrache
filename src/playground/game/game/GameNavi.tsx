import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../../../layout/Header/Header';
import ColoredLetter from '../../../utility/ColoredLetter';
import { useNewGameStore } from '../../../store/newGameStore';

type GameNaviProps = {

};

const GameNavi: React.FC<GameNaviProps> = () => {
    const { store } = useNewGameStore();

    return (
        <div>
            <Header>Spiel</Header>
            <p className='text-left'>
                <Link to="/start"><ColoredLetter>Tor</ColoredLetter> von Lahtheim</Link><br />
                {!store.gameState.creating && <><Link to="/new-player">Erstelle neuen <ColoredLetter>Charakter</ColoredLetter></Link><br /></>}
                <Link to="/whatIs"> Über dieses <ColoredLetter>Spiel</ColoredLetter></Link><br />
                <Link to="/setting"><ColoredLetter>Einstellungen</ColoredLetter></Link><br />
            </p>
        </div>
    );
};

export default GameNavi;