// PlaceTemplate.tsx
import React from "react";
import { observer } from "mobx-react-lite";
import { WeightedEvent } from "../data/eventData";
import ActionButton from "../layout/ActionButtons/ActionButton";
import { useLocationEvents } from "../utility/Hooks/LocationEvents";
import { GameEventChain } from "./GameEventChain";

type PlaceTemplateProps = {
  title?: string;
  description?: React.ReactNode;
  backPath: string;
  possibleEvents: WeightedEvent[];
};

const PlaceTemplate: React.FC<PlaceTemplateProps> = observer(
  ({ title, description, backPath, possibleEvents }) => {
    const {
      localRandomEvent,
      firstEvent,
      handleBack,
      handleFinishLocalEvent,
      handleFinishQuestEvent,
    } = useLocationEvents(possibleEvents, backPath);

    const initialEventName = firstEvent || localRandomEvent || "";
    const onFinishChainHandler = firstEvent
      ? handleFinishQuestEvent
      : handleFinishLocalEvent;

    return (
      <div className="max-width">
        <h2>{title}</h2>
        <div>{description}</div>
        <br />
        {(firstEvent || localRandomEvent) && (
          <GameEventChain
            initialEventName={initialEventName}
            onFinishChain={onFinishChainHandler}
          />
        )}
        {!firstEvent && !localRandomEvent && (
          <ActionButton onClick={handleBack} label="Sich abwenden" />
        )}
      </div>
    );
  }
);

export default PlaceTemplate;

// EINBINDEN

// const possibleEvents: WeightedEvent[] = [
//     { eventId: "E001ThreeStoneTrigger", probability: 90, questId: "Q001ThreeStone" },
//     { eventId: "004Flower", probability: 10 },
//   ];

//   return (
//     <PlaceTemplate
//       title="Mit einem der Leute sprechen"
//       description="Endtäuschst stellst du fest..."
//       backPath="/fountain"
//       possibleEvents={possibleEvents}
//     />
//   );
// });
