import { Link } from 'react-router-dom';
import Header from '../../../../layout/Header/Header';
import ColoredLetter from '../../../../utility/ColoredLetter';

type TradingDistrictNaviProps = {
};

const TradingDistrictNavi: React.FC<TradingDistrictNaviProps> = () => {
    return (
        <div>
            <Header>Handelsbezirk</Header>
            <p className='mb-1 text-left'>
                <Link to="/general-shop">Zum <ColoredLetter>Krämer</ColoredLetter> gehen</Link><br />
                <Link to="/equipment-shop">Den Laden für <ColoredLetter>Ausrüstung</ColoredLetter> besuchen</Link><br />
                <Link to="/weapon-shop">Sich im <ColoredLetter>Waffen Laden</ColoredLetter> umsehen</Link><br />
                <Link to="/east-wall">Die <ColoredLetter>Ostmauer</ColoredLetter> besichtigen</Link><br />
            </p>
            <p className='text-left'>
                <Link to="/trading-district"><ColoredLetter>Umgebung</ColoredLetter> untersuchen</Link><br />
                <Link to="/fountain">Zurück zum <ColoredLetter>Brunnen</ColoredLetter> gehen</Link><br />
            </p>
        </div>
    );
};

export default TradingDistrictNavi;