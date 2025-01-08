import { Link } from 'react-router-dom';
import Header from '../../../../layout/Header/Header';
import { useNewGameStore } from '../../../../store/newGameStore';
import { PLACES } from '../../../../data/colorfullStrings';

type SouthWallNaviProps = {
};

const SouthWallNavi: React.FC<SouthWallNaviProps> = () => {
    const { store } = useNewGameStore();

    const handleCloseMobilePop = () => {
        store.gameState.mobilePop = false;
    }

    return (
        <div>
            <Header>Südmauer</Header>
            <p className='mb-1 text-left'>
                <Link to="/south-wall" className='mobileBtn' onClick={handleCloseMobilePop}><b>Umgebung</b> untersuchen</Link><br />
                <Link to="/courtyard" className='mobileBtn'>Zurück zum {PLACES.Vorplatz} gehen</Link><br />
            </p>
        </div>
    );
};

export default SouthWallNavi;