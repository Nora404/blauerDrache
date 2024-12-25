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
                <Link to="/north-gate">Richtung <ColoredLetter>Nordtor</ColoredLetter> gehen</Link><br />
                <Link to="/courtyard">Zum <ColoredLetter>Vorplatz</ColoredLetter> schlendern</Link><br />
            </p>
            <p className='text-left'>
                <Link to="/start"><ColoredLetter>Umgebung</ColoredLetter> untersuchen</Link><br/>
            </p>
        </div>
    );
};

export default FountainNavi;