import { Link } from 'react-router-dom';
import Header from '../../../../layout/Header/Header';
import { PLACES } from '../../../../data/colorfullStrings';
import { useNewGameStore } from '../../../../store/newGameStore';

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
                <Link to="/weapon-shop" className='mobileBtn' onClick={handleCloseMobilePop}><b>Laden</b> untersuchen</Link><br />
                <Link to="/trading-district" className='mobileBtn'>Zurück zum {PLACES.Handelsbezirk} gehen</Link><br />
            </p>
        </div>
    );
};

export default WeaponShopNavi;