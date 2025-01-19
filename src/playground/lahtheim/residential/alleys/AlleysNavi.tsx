import { Link } from 'react-router-dom';
import Header from '../../../../layout/Header/Header';
import { PLACES } from '../../../../data/colorfullStrings';
import Arrow from '../../../../utility/Arrow';
import { observer } from 'mobx-react-lite';
import { useRootStore } from '../../../../store';

type AlleysNaviProps = {
};

const AlleysNavi: React.FC<AlleysNaviProps> = observer(() => {
    const { gameState } = useRootStore();

    const handleCloseMobilePop = () => {
        gameState.data.mobilePop = false;
    }

    return (
        <div>
            <Header>Gassen</Header>
            <p className='mb-1 text-left'>
                <Link to="/alleys" className='mobileBtn' onClick={handleCloseMobilePop}><Arrow /><b>Umgebung</b> untersuchen</Link><br />
                <Link to="/residential" className='mobileBtn'><Arrow type='n' />Zurück zum {PLACES.Wohnbezirk} </Link><br />
            </p>
        </div>
    );
});

export default AlleysNavi;