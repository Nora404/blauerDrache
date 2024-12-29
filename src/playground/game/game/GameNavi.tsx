import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../../../layout/Header/Header';
import ColoredLetter from '../../../utility/ColoredLetter';

type GameNaviProps = {

};

const GameNavi: React.FC<GameNaviProps> = () => {

    return (
        <div>
            <Header>Spiel</Header>
            <p className='text-left'>
                <Link to="/start"><ColoredLetter>Tor</ColoredLetter> von Lahtheim</Link><br />
                <Link to="/new-player">Erstelle neuen <ColoredLetter>Charakter</ColoredLetter></Link><br />
                <Link to="/whatIs"> Über dieses <ColoredLetter>Spiel</ColoredLetter></Link><br />
                <Link to="/start"><ColoredLetter>Einstellungen</ColoredLetter></Link><br />
            </p>
        </div>
    );
};

export default GameNavi;