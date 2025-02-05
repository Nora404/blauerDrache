// PlaceTemplate.tsx
import React from "react";
import { observer } from "mobx-react-lite";
import { WeightedEvent } from "../data/eventData";
import ActionButton from "../layout/ActionButtons/ActionButton";
import { useLocationEvents } from "../utility/Hooks/LocationEvents";
import { GameEventChain } from "./GameEventChain";
import Header from "./Header/Header";

type ButtonConfig = {
  label: string;
  onClick?: () => void;
  startEvent?: string;
};

type PlaceTemplateProps = {
  title?: React.ReactNode;
  description?: React.ReactNode;
  buttons?: ButtonConfig[];
  noEventHappend?: React.ReactNode;
  chanceOfAnyEvent?: number;
  backPath: string;
  possibleEvents: WeightedEvent[];
};

const PlaceTemplate: React.FC<PlaceTemplateProps> = observer(
  ({
    title,
    description,
    buttons,
    backPath,
    possibleEvents,
    noEventHappend = "",
    chanceOfAnyEvent,
  }) => {
    const {
      localRandomEvent,
      firstEvent,
      questName,
      handleBack,
      handleFinishEvent,
      handleFinishQuest,
      handleForceEvent,
    } = useLocationEvents(possibleEvents, backPath, chanceOfAnyEvent);

    const handleClick = (btn: ButtonConfig) => {
      btn.onClick?.();
      if (btn.startEvent) {
        handleForceEvent(btn.startEvent);
      }
    };


    return (
      <div className="max-width">
        <h2>{title}</h2>
        <div className="mb-1">{description}</div>

        {!localRandomEvent && buttons && buttons?.length > 0 && (buttons.map((button) => (
          <ActionButton
            key={button.label}
            onClick={() => handleClick(button)}
            label={button.label}
          />
        )))}

        {localRandomEvent && (
          <>
            <GameEventChain
              initialEventName={localRandomEvent}
              onFinishChain={handleFinishEvent}
            />
            <br />
          </>
        )}
        {!localRandomEvent && (
          <>
            {noEventHappend}
            <ActionButton onClick={handleBack} label="Sich abwenden" />
            <br />
          </>
        )}
        {firstEvent && (
          <>
            <Header>Fertige Aufgaben</Header>
            <ActionButton
              onClick={handleFinishQuest}
              label={"Aufgabe (" + questName + ") abgeben"}
            />
          </>
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
