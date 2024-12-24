import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../../../../layout/Header/Header';
import ColoredLetter from '../../../../utility/ColoredLetter';

type NorthGateProps = {
};

const NorthGate: React.FC<NorthGateProps> = () => {

    return (
        <div>
            <Header>Nordtor</Header>
            <p className='mb-1 text-left'>
                <Link to="/start">Richtung <ColoredLetter>Brunnen</ColoredLetter> gehen</Link><br />
                <Link to="/start">Dem <ColoredLetter>Weg</ColoredLetter> folgen</Link><br />
            </p>
            <p className='text-left'>
                <Link to="/start">Mit Wachen <ColoredLetter>sprechen</ColoredLetter></Link><br />
                <Link to="/start"><ColoredLetter>Plakette</ColoredLetter> des Erfolges</Link><br />
            </p>
        </div>
    );
};

export default NorthGate;
