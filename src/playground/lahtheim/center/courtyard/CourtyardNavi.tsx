import { Link } from 'react-router-dom';
import Header from '../../../../layout/Header/Header';
import { PLACES } from '../../../../data/colorfullStrings';
import { useNewGameStore } from '../../../../store/newGameStore';

type CourtyardNaviProps = {
};

const CourtyardNavi: React.FC<CourtyardNaviProps> = () => {
    const { store } = useNewGameStore();

    const handleCloseMobilePop = () => {
        store.gameState.mobilePop = false;
    }

    return (
        <div>
            <Header>Vorplatz</Header>
            <p className='mb-1 text-left'>
                <Link to="/courtyard" className='mobileBtn' onClick={handleCloseMobilePop}><b>Umgebung</b> untersuchen</Link><br />
            </p>
            <p className='mb-1 text-left'>
                <Link to="/church" className='mobileBtn'>In die {PLACES.Kirche} gehen</Link><br />
                <Link to="/graveyard" className='mobileBtn'>Den {PLACES.Friedhof} besuchen</Link><br />
            </p>
            <p className='mb-1 text-left'>
                <Link to="/fountain" className='mobileBtn'>Richtung {PLACES.Brunnen} gehen</Link><br />
            </p>
        </div>
    );
};

export default CourtyardNavi;