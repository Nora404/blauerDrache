import { Link } from 'react-router-dom';
import Header from '../../../../layout/Header/Header';
import { useNewGameStore } from '../../../../store/newGameStore';
import { PLACES } from '../../../../data/colorfullStrings';

type GeneralStoreNaviProps = {
};

const GeneralStoreNavi: React.FC<GeneralStoreNaviProps> = () => {
    const { store } = useNewGameStore();

    const handleCloseMobilePop = () => {
        store.gameState.mobilePop = false;
    }

    return (
        <div>
            <Header>Krämer</Header>
            <p className='mb-1 text-left'>
                <Link to="/general-shop" className='mobileBtn' onClick={handleCloseMobilePop}><b>Laden</b> untersuchen</Link><br />
            </p>
            <p className='mb-1 text-left'>
                <Link to="/trading-district" className='mobileBtn'>Zurück zum {PLACES.Handelsbezirk} gehen</Link><br />
            </p>
        </div>
    );
};

export default GeneralStoreNavi;