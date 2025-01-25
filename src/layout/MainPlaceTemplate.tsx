import React from "react";
import { observer } from "mobx-react-lite";
import { useRootStore } from "../store";
import { WeightedEvent } from "../data/eventData";
import ActionButton from "../layout/ActionButtons/ActionButton";
import { useLocationEvents } from "../utility/Hooks/LocationEvents";
import { GameEventChain } from "./GameEventChain";
import Header from "./Header/Header";

type ButtonConfig = {
  label: string;
  onClick: () => void;
};

type MainPlaceTemplateProps = {
  title: React.ReactNode;
  description?: React.ReactNode;

  dayDescription: React.ReactNode;
  dayButtons: ButtonConfig[];

  nightDescription?: React.ReactNode;
  nightButtons?: ButtonConfig[];

  possibleEvents?: WeightedEvent[];
  chanceOfAnyEvent?: number;
  backPath?: string;
};

export const MainPlaceTemplate: React.FC<MainPlaceTemplateProps> = observer(
  ({
    title,
    description,
    dayDescription,
    dayButtons,
    nightDescription,
    nightButtons,
    possibleEvents = [],
    backPath = "/",
    chanceOfAnyEvent,
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
      questName,
      handleFinishEvent,
      handleFinishQuest,
    } = useLocationEvents(possibleEvents, backPath, chanceOfAnyEvent);

    return (
      <div className="max-width">
        <h2>{title}</h2>

        {description}

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

        {localRandomEvent && (
          <>
            <GameEventChain
              initialEventName={localRandomEvent}
              onFinishChain={handleFinishEvent}
            />
            <br />
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
