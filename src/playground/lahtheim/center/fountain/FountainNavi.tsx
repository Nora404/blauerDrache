import { Link } from 'react-router-dom';
import Header from '../../../../layout/Header/Header';
import { PLACES } from '../../../../data/helper/colorfullStrings';
import Arrow from '../../../../utility/Arrow';
import { observer } from 'mobx-react-lite';
import { useRootStore } from '../../../../store';

type FountainNaviProps = {
};

const FountainNavi: React.FC<FountainNaviProps> = observer(() => {
    const { gameState } = useRootStore();

    const handleCloseMobilePop = () => {
        gameState.data.mobilePop = false;
    }

    return (
        <div>
            <Header>Brunnen</Header>
            <p className='mb-1 text-left'>
                <Link to="/fountain" className='mobileBtn' onClick={handleCloseMobilePop}>
                    <Arrow /><b>Umgebung</b> untersuchen</Link><br />
                <Link to="/residential" className='mobileBtn'>
                    <Arrow type='w' />Das {PLACES.Wohnbezirk} besuchen</Link><br />
                <Link to="/trading-district" className='mobileBtn'>
                    <Arrow type='o' />Richtung {PLACES.Handelsbezirk} gehen</Link><br />
                <Link to="/courtyard" className='mobileBtn'>
                    <Arrow type='s' />Zum {PLACES.Vorplatz} schlendern</Link><br />
                <Link to="/tavern" className='mobileBtn'>
                    <Arrow type='no' />Die {PLACES.Taverne} besuchen</Link><br />
                <Link to="/townhall" className='mobileBtn'>
                    <Arrow type='nw' />Das {PLACES.Rathaus} besichtigen</Link><br />
                <Link to="/north-gate" className='mobileBtn'>
                    <Arrow type='n' />Richtung {PLACES.Nordtor} gehen</Link><br />
            </p>
        </div>
    );
});

export default FountainNavi;
