import { Link } from 'react-router-dom';
import Header from '../../../../layout/Header/Header';
import { PLACES } from '../../../../data/colorfullStrings';
import Arrow from '../../../../utility/Arrow';
import { observer } from 'mobx-react-lite';
import { useRootStore } from '../../../../store';

type TradingDistrictNaviProps = {
};

const TradingDistrictNavi: React.FC<TradingDistrictNaviProps> = observer(() => {
    const { gameState } = useRootStore();

    const handleCloseMobilePop = () => {
        gameState.data.mobilePop = false;
    }

    return (
        <div>
            <Header>Handelsbezirk</Header>
            <p className='mb-1 text-left'>
                <Link to="/trading-district" className='mobileBtn' onClick={handleCloseMobilePop}><Arrow /><b>Umgebung</b> untersuchen</Link><br />
                <Link to="/general-shop" className='mobileBtn'><Arrow type='no' />Zum {PLACES.Krämer} gehen</Link><br />
                <Link to="/equipment-shop" className='mobileBtn'><Arrow type='o' />Den {PLACES.Ausrüstungsladen} besuchen</Link><br />
                <Link to="/weapon-shop" className='mobileBtn'><Arrow type='o' />Sich im {PLACES.Waffenladen} umsehen</Link><br />
                <Link to="/east-wall" className='mobileBtn'><Arrow type='so' />Die {PLACES.Ostmauer} besichtigen</Link><br />
                <Link to="/fountain" className='mobileBtn'><Arrow type='w' />Zurück zum {PLACES.Brunnen} gehen</Link><br />
            </p>
        </div>
    );
});

export default TradingDistrictNavi;