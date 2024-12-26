import { Link } from 'react-router-dom';
import Header from '../../../../layout/Header/Header';
import ColoredLetter from '../../../../utility/ColoredLetter';

type TownHallNaviProps = {
};

const TownHallNavi: React.FC<TownHallNaviProps> = () => {

    return (
        <div>
            <Header>Rathaus</Header>
            <p className='mb-1 text-left'>
                <Link to="/townhall">Farbe des Namens <ColoredLetter>ändern</ColoredLetter></Link><br />
                <Link to="/townhall">Ein <ColoredLetter>Haus</ColoredLetter> kaufen</Link><br />
                <Link to="/townhall">Anmeldedaten <ColoredLetter>aktualisieren</ColoredLetter> </Link><br />
            </p>
            <p className='text-left'>
                <Link to="/townhall"><ColoredLetter>Raum</ColoredLetter> untersuchen</Link><br />
                <Link to="/fountain"><ColoredLetter>Rathaus</ColoredLetter> verlassen</Link><br />
            </p>
        </div>
    );
};

export default TownHallNavi;