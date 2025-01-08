import { Link } from 'react-router-dom';
import Header from '../../../../layout/Header/Header';
import { PLACES } from '../../../../data/colorfullStrings';
import { useNewGameStore } from '../../../../store/newGameStore';

type GraveyardNaviProps = {
};

const GraveyardNavi: React.FC<GraveyardNaviProps> = () => {
    const { store } = useNewGameStore();

    const handleCloseMobilePop = () => {
        store.gameState.mobilePop = false;
    }

    return (
        <div>
            <Header>Friedhof</Header>
            <p className='mb-1 text-left'>
                <Link to="/graveyard" className='mobileBtn' onClick={handleCloseMobilePop}><b>Umgebung</b> untersuchen</Link><br />
            </p>
            <p className='mb-1 text-left'>
                <Link to="/courtyard" className='mobileBtn'>Zurück zum {PLACES.Vorplatz} gehen</Link><br />
            </p>
        </div>
    );
};

export default GraveyardNavi;