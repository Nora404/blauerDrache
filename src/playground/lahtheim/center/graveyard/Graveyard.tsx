//#region [imports]
import React from 'react';
import { PLACES } from '../../../../data/colorfullStrings';
import ActionButton from '../../../../layout/ActionButtons/ActionButton';
import MultiColoredLetters from '../../../../utility/MultiColoredLetters';
import { greenColors } from '../../../../data/colorMappingData';
import { GradientText } from '../../../../utility/GradientText';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { useRootStore } from '../../../../store';
//#endregion

//#region [prepare]
type GraveyardProps = {
};

const Graveyard: React.FC<GraveyardProps> = observer(() => {
  const { gameTime } = useRootStore();
  const navigate = useNavigate();
  //#endregion

  //#region [handler]
  const handlePath = () => {
    navigate("/graveyard-path");
  }
  const handleTreasure = () => {
    navigate("/graveyard-treasure");
  }
  const handleHole = () => {
    navigate("/graveyard-hole");
  }
  const handleDayGrave = () => {
    navigate("/graveyard-dgrave");
  }

  const handleZombie = () => {
    navigate("/graveyard-zombie");
  }
  const handleNightGrave = () => {
    navigate("/graveyard-ngrave");
  }
  //#endregion

  //#region [jsx]
  return (
    <div className='max-width'>
      <h2>{PLACES.Friedhof}</h2>
      <p className='mb-1 text-left'>
        Du durchquerst den Rundbogen, der zum {PLACES.Friedhof} führt. Hohe Bäume mit dichten,
        tiefhängenden Kronen entlang der Mauer trennen dich vom {PLACES.Vorplatz} und lassen den {PLACES.Friedhof} wie eine eigene,
        abgeschiedene Welt wirken. Die Anordnung der Gräber und Wege erinnert dich an einen kleinen,
        geradlinigen Wald, der von der Zeit und der Natur gezeichnet ist.
      </p>

      {gameTime.data.gameDay === "Tag" && (
        <>
          <p className='mb-1 text-left'>
            Die schmalen Wege, kaum mehr als Trampelpfade, winden sich durch die friedliche Stille des Friedhofs
            und rahmen Inseln von <GradientText colors={['#aaaaaa']}>Gräbern</GradientText> ein. Viele davon sind schlicht – nur ein Stein
            oder ein verwittertes Holzkreuz markiert die Ruhestätte. Doch die
            <b><MultiColoredLetters colors={greenColors}> Natur</MultiColoredLetters></b> hat ihre eigenen Akzente hinzugefügt:
            Rankpflanzen klettern über die Kreuze, Wildgräser und Unkraut überwuchern die <GradientText colors={['#aaaaaa']}>Grabsteine</GradientText>.
            Seltsam sind die kleinen <GradientText colors={['#B57E43', '#8C6E34', '#B57E43']}>Löcher</GradientText> in der Erde, die zwischen den Gräbern zu sehen sind.
            Einige scheinen frisch, während andere so alt wirken, dass sie kaum noch zu erkennen sind.
            Zu klein für Särge, werfen sie Fragen auf, die du dir lieber nicht beantworten möchtest.
            Ein Rabe kräht zwischen den Ästen, sein Ruf hallt wie eine Mahnung durch die Stille.
            Kurz darauf hörst du das Rascheln von Blättern, gefolgt von einem dumpfen Laut, als wäre etwas zu Boden gefallen.
          </p><br />

          <ActionButton onClick={handlePath} label='Den Weg entlang gehen' />
          <ActionButton onClick={handleTreasure} label='Nach verlorenen „Schätzen“ suchen' />
          <ActionButton onClick={handleHole} label='Die Löcher genauer betrachten' />
          <ActionButton onClick={handleDayGrave} label='Die Gräber genauer betrachten' />
        </>
      )}

      {gameTime.data.gameDay === "Nacht" && (
        <>
          <p className='mb-1 text-left'>
            Der schmale Pfad vor dir scheint sich in der <GradientText colors={['#6E6596']}>Schwärze</GradientText> zu verlieren.
            Jeder Schritt kommt dir bedrohlich laut vor.
            Wie zur Bestätigung hörst du das Rascheln und Krätzen eines Raben im Dunkel.
            Doch da sind noch mehr Geräusche! Ein Knurren erhebt sich, tief und kehlig,
            gefolgt von einem seltsamen Schürfen, als würde etwas Schweres über den Boden gezogen.
            Du bleibst stehen, doch die Geräusche nähern sich weiter.
            Dann siehst du sie – <GradientText colors={['#C23134']}>schemenhafte, menschengroße Schatten</GradientText>,
            die sich langsam auf dich zu bewegen.
            Ihre Bewegungen wirken unnatürlich, fast gebrochen, und doch zielgerichtet.
            Die Luft um dich scheint schwerer zu werden, als hättest du einen unsichtbaren Schwellenpunkt überschritten.
          </p><br />

          <ActionButton onClick={handleZombie} label='Gegen Zombies kämpfen' />
          <ActionButton onClick={handleTreasure} label='Nach verlorenen „Schätzen“ suchen' />
          <ActionButton onClick={handleNightGrave} label='Versuchen Gräber zu plündern' />
        </>
      )}


    </div>
  );
  //#endregion
});

export default Graveyard;
