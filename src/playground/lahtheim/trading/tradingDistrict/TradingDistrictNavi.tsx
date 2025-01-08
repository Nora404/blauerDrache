import { Link } from 'react-router-dom';
import Header from '../../../../layout/Header/Header';
import { PLACES } from '../../../../data/colorfullStrings';
import { useNewGameStore } from '../../../../store/newGameStore';

type TradingDistrictNaviProps = {
};

const TradingDistrictNavi: React.FC<TradingDistrictNaviProps> = () => {
    const { store } = useNewGameStore();

    const handleCloseMobilePop = () => {
        store.gameState.mobilePop = false;
    }

    return (
        <div>
            <Header>Handelsbezirk</Header>
            <p className='mb-1 text-left'>
                <Link to="/trading-district" className='mobileBtn' onClick={handleCloseMobilePop}><b>Umgebung</b> untersuchen</Link><br />
            </p>
            <p className='mb-1 text-left'>
                <Link to="/general-shop" className='mobileBtn'>Zum {PLACES.Krämer} gehen</Link><br />
                <Link to="/equipment-shop" className='mobileBtn'>Den {PLACES.Ausrüstungsladen} besuchen</Link><br />
                <Link to="/weapon-shop" className='mobileBtn'>Sich im {PLACES.Waffenladen} umsehen</Link><br />
                <Link to="/east-wall" className='mobileBtn'>Die {PLACES.Ostmauer} besichtigen</Link><br />
            </p>
            <p className='mb-1 text-left'>
                <Link to="/fountain" className='mobileBtn'>Zurück zum {PLACES.Brunnen} gehen</Link><br />
            </p>
        </div>
    );
};

export default TradingDistrictNavi;