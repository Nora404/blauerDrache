//#region [imports]
import React from "react";
import { observer } from "mobx-react-lite";
import { useRootStore } from "../store";
import { WeightedEvent } from "../data/eventData";
import ActionButton from "../layout/ActionButtons/ActionButton";
import { useLocationEvents } from "../utility/Hooks/LocationEvents";
import { GameEventChain } from "./GameEventChain";
import Header from "./Header/Header";
//#endregion

//#region [prepare]
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


/**
 * @param title - Überschrift mit <hr> Linie
 * @param description (?) - Beschreibungstext
 * @param dayDescription - Beschreibung wenn Tag und Nacht wenn keine Nacht übergeben wird
 * @param dayButtons - Buttons wenn Tag und Nacht wenn keine Nacht übergeben wird
 * @param nightDescription (?) - Beschreibung wenn Nacht
 * @param nightButtons (?) - Buttons wenn Nacht
 * @param possibleEvents - Array von {eventId, probability, questId?, conditions?}
 * @param chanceOfAnyEvent - Wahrscheinlichkeit, dass ein Event stattfindet 0.1 = 10%
 * @param backPath - Pfad, zu dem zurückgegangen wird
 */
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
    //#endregion

    //#region [hook]
    const {
      localRandomEvent,
      firstEvent,
      questName,
      handleFinishEvent,
      handleFinishQuest,
    } = useLocationEvents(possibleEvents, backPath, chanceOfAnyEvent);
    //#endregion

    //#region [jsx]
    return (
      <div className="max-width">
        <h2>{title}</h2>
        <div className="mb-1">{description}</div>

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
//#endregion
