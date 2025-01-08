import { Link } from 'react-router-dom';
import Header from '../../../../layout/Header/Header';
import { PLACES } from '../../../../data/colorfullStrings';
import { useNewGameStore } from '../../../../store/newGameStore';

type ResidentialNaviProps = {
};

const ResidentialNavi: React.FC<ResidentialNaviProps> = () => {
    const { store } = useNewGameStore();

    const handleCloseMobilePop = () => {
        store.gameState.mobilePop = false;
    }

    return (
        <div>
            <Header>Wohnviertel</Header>
            <p className='mb-1 text-left'>
                <Link to="/residential" className='mobileBtn' onClick={handleCloseMobilePop}><b>Umgebung</b> untersuchen</Link><br />
                <Link to="/house" className='mobileBtn'>Zum {PLACES.Haus} gehen</Link><br />
                <Link to="/west-wall" className='mobileBtn'>Die {PLACES.Westmauer} besichtigen</Link><br />
                <Link to="/alleys" className='mobileBtn'>In den {PLACES.Gassen} umher schleichen</Link><br />
                <Link to="/fountain" className='mobileBtn'>Zurück zum {PLACES.Brunnen} gehen</Link><br />
            </p>
        </div>
    );
};

export default ResidentialNavi;