//#region [imports]
import React from 'react';
import { PLACES } from '../../../../data/colorfullStrings';
import ActionButton from '../../../../layout/ActionButtons/ActionButton';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { useRootStore } from '../../../../store';
//#endregion

//#region [prepare]
type FountainProps = {
};

const Fountain: React.FC<FountainProps> = observer(() => {
  const { gameTime } = useRootStore();
  const navigate = useNavigate();
  //#endregion

  //#region [handler]
  const handleBoard = () => {
    navigate("/fountain-board");
  }

  const handleDayPeople = () => {
    navigate("/fountain-people");
  }
  const handleDayWarrior = () => {
    navigate("/fountain-warrior");
  }

  const handleNightTreasure = () => {
    navigate("/fountain-treasure");
  }
  //#endregion

  //#region [jsx]
  return (
    <div className='max-width'>
      <h2>{PLACES.Brunnen}</h2>
      <p className='mb-1 text-left'>
        Du stehst auf einem großen gepflasterten Platz, in dessen Mitte ein sprudelnder Brunnen steht.
      </p>

      {gameTime.data.gameDay === "Tag" && (
        <>
          <p className='mb-1 text-left'>
            Im Wasser glitzert das Licht der Sonne. Viele Bewohner tummeln sich hier, unterhalten sich,
            streiten oder handeln. Obwohl es dafür eigentlich den {PLACES.Handelsbezirk} gibt.
            Du bist dir sicher das die ein oder andere Tuschelei nicht von den Wachen gehört werden sollte.
            Einige Bewohner klagen ihr Leid und suchen Hilfe am <b>Schwarzen Brett.</b><br /><br />
            Auf der anderen Seite des Platzes ist das {PLACES.Rathaus} zu erkennen.
            Dort wurden deine Anmeldedaten von dem geflügelten Wesen hingebracht.
            Dort kannst du unter anderem deinen Namen weiter anpassen. Das bedeutet, du kannst ihn einfärben.
            Das wird echt teuer werden, wie alles was mit Bürokratie zu tun hat.
          </p><br />

          <ActionButton onClick={handleBoard} label='Schwarzes Brett untersuchen' />
          <ActionButton onClick={handleDayPeople} label='Mit einem der Leute sprechen' />
          <ActionButton onClick={handleDayWarrior} label='Mit einem der Krieger sprechen' />
        </>
      )}

      {gameTime.data.gameDay === "Nacht" && (
        <>
          <p className='mb-1 text-left'>
            Im Dunkel der Nacht hörst du das sanfte Plätschern. Es ist kaum ein Bewohner zu sehen und wenn du einen erblickst,
            eilt dieser schnell zu einer der vielen Straßen die vom Platz aus abzweigen.
            Nur von der {PLACES.Taverne} aus scheint Licht und Lärm zu kommen.
            Ein Schatten lenkt dich ab, du bemerkst eine viel zu kleine flackernde Laterne
            unter dem die Silhouette des <b>Schwarzen Brettes</b> zu erkennen ist.<br /><br />
            Auf der anderen Seite des Platzes ist das {PLACES.Rathaus} zu erkennen.
            Dort wurden deine Anmeldedaten von dem geflügelten Wesen hingebracht.
            Dort kannst du unter anderem deinen Namen weiter anpassen. Das bedeutet, du kannst ihn einfärben.
            Das wird echt teuer werden, wie alles was mit Bürokratie zu tun hat.
          </p><br />

          <ActionButton onClick={handleBoard} label='Schwarzes Brett untersuchen' />
          <ActionButton onClick={handleNightTreasure} label='Nach verlorenen „Schätzen“ suchen' />
          <ActionButton onClick={handleDayPeople} label='Mit einem der Leute sprechen' />

        </>
      )}

    </div>
  );
  //#endregion
});

export default Fountain;
