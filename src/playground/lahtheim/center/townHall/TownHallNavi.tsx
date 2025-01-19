import { Link } from 'react-router-dom';
import Header from '../../../../layout/Header/Header';
import { PLACES } from '../../../../data/colorfullStrings';
import Arrow from '../../../../utility/Arrow';
import { observer } from 'mobx-react-lite';
import { useRootStore } from '../../../../store';

type TownHallNaviProps = {
};

const TownHallNavi: React.FC<TownHallNaviProps> = observer(() => {
    const { gameState } = useRootStore();

    const handleCloseMobilePop = () => {
        gameState.data.mobilePop = false;
    }

    return (
        <div>
            <Header>Rathaus</Header>
            <p className='mb-1 text-left'>
                <Link to="/townhall" className='mobileBtn' onClick={handleCloseMobilePop}><Arrow /><b>Halle</b> untersuchen</Link><br />
                <Link to="/fountain" className='mobileBtn'><Arrow type='so' />Richtung {PLACES.Brunnen} verlassen</Link><br />
            </p>
        </div>
    );
});

export default TownHallNavi;