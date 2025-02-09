//#region [imports]
import React from "react";
import { GradientText } from "../../../../utility/Formatted/GradientText";
import { CREATURE, PLACES } from "../../../../data/helper/colorfullStrings";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { useRootStore } from "../../../../store";
import { WeightedEvent } from "../../../../data/eventData";
import { MainPlaceTemplate } from "../../../../layout/MainPlaceTemplate";
import Talk from "../../../../utility/Formatted/Talk";
//#endregion

//#region [prepare]
type NorthGateProps = {
  title?: string;
  onClick?: () => void;
};

const NorthGate: React.FC<NorthGateProps> = observer(() => {
  const { gameTime, gameState } = useRootStore();
  const navigate = useNavigate();

  const possibleEvents: WeightedEvent[] = [];

  const dayDescription = (
    <div className="text-left">
      <p className="mb-1">
        Du stehst vor den Toren von Lahtheim Es ist mitlerweile{" "}
        {gameTime.data.gameDay}, du spürst die
        {gameState.data.temperature}e Luft auf deinem Gesicht. Bevor du auch nur
        einen Schritt gehen kannst, kommt ein kleines{" "}
        <GradientText colors={["#CF388F", "#8839CF"]}>
          geflügeltes Wesen
        </GradientText>{" "}
        zu dir. Mit großen Augen schaut es erwartungsvoll zu dir hoch. Im
        nächsten Moment fängt es mit schriller Stimme an zu reden:
      </p>

      <p className="mb-1">
        <Talk color="geflügeltesWesen">
          „Willkommen in Lahtheim! Bist du hier, um vor den Bezwingern des{" "}
          {CREATURE.grünerDrache} zu fliehen? In unserem Dorf ist Platz für
          dich. Sei nett, dann darfst du vielleicht einmal den{" "}
          {CREATURE.blauerDrache} besuchen.“
        </Talk>
      </p>

      <p className="mb-1">
        Ohne auf deine Antwort zu warten dreht sich das{" "}
        <GradientText colors={["#CF388F", "#8839CF"]}>
          geflügelte Wesen
        </GradientText>{" "}
        um und flattert durch den Torbogen Richtung Brunnen davon.
      </p>
    </div>
  );
  const dayButtons = [
    {
      label: "Die Wachen um Hilfe bitten",
      onClick: () => navigate("/north-gate-guardian"),
    },
    {
      label: "Die Plakette des Erfolgs betrachten",
      onClick: () => navigate("/north-gate-plaque"),
    },
  ];
  //#endregion

  //#region [jsx]
  return (
    <div className="max-width">
      <MainPlaceTemplate
        title={PLACES.Nordtor}
        dayDescription={dayDescription}
        dayButtons={dayButtons}
        possibleEvents={possibleEvents}
      />
    </div>
  );
  //#endregion
});

export default NorthGate;
