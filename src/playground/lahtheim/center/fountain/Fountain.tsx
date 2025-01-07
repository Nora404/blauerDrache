//#region [imports]
import React from 'react';
import { PLACES } from '../../../../data/colorfullStrings';
import { useNewGameStore } from '../../../../store/newGameStore';
import ActionButton from '../../../../layout/ActionButton/ActionButton';
import { useNavigate } from 'react-router-dom';
//#endregion

//#region [prepare]
type FountainProps = {
};

const Fountain: React.FC<FountainProps> = () => {
  const { store } = useNewGameStore();
  const navigate = useNavigate();
  //#endregion

  //#region [handler]
  const handleBoard = () => {
    navigate("/fountain");
  }

  const handleDayPeople = () => {
    navigate("/fountain");
  }
  const handleDayWarrior = () => {
    navigate("/fountain");
  }

  const handleNightTreasure = () => {
    navigate("/fountain");
  }
  //#endregion

  //#region [jsx]
  return (
    <div className='max-width'>
      <h2>{PLACES.Brunnen}</h2>
      <p className='mb-1 text-left'>
        Du stehst auf einem großen gepflasterten Platz, in dessen Mitte ein sprudelnder Brunnen steht.
      </p>

      {store.gameTime.gameDay === "Tag" && (
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

          <ActionButton onClick={handleBoard}>Schwarzes Brett untersuchen</ActionButton>
          <ActionButton onClick={handleDayPeople}>Mit einem der Leute sprechen</ActionButton>
          <ActionButton onClick={handleDayWarrior}>Mit einem der Krieger sprechen</ActionButton>
        </>
      )}

      {store.gameTime.gameDay === "Nacht" && (
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

          <ActionButton onClick={handleBoard}>Schwarzes Brett untersuchen</ActionButton>
          <ActionButton onClick={handleNightTreasure}>Nach verlorenen „Schätzen“ suchen</ActionButton>
        </>
      )}

    </div>
  );
  //#endregion
};

export default Fountain;
