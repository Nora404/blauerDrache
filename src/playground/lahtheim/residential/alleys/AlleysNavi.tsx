import { Link } from 'react-router-dom';
import Header from '../../../../layout/Header/Header';
import ColoredLetter from '../../../../utility/ColoredLetter';

type AlleysNaviProps = {
};

const AlleysNavi: React.FC<AlleysNaviProps> = () => {
    return (
        <div>
            <Header>Gassen</Header>
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

export default AlleysNavi;