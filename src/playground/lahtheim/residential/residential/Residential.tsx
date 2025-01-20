import React from 'react';
import { PLACES } from '../../../../data/helper/colorfullStrings';

type ResidentialProps = {
};

const Residential: React.FC<ResidentialProps> = () => {
    return (
        <div className='max-width'>
            <h2>{PLACES.Wohnbezirk}</h2>
            <p className='mb-1 text-left'>
                Hinter dem {PLACES.Rathaus} verändert sich die Stimmung der Stadt.
                Die gepflasterten Wege werden schmaler, die Häuser drängen sich
                enger zusammen. Hier gibt es keinen Handel, keinen Lärm von Marktständen
                oder eilige Schritte von Passanten. Die <b>Wohnhäuser</b> wirken schlicht,
                teils aus dunklem Holz, teils aus hellgrauem Mauerstein, mit kleinen,
                hoch liegenden Fenstern. Einzelne Türen sind farbig gestrichen, ein
                unerwarteter Farbklecks in der sonst zurückhaltenden Umgebung. Viele
                haben schräg abfallende Dächer, von denen Moose und Flechten zeugen,
                dass die Zeit hier langsamer vergeht.
            </p>
            <p className='mb-1 text-left'>
                Zwischen manchen Häusern sind die {PLACES.Gassen} so eng, dass kaum zwei Personen
                nebeneinander hindurchgehen könnten. In diesen schummrigen Durchgängen
                sammeln sich Schatten und der Geruch von feuchtem Stein und altem Holz.
                Die {PLACES.Gassen} winden sich wie ein Labyrinth durch die ganze Stadt, und ohne
                Orientierung ist es leicht, sich zu verirren.
            </p>
        </div>
    );
};

export default Residential;