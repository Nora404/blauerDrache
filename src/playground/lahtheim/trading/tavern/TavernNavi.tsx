import { Link } from 'react-router-dom';
import Header from '../../../../layout/Header/Header';
import ColoredLetter from '../../../../utility/ColoredLetter';

type TavernNaviProps = {
};

const TavernNavi: React.FC<TavernNaviProps> = () => {
    return (
        <div>
            <Header>Taverne</Header>
            <p className='mb-1 text-left'>
                <Link to="/tavern">Mit dem <ColoredLetter>Wirt</ColoredLetter> sprechen</Link><br />
            </p>
            <p className='mb-1 text-left'>
                <Link to="/tavern">Ein <ColoredLetter>Bett</ColoredLetter> nehmen <br />(-50 Gold, + max Runden)</Link><br />
            </p>
            <p className='mb-1 text-left'>
                <Link to="/tavern">Eine <ColoredLetter>Mahlzeit</ColoredLetter> bestellen <br />(-15 Gold + 5 Runden)</Link><br />
            </p>
            <p className='mb-1 text-left'>
                <Link to="/tavern">Ein <ColoredLetter>Getränk</ColoredLetter> bestellen <br />(-5 Gold + 1 Runden)</Link><br />
            </p>
            <p className='text-left'>
                <Link to="/tavern"><ColoredLetter>Umgebung</ColoredLetter> untersuchen</Link><br />
                <Link to="/fountain"><ColoredLetter>Taverne</ColoredLetter> verlassen</Link><br />
            </p>
        </div>
    );
};

export default TavernNavi;