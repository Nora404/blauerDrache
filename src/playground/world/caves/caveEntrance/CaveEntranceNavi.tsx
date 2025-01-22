import { Link } from 'react-router-dom';
import Header from '../../../../layout/Header/Header';
import ColoredLetter from '../../../../utility/Formatted/ColoredLetter';

type CaveEntranceNaviProps = {
};

const CaveEntranceNavi: React.FC<CaveEntranceNaviProps> = () => {
    return (
        <div>
            <Header>Höhleneingang</Header>
            <p className='mb-1 text-left'>
                <Link to="/start">Richtung <ColoredLetter>...</ColoredLetter> gehen</Link><br />
                <Link to="/start">Dem <ColoredLetter>...</ColoredLetter> folgen</Link><br />
            </p>
            <p className='text-left'>
                <Link to="/start"><ColoredLetter>Umgebung</ColoredLetter> untersuchen</Link><br />
            </p>
        </div>
    );
};

export default CaveEntranceNavi;