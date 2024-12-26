import { Link } from 'react-router-dom';
import Header from '../../../../layout/Header/Header';
import ColoredLetter from '../../../../utility/ColoredLetter';

type SouthWallNaviProps = {
};

const SouthWallNavi: React.FC<SouthWallNaviProps> = () => {

    return (
        <div>
            <Header>Südmauer</Header>
            <p className='text-left'>
                <Link to="/south-wall"><ColoredLetter>Umgebung</ColoredLetter> untersuchen</Link><br />
                <Link to="/courtyard">Zurück zum <ColoredLetter>Vorplatz</ColoredLetter> gehen</Link><br />
            </p>
        </div>
    );
};

export default SouthWallNavi;