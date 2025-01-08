import { Link } from 'react-router-dom';
import Header from '../../../../layout/Header/Header';
import { PLACES } from '../../../../data/colorfullStrings';
import { useNewGameStore } from '../../../../store/newGameStore';

type TownHallNaviProps = {
};

const TownHallNavi: React.FC<TownHallNaviProps> = () => {
    const { store } = useNewGameStore();

    const handleCloseMobilePop = () => {
        store.gameState.mobilePop = false;
    }

    return (
        <div>
            <Header>Rathaus</Header>
            <p className='mb-1 text-left'>
                <Link to="/townhall" className='mobileBtn' onClick={handleCloseMobilePop}><b>Halle</b> untersuchen</Link><br />
            </p>
            <p className='text-left'>
                <Link to="/fountain" className='mobileBtn'>Richtung {PLACES.Brunnen} verlassen</Link><br />
            </p>
        </div>
    );
};

export default TownHallNavi;