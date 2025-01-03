import { Link } from 'react-router-dom';
import Header from '../../../layout/Header/Header';
import ColoredLetter from '../../../utility/ColoredLetter';

type NavigationComponentNameProps = {
    target: string,
    start: string,
    steps: string,
};

const NavigationComponentName: React.FC<NavigationComponentNameProps> = ({ target, start, steps }) => {
    const currentPath = "/transit/" + target + start + steps;

    return (
        <div className='max-width'>
            <Header>Unterwegs</Header>
            <p className='mb-1 text-left'>
                Du bist auf dem Weg nach {target}<br />
                Du lässt {start} hinter dir<br />
                Deine Reise dauert {steps} Schritte<br />
            </p>
            <p className='text-left'>
                <Link to={currentPath}><ColoredLetter>Umgebung</ColoredLetter> untersuchen</Link><br />
            </p>
        </div>
    );
};

export default NavigationComponentName;