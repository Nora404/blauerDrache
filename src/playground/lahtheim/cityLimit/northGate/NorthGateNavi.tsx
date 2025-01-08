import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../../../../layout/Header/Header';
import { PLACES } from '../../../../data/colorfullStrings';
import { useNewGameStore } from '../../../../store/newGameStore';

type NorthGateNaviProps = {
};

const NorthGateNavi: React.FC<NorthGateNaviProps> = () => {
    const { store } = useNewGameStore();

    const handleCloseMobilePop = () => {
        store.gameState.mobilePop = false;
    }

    return (
        <div>
            <Header>Nordtor</Header>
            <p className='mb-1 text-left'>
                <Link to="/north-gate" className='mobileBtn' onClick={handleCloseMobilePop}><b>Umgebung</b> untersuchen</Link><br />
                <Link to="/transit/path/north-gate/6" state={{ from: location.pathname }} className='mobileBtn'>Dem {PLACES.Weg} folgen</Link><br />
                <Link to="/fountain" className='mobileBtn'>Richtung {PLACES.Brunnen} gehen</Link><br />
            </p>
        </div>
    );
};

export default NorthGateNavi;