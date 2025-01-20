import { Link } from 'react-router-dom';
import Header from '../../../../layout/Header/Header';
import ColoredLetter from '../../../../utility/ColoredLetter';
import { PLACES } from '../../../../data/helper/colorfullStrings';

type ForestNaviProps = {
};

const ForestNavi: React.FC<ForestNaviProps> = () => {
    return (
        <div>
            <Header>Wald</Header>
            <p className='mb-1 text-left'>
                <Link to="/forest">Richtung <ColoredLetter>...</ColoredLetter> gehen</Link><br />
            </p>
            <p className='text-left'>
                <Link to="/forest"><ColoredLetter>Umgebung</ColoredLetter> untersuchen</Link><br />
                <Link to="/transit/forest-edge/forest/3">Zum {PLACES.Waldrand}, den Wald verlassen</Link><br />
            </p>
        </div>
    );
};

export default ForestNavi;