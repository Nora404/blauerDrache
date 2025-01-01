import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../../../../layout/Header/Header';
import { PLACES } from '../../../../data/colorfullStrings';
import { GradientText } from '../../../../utility/GradientText';

type NorthGateNaviProps = {
};

const NorthGateNavi: React.FC<NorthGateNaviProps> = () => {

    return (
        <div>
            <Header>Nordtor</Header>
            <p className='mb-1 text-left'>
                <Link to="/transit/path/Nordtor/Weg/6" state={{ from: location.pathname }}>Dem {PLACES.Weg} folgen</Link><br />
                <Link to="/fountain">Richtung {PLACES.Brunnen} gehen</Link><br />
            </p>
            <p className='text-left'>
                <Link to="/start"><b><GradientText colors={['#bbbbbb']}>Umgebung</GradientText></b> untersuchen</Link><br />
                <Link to="/north-gate-guardian">Mit <b>Wachen</b> sprechen</Link><br />
                <Link to="/north-gate-plaque"><b>Plakette</b> des Erfolges</Link><br />
            </p>
        </div>
    );
};

export default NorthGateNavi;