import { Link } from 'react-router-dom';
import Header from '../../../../layout/Header/Header';
import { PLACES } from '../../../../data/helper/colorfullStrings';
import Arrow from '../../../../utility/Arrow';
import { observer } from 'mobx-react-lite';
import { useRootStore } from '../../../../store';

type WeaponShopNaviProps = {
};

const WeaponShopNavi: React.FC<WeaponShopNaviProps> = observer(() => {
    const { gameState } = useRootStore();

    const handleCloseMobilePop = () => {
        gameState.data.mobilePop = false;
    }

    return (
        <div>
            <Header>Waffenladen</Header>
            <p className='mb-1 text-left'>
                <Link to="/weapon-shop" className='mobileBtn' onClick={handleCloseMobilePop}>
                    <Arrow /><b>Laden</b> untersuchen</Link><br />
                <Link to="/weapon-buy" className='mobileBtn' onClick={handleCloseMobilePop}>
                    <Arrow /><i>Waffen</i> kaufen</Link><br />
                <Link to="/weapon-sell" className='mobileBtn' onClick={handleCloseMobilePop}>
                    <Arrow /><i>Waffen</i> verkaufen</Link><br />
                <Link to="/trading-district" className='mobileBtn'><Arrow type='w' />Zurück zum {PLACES.Handelsbezirk} gehen</Link><br />
            </p>
        </div>
    );
});

export default WeaponShopNavi;