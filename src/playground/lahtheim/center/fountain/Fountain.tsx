//#region [imports]
import React from 'react';
import { PLACES } from '../../../../data/colorfullStrings';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { WeightedEvent } from '../../../../data/eventData';
import { MainPlaceTemplate } from '../../../../layout/MainPlaceTemplate';
//#endregion

//#region [prepare]
type FountainProps = {
};

const Fountain: React.FC<FountainProps> = observer(() => {
  const navigate = useNavigate();

  const possibleEvents: WeightedEvent[] = [];

  const dayDescription = (
    <p className='mb-1 text-left'>
      Im Wasser glitzert das Licht der Sonne. Viele Bewohner tummeln sich hier, unterhalten sich,
      streiten oder handeln. Obwohl es dafür eigentlich den {PLACES.Handelsbezirk} gibt.
      Du bist dir sicher das die ein oder andere Tuschelei nicht von den Wachen gehört werden sollte.
      Einige Bewohner klagen ihr Leid und suchen Hilfe am <b>Schwarzen Brett.</b><br /><br />
      Auf der anderen Seite des Platzes ist das {PLACES.Rathaus} zu erkennen.
      Dort wurden deine Anmeldedaten von dem geflügelten Wesen hingebracht.
      Dort kannst du unter anderem deinen Namen weiter anpassen. Das bedeutet, du kannst ihn einfärben.
      Das wird echt teuer werden, wie alles was mit Bürokratie zu tun hat.
    </p>
  );
  const dayButtons = [
    { label: 'Schwarzes Brett untersuchen', onClick: () => navigate('/fountain-board') },
    { label: 'Mit einem der Leute sprechen', onClick: () => navigate('/fountain-people') },
    { label: 'Mit einem der Krieger sprechen', onClick: () => navigate('/fountain-warrior') },
  ];

  const nightDescription = (
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
    </p>
  );
  const nightButtons = [
    { label: 'Schwarzes Brett untersuchen', onClick: () => navigate('/fountain-board') },
    { label: 'Nach verlorenen Schätzen suchen', onClick: () => navigate('/fountain-treasure') },
    { label: 'Mit einem der Leute sprechen', onClick: () => navigate('/fountain-people') },
  ];
  //#endregion

  //#region [jsx]
  return (
    <div className='max-width'>
      <MainPlaceTemplate
        title={PLACES.Brunnen}
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

export default Fountain;
