import { Link } from 'react-router-dom';
import Header from '../../../../layout/Header/Header';
import { PLACES } from '../../../../data/colorfullStrings';
import { useNewGameStore } from '../../../../store/newGameStore';

type AlleysNaviProps = {
};

const AlleysNavi: React.FC<AlleysNaviProps> = () => {
    const { store } = useNewGameStore();

    const handleCloseMobilePop = () => {
        store.gameState.mobilePop = false;
    }

    return (
        <div>
            <Header>Gassen</Header>
            <p className='mb-1 text-left'>
                <Link to="/alleys" className='mobileBtn' onClick={handleCloseMobilePop}><b>Umgebung</b> untersuchen</Link><br />
            </p>
            <p className='mb-1 text-left'>
                <Link to="/residential" className='mobileBtn'>Zurück zum {PLACES.Wohnbezirk} </Link><br />
            </p>
        </div>
    );
};

export default AlleysNavi;