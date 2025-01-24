//#region [imports]
import React from 'react';
import { PLACES, SYSTEM } from '../../../../data/helper/colorfullStrings';
import { GradientText } from '../../../../utility/Formatted/GradientText';
import MultiColoredLetters from '../../../../utility/Formatted/MultiColoredLetters';
import { lilaColors } from '../../../../data/helper/colorMappingData';
import { useNavigate } from 'react-router-dom';
import Header from '../../../../layout/Header/Header';
import RandomNpcTalking from '../../../../utility/Random/RandomNpcTalking';
import { observer } from 'mobx-react-lite';
import { useRootStore } from '../../../../store';
import { MainPlaceTemplate } from '../../../../layout/MainPlaceTemplate';
//#endregion

//#region [prepare]
type CourtyardProps = {
};

const Courtyard: React.FC<CourtyardProps> = observer(() => {
  const { gameTime } = useRootStore();
  const navigate = useNavigate();

  const description = (
    <p className='mb-1 text-left'>
      Vom {PLACES.Brunnen} aus führt ein Weg zu einem weiten {PLACES.Vorplatz}, dessen gepflasterter Boden aus groben, grau-beigen Steinplatten besteht. Der Platz endet an breiten, abgetretenen Steinstufen,
      die zur imposanten Eingangstür der {PLACES.Kirche} von Lahtheim hochführen. Hohe Bäume säumen den Platz links und rechts, ihre dichten Kronen spenden angenehmen Schatten. Unter ihnen laden robuste Holzbänke zum Verweilen ein. Eine halbhohe Steinmauer umrahmt den Platz, durchbrochen von einem kunstvollen Rundbogen, der den Eingang zum angrenzenden {PLACES.Friedhof} markiert.
    </p>
  );

  const dayDescription = (
    <p className='mb-1 text-left'>
      Wie auch beim {PLACES.Brunnen} ist es hier sehr belebt. Kinder spielen auf den breiten Stufen,
      während <GradientText>Straßenmusiker</GradientText> mit heiteren Melodien das Treiben untermalen.
      Aufgeregte Rufe hallen von <GradientText>kleinen Ständen</GradientText>, an denen Verkäufer ihre Ware anpreisen: bunte Steine, die {SYSTEM.Glück} versprechen sollen, und <MultiColoredLetters colors={lilaColors}> Talismane</MultiColoredLetters>, die angeblich böse Geister vertreiben. Neugierige Touristen schlendern von Stand zu Stand, während die Einheimischen in Ruhe auf den Bänken verweilen
    </p>
  );

  const dayButtons = [
    { label: 'Zu einem der Stände gehen', onClick: () => navigate('/courtyard-stand') },
    { label: 'Auf eine Bank setzen', onClick: () => navigate('/courtyard-bench') },
    { label: 'Dem Barde zuhören', onClick: () => navigate('/courtyard-bard') },
  ];

  const nightDescription = (
    <p className='mb-1 text-left'>
      Die Straßenlaternen leuchten hell, als wollten sie dem <b><GradientText>Mond</GradientText></b> Konkurrenz machen. Doch ihr Licht reicht nicht bis zur Spitze des Kirchturms, der im Dunkel verschwindet. Schatten huschen über den {PLACES.Vorplatz} – vermutlich Katzen oder anderes Getier, auf der Suche nach Nahrung. Plötzlich hörst du ein seltsames Geräusch aus der Richtung des {PLACES.Friedhof}s. Es klingt wie ein Knarren, oder war es ein Flüstern? Du blickst zum Rundbogen, doch dahinter erkennst du nur eine undurchdringliche Schwärze. Selbst das Licht der Straßenlaternen wagt es nicht, diesen Ort zu betreten.
    </p>
  );

  const nightButtons = [
    { label: 'Nach verlorenen „Schätzen“ suchen', onClick: () => navigate('/courtyard-treasure') },
    { label: 'Auf eine Bank setzen', onClick: () => navigate('/courtyard-bench') },
  ];
  //#endregion

  //#region [jsx]
  return (
    <div className='max-width'>
      <h2></h2>
      <MainPlaceTemplate
        title={PLACES.Vorplatz}
        description={description}
        dayDescription={dayDescription}
        dayButtons={dayButtons}
        nightDescription={nightDescription}
        nightButtons={nightButtons}
      />
      {gameTime.data.gameDay === "Tag" && (
        <>
          <br />

          <Header>Echos der Gespräche</Header>

          <p className='mb-1 text-left'><RandomNpcTalking /></p>
          <p className='mb-1 text-left'><RandomNpcTalking /></p>
          <p className='mb-1 text-left'><RandomNpcTalking /></p>
          <p className='mb-1 text-left'><RandomNpcTalking /></p>
          <p className='mb-1 text-left'><RandomNpcTalking /></p>
        </>
      )}
    </div>
  );
  //#endregion
});

export default Courtyard;
