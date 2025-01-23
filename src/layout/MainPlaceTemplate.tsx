import React from "react";
import { observer } from "mobx-react-lite";
import { useRootStore } from "../store";
import { WeightedEvent } from "../data/eventData";
import ActionButton from "../layout/ActionButtons/ActionButton";
import { useLocationEvents } from "../utility/Hooks/LocationEvents";
import { GameEventChain } from "./GameEventChain";

type ButtonConfig = {
  label: string;
  onClick: () => void;
};

type MainPlaceTemplateProps = {
  title: React.ReactNode;

  dayDescription: React.ReactNode;
  dayButtons: ButtonConfig[];

  nightDescription?: React.ReactNode;
  nightButtons?: ButtonConfig[];

  possibleEvents?: WeightedEvent[];
  backPath?: string;
};

export const MainPlaceTemplate: React.FC<MainPlaceTemplateProps> = observer(
  ({
    title,
    dayDescription,
    dayButtons,
    nightDescription,
    nightButtons,
    possibleEvents = [],
    backPath = "/",
  }) => {
    const { gameTime } = useRootStore();
    const isDay = gameTime.data.gameDay === "Tag";

    // Wenn nightDescription bzw. nightButtons fehlen oder leer, fallback auf Tag
    const hasNightDescription = !!nightDescription;
    const hasNightButtons = !!nightButtons && nightButtons.length > 0;
    const canUseNachtInhalte = hasNightDescription && hasNightButtons;

    // Bestimmen, ob wir Nacht-Inhalte benutzen oder Tag fallback
    const showDayBlock = isDay || !canUseNachtInhalte;

    const {
      localRandomEvent,
      firstEvent,
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

        {/* Tag- vs. Nacht-Inhalte, mit Fallback */}
        {showDayBlock ? (
          <>
            {dayDescription}
            {dayButtons.map((btn, index) => (
              <ActionButton
                key={index}
                onClick={btn.onClick}
                label={btn.label}
              />
            ))}
          </>
        ) : (
          <>
            {nightDescription}
            {nightButtons?.map((btn, index) => (
              <ActionButton
                key={index}
                onClick={btn.onClick}
                label={btn.label}
              />
            ))}
          </>
        )}

        {/* Falls Events aktiv sind, rendert der Template dieselbe EventChain-Logik */}
        {(firstEvent || localRandomEvent) && (
          <GameEventChain
            initialEventName={initialEventName}
            onFinishChain={onFinishChainHandler}
          />
        )}
      </div>
    );
  }
);
