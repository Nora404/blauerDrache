import { Link } from 'react-router-dom';
import Header from '../../../../layout/Header/Header';
import { PLACES } from '../../../../data/colorfullStrings';

type GraveyardNaviProps = {
};

const GraveyardNavi: React.FC<GraveyardNaviProps> = () => {

    return (
        <div>
            <Header>Friedhof</Header>
            <p className='mb-1 text-left'>
            </p>
            <p className='text-left'>
                <Link to="/graveyard"><b>Umgebung</b> untersuchen</Link><br />
                <Link to="/courtyard">Zurück zum {PLACES.Vorplatz} gehen</Link><br />
            </p>
        </div>
    );
};

export default GraveyardNavi;