import { Link } from 'react-router-dom';
import Header from '../../../../layout/Header/Header';
import { PLACES } from '../../../../data/colorfullStrings';
import Arrow from '../../../../utility/Arrow';
import { observer } from 'mobx-react-lite';
import { useRootStore } from '../../../../store';

type GeneralStoreNaviProps = {
};

const GeneralStoreNavi: React.FC<GeneralStoreNaviProps> = observer(() => {
    const { gameState } = useRootStore();

    const handleCloseMobilePop = () => {
        gameState.data.mobilePop = false;
    }

    return (
        <div>
            <Header>Krämer</Header>
            <p className='mb-1 text-left'>
                <Link to="/general-shop" className='mobileBtn' onClick={handleCloseMobilePop}><Arrow /><b>Laden</b> untersuchen</Link><br />
                <Link to="/trading-district" className='mobileBtn'><Arrow type='sw' />Zurück zum {PLACES.Handelsbezirk} gehen</Link><br />
            </p>
        </div>
    );
});

export default GeneralStoreNavi;