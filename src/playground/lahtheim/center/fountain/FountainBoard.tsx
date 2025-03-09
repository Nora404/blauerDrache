// #region [imports]
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PLACES } from '../../../../data/helper/colorfullStrings';
import { EventManager } from '../../../../layout/Events/EventManager';
import ActionButton from '../../../../layout/ActionButtons/ActionButton';
import MultiColoredLetters from '../../../../utility/Formatted/MultiColoredLetters';
import { blueColors, braunColors, greenColors, lilaColors, orangeColors, redColors, rosaColors, yellowColors } from '../../../../data/helper/colorMappingData';
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
                <button className='questbox paper'>
                    <MultiColoredLetters colors={greenColors}>Begegnung</MultiColoredLetters><br />
                    Finde die gesuchte Person und rede mit ihr</button>
                <button className='questbox paper' onClick={() => handleClick('item')}>
                    <MultiColoredLetters colors={orangeColors}>Besorgen</MultiColoredLetters><br />
                    Bestimmte Gegenstände müsen besorgt werden
                </button>
                <button className='questbox paper'>
                    <MultiColoredLetters colors={lilaColors}>Erkundung</MultiColoredLetters><br />
                    Ein bestimmter Ort muss erreicht werden</button>
                <button className='questbox paper'>
                    <MultiColoredLetters colors={blueColors}>Benutzten</MultiColoredLetters><br />
                    An einem bestimmten Ort muss etwas benutzt werden</button>
                <button className='questbox paper'>
                    <MultiColoredLetters colors={braunColors}>Besiegen</MultiColoredLetters><br />
                    Es gibt ein Kopfgeld auf bestimmte Gegner</button>
                <button className='questbox paper'>
                    <MultiColoredLetters colors={rosaColors}>Erfahrung</MultiColoredLetters><br />
                    Jemand sucht nach Personen mit Erfahrung</button>
                <button className='questbox paper'>
                    <MultiColoredLetters colors={yellowColors}>Verbessern</MultiColoredLetters><br />
                    Zeige das du dich verbessern und stärker werden kannst</button>
                <button className='questbox paper'>
                    <MultiColoredLetters colors={redColors}>Schalter</MultiColoredLetters><br />
                    Irgendetwas wird diese Welt verändern!</button>
            </p><br />

            <ActionButton onClick={() => handleClick('service')} label='Aufträge abgeben' bgColor='yellow' />
            <EventManager events={[]} backPath={'/fountain'} backBtn={true} />
        </div>
    );
    // #endregion
};

export default FountainBoard;