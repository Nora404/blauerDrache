import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../../../../layout/Header/Header';
import { PLACES } from '../../../../data/helper/colorfullStrings';
import Arrow from '../../../../utility/Arrow';
import { observer } from 'mobx-react-lite';
import { useRootStore } from '../../../../store';

type NorthGateNaviProps = {
};

const NorthGateNavi: React.FC<NorthGateNaviProps> = observer(() => {
    const { gameState } = useRootStore();

    const handleCloseMobilePop = () => {
        gameState.data.mobilePop = false;
    }

    return (
        <div>
            <Header>Nordtor</Header>
            <p className='mb-1 text-left'>
                <Link to="/north-gate" className='mobileBtn' onClick={handleCloseMobilePop}><Arrow /><b>Umgebung</b> untersuchen</Link><br />
                <Link to="/transit/path/north-gate/6" state={{ from: location.pathname }} className='mobileBtn'><Arrow type='n' />Dem {PLACES.Weg} folgen</Link><br />
                <Link to="/fountain" className='mobileBtn'><Arrow type='s' />Richtung {PLACES.Brunnen} gehen</Link><br />
            </p>
        </div>
    );
});

export default NorthGateNavi;