import { Link } from 'react-router-dom';
import Header from '../../../../layout/Header/Header';
import { PLACES } from '../../../../data/colorfullStrings';

type CourtyardNaviProps = {
};

const CourtyardNavi: React.FC<CourtyardNaviProps> = () => {

    return (
        <div>
            <Header>Vorplatz</Header>
            <p className='mb-1 text-left'>
                <Link to="/church">In die {PLACES.Kirche} gehen</Link><br />
                <Link to="/graveyard">Den {PLACES.Friedhof} besuchen</Link><br />
            </p>
            <p className='text-left'>
                <Link to="/courtyard"><b>Umgebung</b> untersuchen</Link><br />
                <Link to="/fountain">Richtung {PLACES.Brunnen} gehen</Link><br />
            </p>
        </div>
    );
};

export default CourtyardNavi;