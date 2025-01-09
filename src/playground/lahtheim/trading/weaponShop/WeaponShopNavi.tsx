import { Link } from 'react-router-dom';
import Header from '../../../../layout/Header/Header';
import { PLACES } from '../../../../data/colorfullStrings';
import { useNewGameStore } from '../../../../store/newGameStore';
import Arrow from '../../../../utility/Arrow';

type WeaponShopNaviProps = {
};

const WeaponShopNavi: React.FC<WeaponShopNaviProps> = () => {
    const { store } = useNewGameStore();

    const handleCloseMobilePop = () => {
        store.gameState.mobilePop = false;
    }

    return (
        <div>
            <Header>Waffenladen</Header>
            <p className='mb-1 text-left'>
                <Link to="/weapon-shop" className='mobileBtn' onClick={handleCloseMobilePop}><Arrow /><b>Laden</b> untersuchen</Link><br />
                <Link to="/trading-district" className='mobileBtn'><Arrow type='w' />Zurück zum {PLACES.Handelsbezirk} gehen</Link><br />
            </p>
        </div>
    );
};

export default WeaponShopNavi;