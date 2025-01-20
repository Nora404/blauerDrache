import { Link } from 'react-router-dom';
import Header from '../../../../layout/Header/Header';
import { PLACES } from '../../../../data/helper/colorfullStrings';
import Arrow from '../../../../utility/Arrow';
import { observer } from 'mobx-react-lite';
import { useRootStore } from '../../../../store';

type SouthWallNaviProps = {
};

const SouthWallNavi: React.FC<SouthWallNaviProps> = observer(() => {
    const { gameState } = useRootStore();

    const handleCloseMobilePop = () => {
        gameState.data.mobilePop = false;
    }

    return (
        <div>
            <Header>Südmauer</Header>
            <p className='mb-1 text-left'>
                <Link to="/south-wall" className='mobileBtn' onClick={handleCloseMobilePop}><Arrow /><b>Umgebung</b> untersuchen</Link><br />
                <Link to="/courtyard" className='mobileBtn'><Arrow type='nw' />Zurück zum {PLACES.Vorplatz} gehen</Link><br />
            </p>
        </div>
    );
});

export default SouthWallNavi;