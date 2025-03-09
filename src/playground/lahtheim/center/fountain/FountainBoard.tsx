// #region [imports]
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PLACES } from '../../../../data/helper/colorfullStrings';
import { EventManager } from '../../../../layout/Events/EventManager';
import ActionButton from '../../../../layout/ActionButtons/ActionButton';
// #endregion

// #region [prepare]
type FountainBoardProps = {
};

const FountainBoard: React.FC<FountainBoardProps> = () => {
    const navigate = useNavigate();
    // #endregion

    // #region [handler]
    const handleClick = (link: string) => {
        const goTo = '/fountain-board-' + link;
        navigate(goTo);;
    }
    // #endregion

    // #region [jsx]
    return (
        <div className='max-width'>
            <h2><b>Schwarzes Brett</b></h2>
            <p className='mb-1 text-left'>
                Du näherst dich dem <b>schwarzen Brett</b> der Stadt Lahtheim. Ein stabiles hölzernes Gerüst umrahmt ein Brett, auf dem mehrere Zettel befestigt sind. Die Bewohner nutzen es, um Aufträge zu vergeben, ohne sich mit der Bürokratie des {PLACES.Rathaus} herumschlagen zu müssen. Jeder kann einen Auftrag annehmen und erledigen.
                Am Fuß des <b>schwarzen Bretts</b> steht eine kleine Truhe, die auf dich irgendwie verführerisch einladend wirkt. Ein Schutzzauber verhindert jedoch die unbefugte Entnahme - Diebe haben hier keine Chance.
            </p>
            <p className='mb-1 text-left category-section'>
                <div className='questbox paper'><strong>Begegnung</strong><br />Finde die gesuchte Person und rede mit ihr</div>
                <button className='questbox paper' onClick={() => handleClick('item')}>
                    <strong>Besorgen</strong><br />Bestimmte Gegenstände müsen besorgt werden
                </button>
                <div className='questbox paper'><strong>Erkundung</strong><br />Ein bestimmter Ort muss erreicht werden</div>
                <div className='questbox paper'><strong>Benutzten</strong><br />An einem bestimmten Ort muss etwas benutzt werden</div>
                <div className='questbox paper'><strong>Besiegen</strong><br />Es gibt ein Kopfgeld auf bestimmte Gegner</div>
                <div className='questbox paper'><strong>Erfahrung</strong><br />Jemand sucht nach Personen mit Erfahrung</div>
                <div className='questbox paper'><strong>Verbessern</strong><br />Zeige das du dich verbessern und stärker werden kannst</div>
                <div className='questbox paper'><strong>Schalter</strong><br />Irgendetwas wird diese Welt verändern!</div>
            </p><br />

            <ActionButton onClick={() => handleClick('service')} label='Aufträge abgeben' bgColor='yellow' />
            <EventManager events={[]} backPath={'/fountain'} backBtn={true} />
        </div>
    );
    // #endregion
};

export default FountainBoard;