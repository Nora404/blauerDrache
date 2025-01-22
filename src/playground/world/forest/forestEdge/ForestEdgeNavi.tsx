import { Link } from 'react-router-dom';
import Header from '../../../../layout/Header/Header';
import ColoredLetter from '../../../../utility/Formatted/ColoredLetter';
import { PLACES } from '../../../../data/helper/colorfullStrings';

type ForestEdgeNaviProps = {
};

const ForestEdgeNavi: React.FC<ForestEdgeNaviProps> = () => {
    return (
        <div>
            <Header>Waldrand</Header>
            <p className='mb-1 text-left'>
                <Link to="/transit/forest/forest-edge/3">In den {PLACES.Wald} gehen</Link><br />
            </p>
            <p className='text-left'>
                <Link to="/forest-edge"><ColoredLetter>Umgebung</ColoredLetter> untersuchen</Link><br />
                <Link to="/transit/path/forest-edge/5">Zurück dem {PLACES.Weg} folgen</Link><br />
            </p>
        </div>
    );
};

export default ForestEdgeNavi;