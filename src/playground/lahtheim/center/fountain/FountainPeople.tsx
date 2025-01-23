// FountainPeople.tsx
// #region [imports]
import React from "react";
import { WeightedEvent } from "../../../../data/eventData";
import { observer } from "mobx-react-lite";
import PlaceTemplate from "../../../../layout/PlaceTemplate";
import MultiColoredLetters from "../../../../utility/Formatted/MultiColoredLetters";
import { yellowColors } from "../../../../data/helper/colorMappingData";
// #endregion

// #region [prepare]
type FountainPeopleProps = {};

const FountainPeople: React.FC<FountainPeopleProps> = observer(() => {
  const possibleEvents: WeightedEvent[] = [
    {
      eventId: "E003FindStoneTrigger",
      probability: 90,
      questId: "Q003FindStone",
    },
    { eventId: "004Flower", probability: 50 },
  ];

  const description = (
    <>
      <p className="mb-1 text-left">
        Endtäuschst stellst du fest, dass die{" "}
        <MultiColoredLetters colors={yellowColors}>Autorin</MultiColoredLetters>{" "}
        der Texte hier noch keinen Inhalt hinzugefügt hat. Außer diese paar
        Wörter, aber das hilft dir auch nicht weiter.
      </p>
    </>
  );
  // #endregion

  // #region [jsx]
  return (
    <div className="max-width">
      <PlaceTemplate
        title="Mit einem der Leute sprechen"
        description={description}
        backPath="/fountain"
        possibleEvents={possibleEvents}
      />
    </div>
  );
  // #endregion
});

export default FountainPeople;
