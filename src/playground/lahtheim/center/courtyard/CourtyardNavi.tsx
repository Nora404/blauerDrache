import { Link } from 'react-router-dom';
import Header from '../../../../layout/Header/Header';
import ColoredLetter from '../../../../utility/ColoredLetter';

type CourtyardNaviProps = {
};

const CourtyardNavi: React.FC<CourtyardNaviProps> = () => {

    return (
        <div>
            <Header>Vorplatz</Header>
            <p className='mb-1 text-left'>
                <Link to="/fountain">Richtung <ColoredLetter>Brunnen</ColoredLetter> gehen</Link><br />
                <Link to="/graveyard">Den <ColoredLetter>Friedhof</ColoredLetter> besuchen</Link><br />
                <Link to="/church">In die <ColoredLetter>Kirche</ColoredLetter> gehen</Link><br />
            </p>
            <p className='text-left'>
                <Link to="/courtyard"><ColoredLetter>Umgebung</ColoredLetter> untersuchen</Link><br />
            </p>
        </div>
    );
};

export default CourtyardNavi;