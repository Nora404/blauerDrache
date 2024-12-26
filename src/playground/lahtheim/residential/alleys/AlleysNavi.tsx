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
                <Link to="/alleys">Mit <ColoredLetter>zwielichtiger Person</ColoredLetter> sprechen</Link><br />
                <Link to="/alleys">Den <ColoredLetter>Müll</ColoredLetter> durchsuchen</Link><br />
            </p>
            <p className='text-left'>
                <Link to="/alleys"><ColoredLetter>Umgebung</ColoredLetter> untersuchen</Link><br />
                <Link to="/residential">Zurück auf die <ColoredLetter>Straße</ColoredLetter> </Link><br />
            </p>
        </div>
    );
};

export default AlleysNavi;