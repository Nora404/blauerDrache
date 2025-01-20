import React from 'react';
import { useNavigate } from 'react-router-dom';
import ActionButton from '../../../../layout/ActionButtons/ActionButton';
import NpcTalk from '../../../../utility/NpcTalk';
import MultiColoredLetters from '../../../../utility/MultiColoredLetters';
import { yellowColors } from '../../../../data/helper/colorMappingData';
import PlayerTalk from '../../../../utility/PlayerTalk';
import { CREATURE, PLACES } from '../../../../data/helper/colorfullStrings';
import { observer } from 'mobx-react-lite';
import { useRootStore } from '../../../../store';

type TownHallProps = {
};

const TownHall: React.FC<TownHallProps> = observer(() => {
  const { gameTime } = useRootStore();
  const navigate = useNavigate();

  const handleColor = () => {
    navigate("/townhall-color");
  }
  const handleHome = () => {
    navigate("/townhall-home");
  }
  const handleCalling = () => {
    navigate("/townhall-calling");
  }

  return (
    <div className='max-width'>
      <h2>{PLACES.Rathaus}</h2>
      <p className='mb-1 text-left'>
        Die großen schweren Türen öffnen sich träge, bis sie dir das innere vom Rathaus offenbaren.
        Dir fällt direkt der flauschige rote Teppich auf und die weißen verzierten Säulen,
        die sich in die Höhe schrauben. Dein Blick wandert hoch zum großen Kronleuchter in der Mitte.
      </p>

      {gameTime.data.gameDay === "Tag" && (
        <>
          <p className='mb-1 text-left'>
            Die gläsernen Kristalle des Kronleuchters brechen das Sonnenlicht, das durch die hohen Fenster am Ende der Halle strömt,
            und werfen tanzende <MultiColoredLetters colors={yellowColors}>Lichtpunkte</MultiColoredLetters> auf Wände und Boden. Du senkst den Blick und versuchst dich zu orientieren.
            Um dich herum herrscht geschäftiges Treiben: Unterschiedliche Wesen in allen Formen und Größen –
            von kleinen geflügelten Kreaturen bis hin zu langgliedrigen Schlangenwesen – laufen, fliegen
            oder kriechen quer durch die Halle. Manche verschwinden in seitlichen Gängen, andere hinter massiven Holztüren.
            In der Mitte thront ein kreisrunder Tresen, hinter dem kleine, pummelige, {CREATURE.geflügelteWesen} geschäftig
            Papiere sortieren und <b>Anfragen beantworten</b>. Eines dieser Wesen, das dir vage bekannt vorkommt,
            hebt den Blick, als du dich näherst.<br /><br />
            <NpcTalk name='geflügeltesWesen'>"Wie kann ich dir heute helfen?"</NpcTalk> fragt es freundlich mit einer piepsigen, aber erstaunlich klaren Stimme
          </p><br />

          <ActionButton onClick={handleColor} label='Namen mit Farben anpassen' />
          <ActionButton onClick={handleHome} label='Eigenes Haus kaufen' />
          <ActionButton onClick={handleCalling} label='Berufung ändern' />
        </>
      )}

      {gameTime.data.gameDay === "Nacht" && (
        <>
          <p className='mb-1 text-left'>
            Seine magischen kleinen Lichter tauchen die Halle in ein sanftes warmes Gelb.
            Vereinzelt schweben über den seitlichen Gängen und Türen kleinere flackernde Funken.
            Du gehst ein paar Schritte in den Raum hinein. Der Teppich schluckt alle Geräusche, es ist gespenstig still.
            In der Mitte der Halle erkennst du einen verwaisten kreisrunden Tresen.
            Vor ihm steht ein Schild dessen Lettern kaum zu lesen sind. Du versuchst die Schrift zu lesen.<br /><br />

            <PlayerTalk>„N-u-r T-a-g-s g-e-ö-f-f-n-e-t“</PlayerTalk>
          </p><br />
        </>
      )}


    </div>
  );
});

export default TownHall;
