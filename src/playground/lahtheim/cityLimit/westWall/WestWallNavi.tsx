import { Link } from 'react-router-dom';
import Header from '../../../../layout/Header/Header';
import { PLACES } from '../../../../data/colorfullStrings';
import { useNewGameStore } from '../../../../store/newGameStore';

type WestWallNaviProps = {
};

const WestWallNavi: React.FC<WestWallNaviProps> = () => {
    const { store } = useNewGameStore();

    const handleCloseMobilePop = () => {
        store.gameState.mobilePop = false;
    }

    return (
        <div>
            <Header>Westmauer</Header>
            <p className='mb-1 text-left'>
                <Link to="/west-wall" className='mobileBtn' onClick={handleCloseMobilePop}><b>Umgebung</b> untersuchen</Link><br />
                <Link to="/residential" className='mobileBtn'>Zum {PLACES.Wohnbezirk} zurück gehen</Link><br />
            </p>
        </div>
    );
};

export default WestWallNavi;