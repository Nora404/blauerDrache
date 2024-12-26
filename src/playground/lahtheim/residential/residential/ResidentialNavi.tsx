import { Link } from 'react-router-dom';
import Header from '../../../../layout/Header/Header';
import ColoredLetter from '../../../../utility/ColoredLetter';

type ResidentialNaviProps = {
};

const ResidentialNavi: React.FC<ResidentialNaviProps> = () => {
    return (
        <div>
            <Header>Wohnviertel</Header>
            <p className='mb-1 text-left'>
                <Link to="/house">Zum <ColoredLetter>Haus</ColoredLetter> gehen</Link><br />
                <Link to="/west-wall">Die <ColoredLetter>Westmauer</ColoredLetter> besichtigen</Link><br />
                <Link to="/alleys">In den <ColoredLetter>Gassen</ColoredLetter> umher schleichen</Link><br />
            </p>
            <p className='text-left'>
                <Link to="/residential"><ColoredLetter>Umgebung</ColoredLetter> untersuchen</Link><br />
                <Link to="/fountain">Zurück zum <ColoredLetter>Brunnen</ColoredLetter> gehen</Link><br />
            </p>
        </div>
    );
};

export default ResidentialNavi;