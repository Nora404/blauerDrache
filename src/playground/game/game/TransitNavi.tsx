import { Link } from 'react-router-dom';
import Header from '../../../layout/Header/Header';
import { getPlaceLabelFromRoute } from '../../../routings/mappingPathToLabel';

type TransitNaviProps = {
    target: string,
    start: string,
    steps: string,
};

const TansitNavi: React.FC<TransitNaviProps> = ({ target, start, steps }) => {
    const currentPath = "/transit/" + target + "/" + start + "/" + steps;

    return (
        <div className='max-width'>
            <Header>Unterwegs</Header>
            <p className='mb-1 text-left'>
                Du bist auf dem Weg nach {getPlaceLabelFromRoute(target)}<br />
                Du lässt {getPlaceLabelFromRoute(start)} hinter dir<br />
                Deine Reise dauert {steps} Schritte<br />
            </p>
            <p className='text-left'>
                <Link to={currentPath}><b>Umgebung</b> untersuchen</Link><br />
            </p>
        </div>
    );
};

export default TansitNavi;