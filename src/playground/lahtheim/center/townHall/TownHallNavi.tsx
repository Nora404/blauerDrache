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
                <Link to="/start">Richtung <ColoredLetter>...</ColoredLetter> gehen</Link><br />
                <Link to="/start">Dem <ColoredLetter>...</ColoredLetter> folgen</Link><br />
            </p>
            <p className='text-left'>
                <Link to="/start"><ColoredLetter>Umgebung</ColoredLetter> untersuchen</Link><br/>
            </p>
        </div>
    );
};

export default TownHallNavi;