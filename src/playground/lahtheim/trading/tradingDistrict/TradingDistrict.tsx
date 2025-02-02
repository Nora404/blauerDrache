// #region [imports]
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { WeightedEvent } from '../../../../data/eventData';
import { MainPlaceTemplate } from '../../../../layout/MainPlaceTemplate';
import { PLACES } from '../../../../data/helper/colorfullStrings';
import Talk from '../../../../utility/Formatted/Talk';
import { rainbowColors, yellowColors } from '../../../../data/helper/colorMappingData';
import MultiColoredLetters from '../../../../utility/Formatted/MultiColoredLetters';
// #endregion

// #region [prepare]
type TradingDistrictProps = {
};

const TradingDistrict: React.FC<TradingDistrictProps> = observer(() => {
    const navigate = useNavigate();

    const possibleEvents: WeightedEvent[] = [];

    const description = (
        <>
            <p className='mb-1 text-left'>
                Der gepflasterte Weg führt dich an der {PLACES.Taverne} von Lahtheim vorbei umrahmt von hohen Gebäuden. Vor einzelnen Läden hängen kunstvoll bemalte Schilder aus Metall oder Holz, die an geschmiedeten Halterungen befestigt sind. Am Ende der Straße führt eine breite Steintreppe hinauf in ein höher gelegenes Viertel. Links davon liegt ein offener Platz, dessen Bedeutung dir nicht sofort ersichtlich ist. Rechts steht ein <b><Talk color='green'>großer Baum</Talk></b> mit ausladenden Ästen. Sein dichtes Blattwerk raschelt leise, wenn Wind durch die Zweige fährt. Hinter dem breiten Stamm erkennst du einen Pfad der zum Mark führt.
            </p>
        </>
    );

    const dayDescription = (
        <p className='mb-1 text-left'>
            Der Platz ist voller Leben. Reihen von Marktständen stehen dicht an dicht, ihre Dächer mit <MultiColoredLetters colors={rainbowColors}>bunten Stoffen</MultiColoredLetters> überspannt. Rote und blaue Tücher hängen über den Ständen, dazwischen flattern kleinere Fahnen mit Mustern und Symbolen. Händler rufen laut ihre Waren aus, Stimmen vermischen sich zu einem ständigen Gemurmel.<br />

            Der Geruch von frisch gebackenem <Talk color='braun'>Brot</Talk>, gerösteten <Talk>Nüssen</Talk> und gebratenem <Talk color='orange'>Fleisch</Talk> liegt in der Luft. Gewürze duften kräftig aus offenstehenden Säcken, während ein Stand mit frischem Obst den süßen Duft reifer Früchte verströmt. Menschen drängen sich durch die Gassen zwischen den Ständen, feilschen mit den Händlern oder unterhalten sich in kleinen Gruppen.

            Einige Händler haben kleine Tische vor sich aufgestellt, auf denen sie ihre Waren zur Schau legen - fein gewebte Stoffe, kunstvoll geschnitzte Holzfiguren, glänzende Metallwaren.
        </p>
    );
    const dayButtons = [
        { label: 'Button Tag', onClick: () => navigate('/tradingdistrict') },
    ];

    const nightDescription = (
        <p className='mb-1 text-left'>
            Der Marktplatz liegt still. Die meisten Stände sind verlassen, ihre <MultiColoredLetters colors={rainbowColors}>bunten Stoffdächer</MultiColoredLetters> hängen schlaff herab. Einige Händler haben ihre Waren mit schweren Tüchern bedeckt, während andere ihre Stände bereits abgebaut haben.

            Vereinzelte Laternen werfen <MultiColoredLetters colors={yellowColors}>flackerndes Licht</MultiColoredLetters> auf das Pflaster. Die Schatten der leeren Marktstände sind lang und verzerren sich auf den Steinen. Ein gelegentlicher Windstoß lässt die verbliebenen Stoffbahnen leicht erzittern. Ab und zu sind leise Schritte zu hören – ein Nachtwächter, der langsam seine Runde dreht.

            Aus der entfernten {PLACES.Taverne} dringen noch schwach die Stimmen der Besucher, doch ansonsten ist es ruhig. Der Marktplatz ruht in der Dunkelheit, wartend auf den nächsten Morgen.
        </p>
    );
    const nightButtons = [
        { label: 'Button Nacht', onClick: () => navigate('/tradingdistrict') },
    ];
    //#endregion

    //#region [jsx]
    return (
        <div className='max-width'>
            <MainPlaceTemplate
                title={PLACES.Handelsbezirk}
                description={description}
                dayDescription={dayDescription}
                dayButtons={dayButtons}
                nightDescription={nightDescription}
                nightButtons={nightButtons}
                possibleEvents={possibleEvents}
            />
        </div>
    );
    //#endregion
});

export default TradingDistrict;