import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../../../../layout/Header/Header';
import ColoredLetter from '../../../../utility/ColoredLetter';

type NorthGateNaviProps = {
};

const NorthGateNavi: React.FC<NorthGateNaviProps> = () => {

    return (
        <div>
            <Header>Nordtor</Header>
            <p className='mb-1 text-left'>
                <Link to="/north-gate"><ColoredLetter>Sich</ColoredLetter> hier umschauen</Link><br />
                <Link to="/start">Dem <ColoredLetter>Weg</ColoredLetter> folgen</Link><br />
                <Link to="/fountain">Richtung <ColoredLetter>Brunnen</ColoredLetter> gehen</Link><br />
            </p>
            <p className='text-left'>
                <Link to="/north-gate-guardian">Mit Wachen <ColoredLetter>sprechen</ColoredLetter></Link><br />
                <Link to="/north-gate-plaque"><ColoredLetter>Plakette</ColoredLetter> des Erfolges</Link><br />
            </p>
        </div>
    );
};

export default NorthGateNavi;