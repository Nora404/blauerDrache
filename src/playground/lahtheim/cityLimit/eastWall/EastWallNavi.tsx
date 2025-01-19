import { Link } from 'react-router-dom';
import Header from '../../../../layout/Header/Header';
import { PLACES } from '../../../../data/colorfullStrings';
import Arrow from '../../../../utility/Arrow';
import { observer } from 'mobx-react-lite';
import { useRootStore } from '../../../../store';

type EastWallNaviProps = {
};

const EastWallNavi: React.FC<EastWallNaviProps> = observer(() => {
    const { gameState } = useRootStore();

    const handleCloseMobilePop = () => {
        gameState.data.mobilePop = false;
    }

    return (
        <div>
            <Header>Ostmauer</Header>
            <p className='mb-1 text-left'>
                <Link to="/east-wall" className='mobileBtn' onClick={handleCloseMobilePop}><Arrow /><b>Umgebung</b> untersuchen</Link><br />
                <Link to="/trading-district" className='mobileBtn'><Arrow type='nw' />Zurück zum {PLACES.Handelsbezirk} gehen</Link><br />
            </p>
        </div>
    );
});

export default EastWallNavi;