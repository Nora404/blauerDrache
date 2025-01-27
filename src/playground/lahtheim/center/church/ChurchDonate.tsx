// #region [imports]
import React from "react";
import { WeightedEvent } from "../../../../data/eventData";
import { observer } from "mobx-react-lite";
import PlaceTemplate from "../../../../layout/PlaceTemplate";
import { NPC, SYSTEM } from "../../../../data/helper/colorfullStrings";
import Talk from "../../../../utility/Formatted/Talk";
// #endregion

// #region [prepare]
type ChurchDonateProps = {};

const ChurchDonate: React.FC<ChurchDonateProps> = observer(() => {
  const possibleEvents: WeightedEvent[] = [
    { eventId: "event018Donate", probability: 100 },
  ];

  const description = (
    <p className="mb-1 text-left">
      <Talk>„Ich sehe mich nur einmal um“</Talk>, murmelst du leise und setzt
      langsam einen Fuß nach vorne, den Blick fest auf die {NPC.dunkleGestalt}{" "}
      gerichtet. <Talk color="dunkleGestalt">„Mach das, mein Kind“</Talk>, sagt
      die {NPC.dunkleGestalt}, etwas lauter als zuvor, aber immer noch kaum mehr
      als ein Flüstern.{" "}
      <Talk color="dunkleGestalt">
        „Ich bin da, wann immer du mich brauchst.“
      </Talk>{" "}
      Du glaubst, ein Lächeln in seiner Stimme zu hören.
      <br />
      Als du dich weiter umschaust, bemerkst du eine kleine Nische in der Wand.
      Daneben steht ein schmaler Kerzenständer, in dem eine halb abgebrannte
      Kerze flackert. In der Nische, auf Hüfthöhe, befindet sich eine Schale.
      Darunter siehst du ein Schild mit der Aufschrift „Spenden“, eingeritzt in
      eine kleine, verrostete Metallplatte mit groben Buchstaben.
    </p>
  );

  // #endregion

  // #region [jsx]
  return (
    <div className="max-width">
      <PlaceTemplate
        title={<>Ein paar {SYSTEM.Gold} der Kirche spenden</>}
        description={description}
        backPath="/church"
        possibleEvents={possibleEvents}
        chanceOfAnyEvent={1}
      />
    </div>
  );
  // #endregion
});

export default ChurchDonate;
