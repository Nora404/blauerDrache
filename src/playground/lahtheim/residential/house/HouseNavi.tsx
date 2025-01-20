import { Link } from 'react-router-dom';
import Header from '../../../../layout/Header/Header';
import { PLACES } from '../../../../data/helper/colorfullStrings';
import Arrow from '../../../../utility/Arrow';
import { observer } from 'mobx-react-lite';
import { useRootStore } from '../../../../store';

type HouseNaviProps = {
};

const HouseNavi: React.FC<HouseNaviProps> = observer(() => {
    const { gameState } = useRootStore();

    const handleCloseMobilePop = () => {
        gameState.data.mobilePop = false;
    }

    return (
        <div>
            <Header>Haus</Header>
            <p className='mb-1 text-left'>
                <Link to="/house" className='mobileBtn' onClick={handleCloseMobilePop}><Arrow /><b>Raum</b> untersuchen</Link><br />
                <Link to="/residential" className='mobileBtn'><Arrow type='s' />Zurück zum {PLACES.Wohnbezirk}</Link><br />
            </p>
        </div>
    );
});

export default HouseNavi;