//#region [imports]
import React from 'react';
import NpcTalk from '../../../../utility/NpcTalk';
import { PLACES } from '../../../../data/colorfullStrings';
import MultiColoredLetters from '../../../../utility/MultiColoredLetters';
import { yellowColors } from '../../../../data/colorMappingData';
import ActionButton from '../../../../layout/ActionButton/ActionButton';
import { useNavigate } from 'react-router-dom';
//#endregion

//#region [prepare]
type ChurchProps = {
};

const Church: React.FC<ChurchProps> = () => {
  const navigate = useNavigate();
  //#endregion

  //#region [handler]
  const handleTalk = () => {
    navigate("/church");
  }
  const handleDonate = () => {
    navigate("/church");
  }
  const handlePeace = () => {
    navigate("/church");
  }
  //#endregion

  //#region [jsx]
  return (
    <div className='max-width'>
      <h2>{PLACES.Kirche}</h2>
      <p className='mb-1 text-left'>
        Nach dem prächtigen {PLACES.Vorplatz} hattest du ein beeindruckendes Kircheninneres erwartet.
        Stattdessen empfängt dich eine beinahe schlichte Einrichtung, die dich kurz enttäuscht innehalten lässt.
        Das <MultiColoredLetters colors={yellowColors}>Licht</MultiColoredLetters> der hohen Fenster fällt nur spärlich bis auf den Boden, und weder magische Lichter
        noch brennende Kerzen erhellen den Raum.
        Reihenweise stehen die Holzbänke ausgerichtet auf ein Lesepult, das auf einem kleinen Podest thront.
        Dahinter ragt ein übergroßes, massives Holzkreuz empor, dunkel und ehrfurchtsvoll.
        Du machst einen Schritt vorwärts und spürst die Unebenheiten des Bodens – Staub und Dreck,
        die deine Schritte dämpfen. Auch die Holzbank direkt neben dir ist von einer dicken Staubschicht bedeckt,
        überzogen von feinen Spinnenweben. Hier hat wohl seit Jahren keine Predigt mehr stattgefunden.
        Gerade, als du dich zum Gehen wenden willst, hörst du eine leise, rauchige Stimme:
      </p>

      <p className='mb-1 text-left'>
        <NpcTalk color='#878740'>"Besuch?"</NpcTalk> flüstert sie, so sanft, dass du nicht sicher bist,
        ob du dir das nur eingebildet hast.
        <NpcTalk color='#878740'>"Es kommt nicht oft vor, dass dieses Haus Besuch bekommt."</NpcTalk>
        Du drehst dich um, verwirrt, suchend nach dem Ursprung der Stimme. Dann, aus der Dunkelheit,
        tritt langsam eine Gestalt hervor und spricht: <NpcTalk color='#878740'>"Was kann ich für dich tun, mein Kind?"</NpcTalk>
      </p><br />

      <ActionButton onClick={handleTalk}>Mit dunkler Gestalt sprechen</ActionButton> {/*(als geistlicher gibt es mehr)*/}
      <ActionButton onClick={handleDonate}>Etwas der Kirche spenden</ActionButton> {/*(Buff: Fromm)*/}
      <ActionButton onClick={handlePeace}>Inneren Frieden suchen</ActionButton> {/*(Stimmung ändern)*/}
    </div>
  );
  //#endregion
};

export default Church;
