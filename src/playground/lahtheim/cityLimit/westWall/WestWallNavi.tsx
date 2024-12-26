import { Link } from 'react-router-dom';
import Header from '../../../../layout/Header/Header';
import ColoredLetter from '../../../../utility/ColoredLetter';

type WestWallNaviProps = {
};

const WestWallNavi: React.FC<WestWallNaviProps> = () => {

    return (
        <div>
            <Header>Westmauer</Header>
            <p className='text-left'>
                <Link to="/west-wall"><ColoredLetter>Umgebung</ColoredLetter> untersuchen</Link><br />
                <Link to="/residential">Zurück zum <ColoredLetter>Wohnviertel</ColoredLetter> gehen</Link><br />
            </p>
        </div>
    );
};

export default WestWallNavi;