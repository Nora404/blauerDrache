import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../../../../layout/Header/Header';
import { PLACES } from '../../../../data/colorfullStrings';

type NorthGateNaviProps = {
};

const NorthGateNavi: React.FC<NorthGateNaviProps> = () => {

    return (
        <div>
            <Header>Nordtor</Header>
            <p className='mb-1 text-left'>
                <Link to="/transit/path/north-gate/6" state={{ from: location.pathname }}>Dem {PLACES.Weg} folgen</Link><br />
                <Link to="/fountain">Richtung {PLACES.Brunnen} gehen</Link><br />
            </p>
            <p className='text-left'>
                <Link to="/north-gate"><b>Umgebung</b> untersuchen</Link><br />
            </p>
        </div>
    );
};

export default NorthGateNavi;