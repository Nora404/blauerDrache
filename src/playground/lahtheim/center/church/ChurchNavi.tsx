import { Link } from 'react-router-dom';
import Header from '../../../../layout/Header/Header';
import { PLACES } from '../../../../data/colorfullStrings';
import Arrow from '../../../../utility/Arrow';
import { useRootStore } from '../../../../store';

type ChurchNaviProps = {
};

const ChurchNavi: React.FC<ChurchNaviProps> = (() => {
    const { gameState } = useRootStore();

    const handleCloseMobilePop = () => {
        gameState.data.mobilePop = false;
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
});

export default ChurchNavi;