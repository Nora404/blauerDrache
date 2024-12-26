import { Link } from 'react-router-dom';
import Header from '../../../../layout/Header/Header';
import ColoredLetter from '../../../../utility/ColoredLetter';

type EastWallNaviProps = {
};

const EastWallNavi: React.FC<EastWallNaviProps> = () => {

    return (
        <div>
            <Header>Ostmauer</Header>
            <p className='text-left'>
                <Link to="/east-wall"><ColoredLetter>Umgebung</ColoredLetter> untersuchen</Link><br />
                <Link to="/trading-district">Zurück zum <ColoredLetter>Handelsbezirk</ColoredLetter> gehen</Link><br />
            </p>
        </div>
    );
};

export default EastWallNavi;