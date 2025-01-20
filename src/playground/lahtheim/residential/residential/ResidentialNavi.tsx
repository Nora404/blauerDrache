import { Link } from 'react-router-dom';
import Header from '../../../../layout/Header/Header';
import { PLACES } from '../../../../data/helper/colorfullStrings';
import Arrow from '../../../../utility/Arrow';
import { observer } from 'mobx-react-lite';
import { useRootStore } from '../../../../store';

type ResidentialNaviProps = {
};

const ResidentialNavi: React.FC<ResidentialNaviProps> = observer(() => {
    const { gameState } = useRootStore();

    const handleCloseMobilePop = () => {
        gameState.data.mobilePop = false;
    }

    return (
        <div>
            <Header>Wohnviertel</Header>
            <p className='mb-1 text-left'>
                <Link to="/residential" className='mobileBtn' onClick={handleCloseMobilePop}><Arrow /><b>Umgebung</b> untersuchen</Link><br />
                <Link to="/house" className='mobileBtn'><Arrow type='n' />Zum {PLACES.Haus} gehen</Link><br />
                <Link to="/west-wall" className='mobileBtn'><Arrow type='w' />Die {PLACES.Westmauer} besichtigen</Link><br />
                <Link to="/alleys" className='mobileBtn'><Arrow type='s' />In den {PLACES.Gassen} umher schleichen</Link><br />
                <Link to="/fountain" className='mobileBtn'><Arrow type='o' />Zurück zum {PLACES.Brunnen} gehen</Link><br />
            </p>
        </div>
    );
});

export default ResidentialNavi;