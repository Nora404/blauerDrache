import { Link } from 'react-router-dom';
import Header from '../../../../layout/Header/Header';
import ColoredLetter from '../../../../utility/ColoredLetter';
import { PLACES } from '../../../../data/colorfullStrings';

type PathNaviProps = {
};

const PathNavi: React.FC<PathNaviProps> = () => {
    return (
        <div>
            <Header>Weg</Header>
            <p className='mb-1 text-left'>
                <Link to="/start">Richtung <ColoredLetter>...</ColoredLetter> gehen</Link><br />
            </p>
            <p className='text-left'>
                <Link to="/path"><b>Umgebung</b> untersuchen</Link><br />
                <Link to="/transit/start/Weg/Nordtor/6">Zum {PLACES.Nordtor} zurück gehen</Link><br />
            </p>
        </div>
    );
};

export default PathNavi;