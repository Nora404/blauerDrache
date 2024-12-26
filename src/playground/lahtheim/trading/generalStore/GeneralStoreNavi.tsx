import { Link } from 'react-router-dom';
import Header from '../../../../layout/Header/Header';
import ColoredLetter from '../../../../utility/ColoredLetter';

type GeneralStoreNaviProps = {
};

const GeneralStoreNavi: React.FC<GeneralStoreNaviProps> = () => {
    return (
        <div>
            <Header>Krämer</Header>
            <p className='mb-1 text-left'>
                <Link to="/general-shop">Das <ColoredLetter>Sortiment</ColoredLetter> betrachten</Link><br />
                <Link to="/general-shop">Mit dem <ColoredLetter>Verkäufer</ColoredLetter> sprechen</Link><br />
            </p>
            <p className='text-left'>
                <Link to="/general-shop"><ColoredLetter>Laden</ColoredLetter> untersuchen</Link><br />
                <Link to="/trading-district">Zurück zum <ColoredLetter>Handelsbezirk</ColoredLetter> gehen</Link><br />
            </p>
        </div>
    );
};

export default GeneralStoreNavi;