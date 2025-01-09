import { Link } from 'react-router-dom';
import Header from '../../../../layout/Header/Header';
import { PLACES } from '../../../../data/colorfullStrings';
import { useNewGameStore } from '../../../../store/newGameStore';
import Arrow from '../../../../utility/Arrow';

type ChurchNaviProps = {
};

const ChurchNavi: React.FC<ChurchNaviProps> = () => {
    const { store } = useNewGameStore();

    const handleCloseMobilePop = () => {
        store.gameState.mobilePop = false;
    }

    return (
        <div>
            <Header>Kirche</Header>
            <p className='mb-1 text-left'>
                <Link to="/church" className='mobileBtn' onClick={handleCloseMobilePop}><Arrow /><b>Umgebung</b> untersuchen</Link><br />
                <Link to="/courtyard" className='mobileBtn'><Arrow type='n' />Zurück zum {PLACES.Vorplatz} gehen</Link><br />
            </p>
        </div>
    );
};

export default ChurchNavi;