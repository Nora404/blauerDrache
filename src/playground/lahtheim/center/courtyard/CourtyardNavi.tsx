import { Link } from 'react-router-dom';
import Header from '../../../../layout/Header/Header';
import { PLACES } from '../../../../data/colorfullStrings';
import Arrow from '../../../../utility/Arrow';
import { observer } from 'mobx-react-lite';
import { useRootStore } from '../../../../store';

type CourtyardNaviProps = {
};

const CourtyardNavi: React.FC<CourtyardNaviProps> = observer(() => {
    const { gameState } = useRootStore();

    const handleCloseMobilePop = () => {
        gameState.data.mobilePop = false;
    }

    return (
        <div>
            <Header>Vorplatz</Header>
            <p className='mb-1 text-left'>
                <Link to="/courtyard" className='mobileBtn' onClick={handleCloseMobilePop}><Arrow /><b>Umgebung</b> untersuchen</Link><br />
                <Link to="/church" className='mobileBtn'><Arrow type='s' />In die {PLACES.Kirche} gehen</Link><br />
                <Link to="/graveyard" className='mobileBtn'><Arrow type='sw' />Den {PLACES.Friedhof} besuchen</Link><br />
                <Link to="/south-wall" className='mobileBtn'><Arrow type='so' />Zur {PLACES.Südmauer} gehen</Link><br />
                <Link to="/fountain" className='mobileBtn'><Arrow type='n' />Richtung {PLACES.Brunnen} gehen</Link><br />
            </p>
        </div>
    );
});

export default CourtyardNavi;