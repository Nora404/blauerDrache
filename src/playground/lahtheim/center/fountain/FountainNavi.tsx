import { Link } from 'react-router-dom';
import Header from '../../../../layout/Header/Header';
import { PLACES } from '../../../../data/colorfullStrings';
import { useNewGameStore } from '../../../../store/newGameStore';

type FountainNaviProps = {
};

const FountainNavi: React.FC<FountainNaviProps> = () => {
    const { store } = useNewGameStore();

    const handleCloseMobilePop = () => {
        store.gameState.mobilePop = false;
    }

    return (
        <div>
            <Header>Brunnen</Header>
            <p className='mb-1 text-left'>
                <Link to="/fountain" className='mobileBtn' onClick={handleCloseMobilePop}><b>Umgebung</b> untersuchen</Link><br />
            </p>
            <p className='mb-1 text-left'>
                <Link to="/residential" className='mobileBtn'>Das {PLACES.Wohnbezirk} besuchen</Link><br />
                <Link to="/trading-district" className='mobileBtn'>Richtung {PLACES.Handelsbezirk} gehen</Link><br />
                <Link to="/courtyard" className='mobileBtn'>Zum {PLACES.Vorplatz} schlendern</Link><br />
            </p>
            <p className='text-left'>
                <Link to="/tavern" className='mobileBtn'>Die {PLACES.Taverne} besuchen</Link><br />
                <Link to="/townhall" className='mobileBtn'>Das {PLACES.Rathaus} besichtigen</Link><br />
            </p>
            <p className='mb-1 text-left'>
                <Link to="/north-gate" className='mobileBtn'>Richtung {PLACES.Nordtor} gehen</Link><br />
            </p>
        </div>
    );
};

export default FountainNavi;
