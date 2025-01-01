import React from 'react';
import { useGameState } from '../../../../data/gameState';
import Header from '../../../../layout/Header/Header';
import RandomNpcTalking from '../../../../utility/RandomNpcTalking';
import { PLACES } from '../../../../data/colorfullStrings';

type FountainProps = {
};

const Fountain: React.FC<FountainProps> = () => {
  const gameState = useGameState();
  if (!gameState) return null;

  return (
    <div className='max-width'>
      <h2>Brunnen</h2>
      <p className='mb-1 text-left'>
        Du stehst auf einem großen gepflasterten Platz, in dessen Mitte ein sprudelnder Brunnen steht.
        {gameState.gameDay === "Tag"
          ? <> Im Wasser glitzert das Licht der Sonne. Viele Bewohner tummeln sich hier, unterhalten sich, streiten oder handeln. Obwohl es dafür eigentlich den {PLACES.Handelsbezirk} gibt. Du bist dir sicher das die ein oder andere Tuschelei nicht von den Wachen gehört werden sollte. Einige Bewohner klagen ihr Leid und suchen Hilfe am <b>Schwarzen Brett.</b></>
          : <> Im Dunkel der Nacht hörst du das sanfte Plätschern. Es ist kaum ein Bewohner zu sehen und wenn du einen erblickst, eilt dieser schnell zu einer der vielen Straßen die vom Platz aus abzweigen. Nur von der {PLACES.Taverne} aus scheint Licht und Lärm zu kommen. Ein Schatten lenkt dich ab, du bemerkst eine viel zu kleine flackernde Laterne unter dem die Silhouette des <b>Schwarzen Brettes</b> zu erkennen ist.</>
        }
      </p>

      <p className='mb-1 text-left'>
        Auf der anderen Seite des Platzes ist das {PLACES.Rathaus} zu erkennen. Dort wurden deine Anmeldedaten von dem geflügelten Wesen hingebracht. Dort kannst du deinen Namen weiter anpassen. Das bedeutet, du kannst ihn einfärben. Das wird echt teuer werden, wie alles was mit Bürokratie zu tun hat.
      </p>

      <Header>Echos der Gespräche</Header>

      <p className='mb-1 text-left'><RandomNpcTalking /></p>
      <p className='mb-1 text-left'><RandomNpcTalking /></p>
      <p className='mb-1 text-left'><RandomNpcTalking /></p>
      <p className='mb-1 text-left'><RandomNpcTalking /></p>
      <p className='mb-1 text-left'><RandomNpcTalking /></p>
    </div>
  );
};

export default Fountain;
