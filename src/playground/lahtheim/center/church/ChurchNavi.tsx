import { Link } from 'react-router-dom';
import Header from '../../../../layout/Header/Header';
import ColoredLetter from '../../../../utility/ColoredLetter';
import { PLACES } from '../../../../data/colorfullStrings';

type ChurchNaviProps = {
};

const ChurchNavi: React.FC<ChurchNaviProps> = () => {

    return (
        <div>
            <Header>Kirche</Header>
            <p className='mb-1 text-left'>
            </p>
            <p className='text-left'>
                <Link to="/church"><b>Umgebung</b> untersuchen</Link><br />
                <Link to="/courtyard">Zurück zum {PLACES.Vorplatz} gehen</Link><br />
            </p>
        </div>
    );
};

export default ChurchNavi;