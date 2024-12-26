import { Link } from 'react-router-dom';
import Header from '../../../../layout/Header/Header';
import ColoredLetter from '../../../../utility/ColoredLetter';

type FountainNaviProps = {
};

const FountainNavi: React.FC<FountainNaviProps> = () => {

    return (
        <div>
            <Header>Brunnen</Header>
            <p className='mb-1 text-left'>
                <Link to="/residential">Das <ColoredLetter>Wohnviertel</ColoredLetter> besuchen</Link><br />
                <Link to="/trading-district">Richtung <ColoredLetter>Handelsbezirk</ColoredLetter> gehen</Link><br />
                <Link to="/courtyard">Zum <ColoredLetter>Vorplatz</ColoredLetter> schlendern</Link><br />
            </p>
            <p className='text-left'>
                <Link to="/tavern">Die <ColoredLetter>Taverne</ColoredLetter> besuchen</Link><br />
                <Link to="/townhall">Das <ColoredLetter>Rathaus</ColoredLetter> besichtigen</Link><br />
            </p>
            <p className='mb-1 text-left'>
                <Link to="/fountain"><ColoredLetter>Umgebung</ColoredLetter> untersuchen</Link><br />
                <Link to="/start">Richtung <ColoredLetter>Nordtor</ColoredLetter> gehen</Link><br />
            </p>
        </div>
    );
};

export default FountainNavi;