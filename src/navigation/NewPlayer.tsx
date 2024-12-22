import React from 'react';
import Header from '../layout/Header';
import { Link } from 'react-router-dom';

type NewPlayerProps = {

};

const NewPlayer: React.FC<NewPlayerProps> = () => {

    return (
        <div>
            <Header>Neu hier ?</Header>
            <p className='text-left'>
                <Link to="/start">Tor von Lahtheim</Link><br /><br />
                <Link to="/charakter">Erstelle neuen Charakter</Link><br />
                <Link to="/whatIs"> Was erwartet dich?</Link><br />
                <Link to="/map">Karte von Lahtheim</Link><br />
            </p>
        </div>
    );
};

export default NewPlayer;