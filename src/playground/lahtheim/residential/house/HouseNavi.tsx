import { Link } from 'react-router-dom';
import Header from '../../../../layout/Header/Header';
import { PLACES } from '../../../../data/colorfullStrings';
import { useNewGameStore } from '../../../../store/newGameStore';
import Arrow from '../../../../utility/Arrow';

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
                <Link to="/house" className='mobileBtn' onClick={handleCloseMobilePop}><Arrow /><b>Raum</b> untersuchen</Link><br />
                <Link to="/residential" className='mobileBtn'><Arrow type='s' />Zurück zum {PLACES.Wohnbezirk}</Link><br />
            </p>
        </div>
    );
};

export default HouseNavi;