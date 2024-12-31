import { Link } from 'react-router-dom';
import Header from '../../../../layout/Header/Header';
import { PLACES } from '../../../../data/colorfullStrings';

type FountainNaviProps = {
};

const FountainNavi: React.FC<FountainNaviProps> = () => {

    return (
        <div>
            <Header>Brunnen</Header>
            <p className='mb-1 text-left'>
                <Link to="/residential">Das {PLACES.Wohnbezirk} besuchen</Link><br />
                <Link to="/trading-district">Richtung {PLACES.Handelsbezirk} gehen</Link><br />
                <Link to="/courtyard">Zum {PLACES.Vorplatz} schlendern</Link><br />
            </p>
            <p className='text-left'>
                <Link to="/tavern">Die {PLACES.Taverne} besuchen</Link><br />
                <Link to="/townhall">Das {PLACES.Rathaus} besichtigen</Link><br />
                <Link to="/fountain"><b>Schwarzes Brett</b> untersuchen</Link><br />
            </p>
            <p className='mb-1 text-left'>
                <Link to="/fountain"><b>Umgebung</b> untersuchen</Link><br />
                <Link to="/start">Richtung {PLACES.Nordtor} gehen</Link><br />
            </p>
        </div>
    );
};

export default FountainNavi;