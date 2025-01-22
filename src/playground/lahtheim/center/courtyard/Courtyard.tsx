//#region [imports]
import React from 'react';
import { PLACES, SYSTEM } from '../../../../data/helper/colorfullStrings';
import { GradientText } from '../../../../utility/Formatted/GradientText';
import MultiColoredLetters from '../../../../utility/Formatted/MultiColoredLetters';
import { lilaColors } from '../../../../data/helper/colorMappingData';
import ActionButton from '../../../../layout/ActionButtons/ActionButton';
import { useNavigate } from 'react-router-dom';
import Header from '../../../../layout/Header/Header';
import RandomNpcTalking from '../../../../utility/Random/RandomNpcTalking';
import { observer } from 'mobx-react-lite';
import { useRootStore } from '../../../../store';
//#endregion

//#region [prepare]
type CourtyardProps = {
};

const Courtyard: React.FC<CourtyardProps> = observer(() => {
  const { gameTime } = useRootStore();
  const navigate = useNavigate();
  //#endregion

  //#region [handler]
  const handleBench = () => {
    navigate("/courtyard-bench");
  }

  const handleDayStand = () => {
    navigate("/courtyard-stand");
  }
  const handleDayBard = () => {
    navigate("/courtyard-bard");
  }

  const handleNightTreasure = () => {
    navigate("/courtyard-treasure");
  }
  //#endregion

  //#region [jsx]
  return (
    <div className='max-width'>
      <h2>{PLACES.Vorplatz}</h2>
      <p className='mb-1 text-left'>
        Vom {PLACES.Brunnen} aus führt ein Weg zu einem weiten {PLACES.Vorplatz}, dessen gepflasterter Boden aus groben,
        grau-beigen Steinplatten besteht. Der Platz endet an breiten, abgetretenen Steinstufen,
        die zur imposanten Eingangstür der {PLACES.Kirche} von Lahtheim hochführen.
        Hohe Bäume säumen den Platz links und rechts, ihre dichten Kronen spenden angenehmen Schatten.
        Unter ihnen laden robuste Holzbänke zum Verweilen ein. Eine halbhohe Steinmauer umrahmt den Platz,
        durchbrochen von einem kunstvollen Rundbogen, der den Eingang zum angrenzenden {PLACES.Friedhof} markiert.
      </p>

      {gameTime.data.gameDay === "Tag" && (
        <>
          <p className='mb-1 text-left'>
            Wie auch beim {PLACES.Brunnen} ist es hier sehr belebt. Kinder spielen auf den breiten Stufen,
            während <GradientText>Straßenmusiker</GradientText> mit heiteren Melodien das Treiben untermalen.
            Aufgeregte Rufe hallen von <GradientText>kleinen Ständen</GradientText>,
            an denen Verkäufer ihre Ware anpreisen: bunte Steine, die {SYSTEM.Glück} versprechen sollen, und
            <MultiColoredLetters colors={lilaColors}> Talismane</MultiColoredLetters>,
            die angeblich böse Geister vertreiben. Neugierige Touristen schlendern von Stand zu Stand,
            während die Einheimischen in Ruhe auf den Bänken verweilen
          </p><br />

          <Header>Echos der Gespräche</Header>

          <p className='mb-1 text-left'><RandomNpcTalking /></p>
          <p className='mb-1 text-left'><RandomNpcTalking /></p>
          <p className='mb-1 text-left'><RandomNpcTalking /></p>
          <p className='mb-1 text-left'><RandomNpcTalking /></p>
          <p className='mb-1 text-left'><RandomNpcTalking /></p>

          <br />

          <ActionButton onClick={handleDayStand} label='Zu einem der Stände gehen' />
          <ActionButton onClick={handleNightTreasure} label='Nach verlorenen „Schätzen“ suchen' />
          <ActionButton onClick={handleBench} label='Auf eine Bank setzten' />
          <ActionButton onClick={handleDayBard} label='Dem Musiker zuhören' />
        </>
      )}


      {gameTime.data.gameDay === "Nacht" && (
        <>
          <p className='mb-1 text-left'>
            Die Straßenlaternen leuchten hell, als wollten sie dem <b><GradientText>Mond</GradientText></b> Konkurrenz machen.
            Doch ihr Licht reicht nicht bis zur Spitze des Kirchturms, der im Dunkel verschwindet.
            Schatten huschen über den {PLACES.Vorplatz} – vermutlich Katzen oder anderes Getier, auf der Suche nach Nahrung.
            Plötzlich hörst du ein seltsames Geräusch aus der Richtung des {PLACES.Friedhof}s.
            Es klingt wie ein Knarren, oder war es ein Flüstern? Du blickst zum Rundbogen, doch dahinter erkennst du nur
            eine undurchdringliche Schwärze. Selbst das Licht der Straßenlaternen wagt es nicht, diesen Ort zu betreten.
          </p><br />

          <ActionButton onClick={handleNightTreasure} label='Nach verlorenen „Schätzen“ suchen' />
          <ActionButton onClick={handleBench} label='Auf eine Bank setzten' />
        </>
      )}
    </div>
  );
  //#endregion
});

export default Courtyard;
