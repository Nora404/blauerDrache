//#region [imports]
import React, { useState } from "react";
import { GameAction } from "../data/eventData";
import { blueColors } from "../data/helper/colorMappingData";
import MultiColoredLetters from "../utility/Formatted/MultiColoredLetters";
import { parseDescription } from "../utility/Helper/ParseTextToJSX";
import {
  pickRandomNextEvent,
  getGameEventById,
} from "../utility/Helper/TriggerEvent";
import { useApplyGameAction } from "../utility/Hooks/ApplyGameAction";
import ActionButton from "./ActionButtons/ActionButton";
import HeaderSmall from "./Header/HeaderSmall";

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
        const event = getGameEventById(chainItem.eventId);
        const description = parseDescription(event?.description ?? "");
        if (!event) {
          return <p key={idx}>Unbekanntes Event: {chainItem.eventId}</p>;
        }

        const { outcomeMessage } = chainItem;

        return (
          <div key={idx} className="game-event-block">
            <HeaderSmall>{event.label}</HeaderSmall>
            <p className="mb-1 text-left">{description}</p>

            {outcomeMessage ? (
              <p className="mb-1 text-left" style={{ color: "#aaffff" }}>
                {outcomeMessage}
              </p>
            ) : (
              event.buttons.map((btn) => (
                <button
                  className="btn-border"
                  key={btn.label}
                  onClick={() => handleButtonClick(idx, btn.getAction)}
                >
                  <MultiColoredLetters colors={blueColors}>
                    {btn.label}
                  </MultiColoredLetters>
                </button>
              ))
            )}
            <br />
          </div>
        );
      })}
      <br />
      <ActionButton onClick={onFinishChain} label="Sich abwenden" />
    </div>
  );
  //#endregion
};
