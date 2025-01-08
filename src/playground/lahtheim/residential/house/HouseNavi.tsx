import { Link } from 'react-router-dom';
import Header from '../../../../layout/Header/Header';
import { PLACES } from '../../../../data/colorfullStrings';
import { useNewGameStore } from '../../../../store/newGameStore';

type HouseNaviProps = {
};

const HouseNavi: React.FC<HouseNaviProps> = () => {
    const { store } = useNewGameStore();

    const handleCloseMobilePop = () => {
        store.gameState.mobilePop = false;
    }

    return (
        <div>
            <Header>Haus</Header>
            <p className='mb-1 text-left'>
                <Link to="/house" className='mobileBtn' onClick={handleCloseMobilePop}><b>Raum</b> untersuchen</Link><br />
            </p>
            <p className='mb-1 text-left'>
                <Link to="/residential" className='mobileBtn'>Zurück zum {PLACES.Wohnbezirk}</Link><br />
            </p>
        </div>
    );
};

export default HouseNavi;