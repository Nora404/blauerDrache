import React from 'react';
import { PLACES } from '../../../../data/colorfullStrings';
import ActionButton from '../../../../layout/ActionButton/ActionButton';
import { useNewGameStore } from '../../../../store/newGameStore';

type GraveyardProps = {
};

const Graveyard: React.FC<GraveyardProps> = () => {
  const { store } = useNewGameStore();

  return (
    <div className='max-width'>
      <h2>{PLACES.Friedhof}</h2>
      <p className='mb-1 text-left'>
        Du durchquerst den Rundbogen, der zum {PLACES.Friedhof} führt. Hohe Bäume mit dichten,
        tiefhängenden Kronen entlang der Mauer trennen dich vom {PLACES.Vorplatz} und lassen den {PLACES.Friedhof} wie eine eigene,
        abgeschiedene Welt wirken. Die Anordnung der Gräber und Wege erinnert dich an einen kleinen,
        geradlinigen Wald, der von der Zeit und der Natur gezeichnet ist.

        {store.gameTime.gameDay === "Tag" && (
          <>
            <p className='mb-1 text-left'>
              Die schmalen Wege, kaum mehr als Trampelpfade, winden sich durch die friedliche Stille des Friedhofs
              und rahmen Inseln von Gräbern ein. Viele davon sind schlicht – nur ein Stein
              oder ein verwittertes Holzkreuz markiert die Ruhestätte. Doch die Natur hat ihre eigenen Akzente hinzugefügt:
              Rankpflanzen klettern über die Kreuze, Wildgräser und Unkraut überwuchern die Grabsteine.
              Seltsam sind die kleinen Löcher in der Erde, die zwischen den Gräbern zu sehen sind.
              Einige scheinen frisch, während andere so alt wirken, dass sie kaum noch zu erkennen sind.
              Zu klein für Särge, werfen sie Fragen auf, die du dir lieber nicht beantworten möchtest.
              Ein Rabe kräht zwischen den Ästen, sein Ruf hallt wie eine Mahnung durch die Stille.
              Kurz darauf hörst du das Rascheln von Blättern, gefolgt von einem dumpfen Laut, als wäre etwas zu Boden gefallen.
            </p><br />

            <ActionButton>Den Weg entlang gehen</ActionButton>
            <ActionButton>Nach verlorenen „Schätzen“ suchen</ActionButton>
            <ActionButton>Die Löcher genauer betrachten</ActionButton>
            <ActionButton>Die Gräber genauer betrachten</ActionButton>
          </>
        )}

        {store.gameTime.gameDay === "Nacht" && (
          <>
            <p className='mb-1 text-left'>
              Der schmale Pfad vor dir scheint sich in der Schwärze zu verlieren. Jeder Schritt kommt dir bedrohlich laut vor.
              Wie zur Bestätigung hörst du das Rascheln und Krätzen eines Raben im Dunkel.
              Doch da sind noch mehr Geräusche! Ein Knurren erhebt sich, tief und kehlig,
              gefolgt von einem seltsamen Schürfen, als würde etwas Schweres über den Boden gezogen.
              Du bleibst stehen, doch die Geräusche nähern sich weiter.
              Dann siehst du sie – schemenhafte, menschengroße Schatten, die sich langsam auf dich zu bewegen.
              Ihre Bewegungen wirken unnatürlich, fast gebrochen, und doch zielgerichtet.
              Die Luft um dich scheint schwerer zu werden, als hättest du einen unsichtbaren Schwellenpunkt überschritten.
            </p><br />

            <ActionButton>Gegen Zombies Kämpfen</ActionButton>
            <ActionButton>Versuchen Gräber zu plündern</ActionButton>
          </>
        )}

      </p>
    </div>
  );
};

export default Graveyard;
