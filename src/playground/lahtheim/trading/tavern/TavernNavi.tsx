import { Link } from 'react-router-dom';
import Header from '../../../../layout/Header/Header';
import { PLACES } from '../../../../data/colorfullStrings';
import Arrow from '../../../../utility/Arrow';
import { observer } from 'mobx-react-lite';
import { useRootStore } from '../../../../store';

type TavernNaviProps = {
};

const TavernNavi: React.FC<TavernNaviProps> = observer(() => {
    const { gameState } = useRootStore();

    const handleCloseMobilePop = () => {
        gameState.data.mobilePop = false;
    }

    return (
        <div>
            <Header>Taverne</Header>
            <p className='mb-1 text-left'>
                <Link to="/tavern" className='mobileBtn' onClick={handleCloseMobilePop}><Arrow /><b>Raum</b> untersuchen</Link><br />
                <Link to="/fountain" className='mobileBtn'><Arrow type='sw' />Zurück zum {PLACES.Brunnen} gehen</Link><br />
            </p>
        </div>
    );
});

export default TavernNavi;