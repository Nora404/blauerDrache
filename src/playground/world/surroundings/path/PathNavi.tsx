import { Link } from 'react-router-dom';
import Header from '../../../../layout/Header/Header';
import { PLACES } from '../../../../data/helper/colorfullStrings';

type PathNaviProps = {
};

const PathNavi: React.FC<PathNaviProps> = () => {
    return (
        <div>
            <Header>Weg</Header>
            <p className='mb-1 text-left'>
                <Link to="/transit/forest-edge/path/5" state={{ from: location.pathname }}>Weiter Richtung {PLACES.Waldrand} gehen</Link><br />
            </p>
            <p className='text-left'>
                <Link to="/path"><b>Umgebung</b> untersuchen</Link><br />
                <Link to="/transit/north-gate/path/6">Zum {PLACES.Nordtor} zurück gehen</Link><br />
            </p>
        </div>
    );
};

export default PathNavi;