import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../layout/Header/Header';
import ColoredLetter from '../utility/ColoredLetter';

type OtherThingsProps = {
};

const OtherThings: React.FC<OtherThingsProps> = () => {

    return (
        <div>
            <Header>Anderes</Header>
            <p className='mb-1 text-left'>
                <Link to="/map"><ColoredLetter>Karte</ColoredLetter> von Lahtheim</Link><br />
                <Link to="/start"><ColoredLetter>Einstellungen</ColoredLetter></Link><br />
            </p>
        </div>
    );
};

export default OtherThings;