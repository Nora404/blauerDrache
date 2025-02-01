//#region [imports]
import React, { useState } from "react";
import { GameAction, GameEvent } from "../data/eventData";
import { parseDescription } from "../utility/Helper/ParseTextToJSX";
import {
  pickRandomNextEvent,
  getGameEventById,
  checkAllConditions,
} from "../utility/Helper/TriggerEvent";
import { useApplyGameAction } from "../utility/Hooks/ApplyGameAction";
import ActionButton from "./ActionButtons/ActionButton";
import HeaderSmall from "./Header/HeaderSmall";
import { useRootStore } from "../store";

//#endregion

//#region [prepare]
type ChainItem = {
  eventId: string;
  outcomeMessage: React.ReactNode;
};

type GameEventChainProps = {
  initialEventName: string;
  onFinishChain: () => void;
};

export const GameEventChain: React.FC<GameEventChainProps> = ({
  initialEventName,
  onFinishChain,
}) => {
  const { applyGameAction } = useApplyGameAction();
  const [eventsChain, setEventsChain] = useState<ChainItem[]>([
    { eventId: initialEventName, outcomeMessage: null },
  ]);

  // Hole dir die relevanten Daten aus deinem Store
  const {
    gameTime,
    gameState,
    playerStats,
    playerBase,
    playerFlux,
    playerMeta,
    playerEconomy,
    // playerQuest, falls du die Quest-Daten brauchst
  } = useRootStore();
  //#endregion

  //#region [handler]
  const handleButtonClick = (
    chainIndex: number,
    getAction: () => GameAction
  ) => {
    const action = getAction();
    applyGameAction(action);

    const newMessage = action.message ?? null;
    let nextEventId: string | null = null;

    if (action.nextEvents && action.nextEvents.length > 0) {
      // Mehrere mögliche Nachfolger => Weighted Random auswählen
      nextEventId = pickRandomNextEvent(action.nextEvents);
    } else if (action.nextEvents) {
      // Nur ein einziger Nachfolger => Direkt übernehmen
      nextEventId = action.nextEvents[0].eventId;
    }

    setEventsChain((prevChain) => {
      const updated = [...prevChain];
      const msg = parseDescription(newMessage ?? "");
      updated[chainIndex] = {
        ...updated[chainIndex],
        outcomeMessage: msg,
      };

      if (nextEventId) {
        updated.push({
          eventId: nextEventId,
          outcomeMessage: null,
        });
      }
      return updated;
    });
  };
  //#endregion

  //#region [jsx]
  return (
    <div className="max-width">
      {eventsChain.map((chainItem, idx) => {
        const event: GameEvent | undefined = getGameEventById(
          chainItem.eventId
        );
        if (!event) {
          return <p key={idx}>Unbekanntes Event: {chainItem.eventId}</p>;
        }

        const description = parseDescription(event.description ?? "");
        const { outcomeMessage } = chainItem;

        // 1) Buttons mit gültigen Conditions filtern
        const validButtons = event.buttons.filter((btn) => {
          return checkAllConditions(
            btn.conditions,
            gameTime.data,
            gameState.data,
            playerStats.data,
            playerBase.data,
            playerFlux.data,
            playerMeta.data,
            playerEconomy.data
          );
        });

        return (
          <div key={idx}>
            {event.label && <HeaderSmall>{event.label}</HeaderSmall>}
            {description && <p className="mb-1 text-left">{description}</p>}

            {outcomeMessage ? (
              <p className="mb-1 text-left" style={{ color: "#aaffff" }}>
                {outcomeMessage}
              </p>
            ) : (
              validButtons.map((btn) => (
                <ActionButton
                  onClick={() => handleButtonClick(idx, btn.getAction)}
                  label={btn.label}
                  key={btn.label}
                  result={btn.result}
                />
              ))
            )}
          </div>
        );
      })}

      <ActionButton onClick={onFinishChain} label="Sich abwenden" />
    </div>
  );
};
//#endregion
