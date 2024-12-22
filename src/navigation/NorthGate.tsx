import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../layout/Header';

type NorthGateProps = {
};

const NorthGate: React.FC<NorthGateProps> = () => {

    return (
        <div>
            <Header>Nordtor</Header>
            <p className='text-left'>
            <Link to="/start">Richtung Brunnen gehen</Link><br />
            <Link to="/start">Dem Weg folgen</Link><br className='mb-1'/>
            <Link to="/start">Mit Wachen sprechen</Link><br />
            </p>
        </div>
    );
};

export default NorthGate;
