import { Link } from 'react-router-dom';
import Header from '../../../../layout/Header/Header';
import ColoredLetter from '../../../../utility/ColoredLetter';

type HouseNaviProps = {
};

const HouseNavi: React.FC<HouseNaviProps> = () => {
    return (
        <div>
            <Header>Haus</Header>
            <p className='mb-1 text-left'>
                <Link to="/house">Im <ColoredLetter>Bett</ColoredLetter> schlafen <br />(+max Runden)</Link>
            </p>
            <p className='text-left'>
                <Link to="/house"><ColoredLetter>Raum</ColoredLetter> untersuchen</Link><br />
                <Link to="/residential"><ColoredLetter>Haus</ColoredLetter> verlassen</Link><br />
            </p>
        </div>
    );
};

export default HouseNavi;