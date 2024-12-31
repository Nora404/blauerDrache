import { Link } from 'react-router-dom';
import Header from '../../../../layout/Header/Header';
import ColoredLetter from '../../../../utility/ColoredLetter';

type EquipmentShopNaviProps = {
};

const EquipmentShopNavi: React.FC<EquipmentShopNaviProps> = () => {
    return (
        <div>
            <Header>Ausrüstungs Laden</Header>
            <p className='mb-1 text-left'>
                <Link to="/equipment-shop">Das <ColoredLetter>Sortiment</ColoredLetter> betrachten</Link><br />
                <Link to="/equipment-shop">Mit dem <ColoredLetter>Verkäufer</ColoredLetter> sprechen</Link><br />
            </p>
            <p className='text-left'>
                <Link to="/equipment-shop"><ColoredLetter>Laden</ColoredLetter> untersuchen</Link><br />
                <Link to="/trading-district">Zurück zum <ColoredLetter>Handelsbezirk</ColoredLetter> gehen</Link><br />
            </p>
        </div>
    );
};

export default EquipmentShopNavi;