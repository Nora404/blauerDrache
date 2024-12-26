import { Link } from 'react-router-dom';
import Header from '../../../../layout/Header/Header';
import ColoredLetter from '../../../../utility/ColoredLetter';

type GraveyardNaviProps = {
};

const GraveyardNavi: React.FC<GraveyardNaviProps> = () => {

    return (
        <div>
            <Header>Friedhof</Header>
            <p className='mb-1 text-left'>
                <Link to="/graveyard">Gegen <ColoredLetter>Zombies</ColoredLetter> Kämpfen<br />
                    (-1 Runde)</Link><br />
            </p>
            <p className='text-left'>
                <Link to="/graveyard"><ColoredLetter>Umgebung</ColoredLetter> untersuchen</Link><br />
                <Link to="/courtyard">Zurück zum <ColoredLetter>Vorplatz</ColoredLetter> gehen</Link><br />
            </p>
        </div>
    );
};

export default GraveyardNavi;