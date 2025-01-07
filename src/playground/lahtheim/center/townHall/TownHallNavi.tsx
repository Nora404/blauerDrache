import { Link } from 'react-router-dom';
import Header from '../../../../layout/Header/Header';
import { PLACES } from '../../../../data/colorfullStrings';

type TownHallNaviProps = {
};

const TownHallNavi: React.FC<TownHallNaviProps> = () => {

    return (
        <div>
            <Header>Rathaus</Header>
            <p className='mb-1 text-left'>
            </p>
            <p className='text-left'>
                <Link to="/townhall"><b>Halle</b> untersuchen</Link><br />
                <Link to="/fountain">Richtung {PLACES.Brunnen} verlassen</Link><br />
            </p>
        </div>
    );
};

export default TownHallNavi;