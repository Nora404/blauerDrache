//#region [imports]
import React from "react";
import { NPC, PLACES } from "../../../../data/helper/colorfullStrings";
import MultiColoredLetters from "../../../../utility/Formatted/MultiColoredLetters";
import { yellowColors } from "../../../../data/helper/colorMappingData";
import { useNavigate } from "react-router-dom";
import Talk from "../../../../utility/Formatted/Talk";
import { WeightedEvent } from "../../../../data/eventData";
import { MainPlaceTemplate } from "../../../../layout/MainPlaceTemplate";
//#endregion

//#region [prepare]
const Church: React.FC = () => {
  const navigate = useNavigate();
  const possibleEvents: WeightedEvent[] = [];

  const dayDescription = (
    <>
      <p className="mb-1 text-left">
        Nach dem prächtigen {PLACES.Vorplatz} hattest du ein beeindruckendes
        Kircheninneres erwartet. Stattdessen empfängt dich eine beinahe
        schlichte Einrichtung, die dich kurz enttäuscht innehalten lässt. Das{" "}
        <MultiColoredLetters colors={yellowColors}>Licht</MultiColoredLetters>{" "}
        der hohen Fenster fällt nur spärlich bis auf den Boden, und weder
        magische Lichter noch brennende Kerzen erhellen den Raum. Reihenweise
        stehen die Holzbänke ausgerichtet auf ein Lesepult, das auf einem
        kleinen Podest thront. Dahinter ragt ein übergroßes, massives Holzkreuz
        empor, dunkel und ehrfurchtsvoll. Du machst einen Schritt vorwärts und
        spürst die Unebenheiten des Bodens - Staub und Dreck, die deine Schritte
        dämpfen. Auch die Holzbank direkt neben dir ist von einer dicken
        Staubschicht bedeckt, überzogen von feinen Spinnenweben. Hier hat wohl
        seit Jahren keine Predigt mehr stattgefunden. Gerade, als du dich zum
        Gehen wenden willst, hörst du eine leise, rauchige Stimme:
      </p>
      <p className="mb-1 text-left">
        <Talk color="dunkleGestalt">"Besuch?"</Talk> flüstert sie, so sanft, dass du
        nicht sicher bist, ob du dir das nur eingebildet hast.
        <Talk color="dunkleGestalt">
          "Es kommt nicht oft vor, dass dieses Haus Besuch bekommt."
        </Talk>
        Du drehst dich um, verwirrt, suchend nach dem Ursprung der Stimme. Dann,
        aus der Dunkelheit, tritt langsam eine {NPC.dunkleGestalt} hervor und
        spricht:{" "}
        <Talk color="dunkleGestalt">"Was kann ich für dich tun, mein Kind?"</Talk>
      </p>
    </>
  );

  const dayButtons = [
    { label: 'Mit dunkler Gestalt sprechen', onClick: () => navigate('/church-talk') },
    { label: 'Ein paar Gold der Kirche spenden', onClick: () => navigate('/church-donate') },
    { label: 'Zur Inneren Ruhe finden', onClick: () => navigate('/church-peace') },
  ];
  //#endregion

  //#region [jsx]
  return (
    <div className="max-width">
      <MainPlaceTemplate
        title={PLACES.Kirche}
        dayDescription={dayDescription}
        dayButtons={dayButtons}
        possibleEvents={possibleEvents}
      />
    </div>
  );
  //#endregion
};

export default Church;
