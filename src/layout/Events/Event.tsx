//#region [import]
import { useState } from "react";
import { GameEvent, GameAction } from "../../data/eventData";
import { parseDescription } from "../../utility/Helper/ParseTextToJSX";
import {
  checkAllConditions,
  getBattleTiggerById,
  getGameEventById,
  getQuestTriggerById,
  pickRandomNextEvent,
} from "../../utility/Helper/TriggerEvent";
import { useApplyGameAction } from "../../utility/Hooks/ApplyGameAction";
import { useRootStore } from "../../store";
import ActionButton from "../ActionButtons/ActionButton";
import HeaderSmall from "../Header/HeaderSmall";
//#endregion

//#region [prepare]
type ChainItem = {
  eventId: string;
  outcomeMessage: React.ReactNode;
};

type EventProps = {
  eventId: string;
  onTriggerBattle: (battleId: string) => void;
  onTriggerQuest: (questId: string) => void;
  onFinish: () => void;
};

const Event: React.FC<EventProps> = ({
  eventId,
  onTriggerBattle,
  onTriggerQuest,
  onFinish,
}) => {
  const { applyGameAction } = useApplyGameAction();
  const [chain, setChain] = useState<ChainItem[]>([
    { eventId: eventId, outcomeMessage: null },
  ]);

  const {
    gameTime,
    gameState,
    playerStats,
    playerBase,
    playerFlux,
    playerMeta,
    playerEconomy,
  } = useRootStore();

  const handleButtonClick = (
    chainIndex: number,
    getAction: () => GameAction
  ) => {
    const action = getAction();
    applyGameAction(action);

    if (action.triggerBattle) {
      onTriggerBattle(action.triggerBattle);
      return;
    }
    if (action.triggerQuest) {
      onTriggerQuest(action.triggerQuest);
      return;
    }

    const outcomeMsg = parseDescription(action.message || "");
    let nextEventId: string | null = null;
    if (action.nextEvents && action.nextEvents.length > 0) {
      nextEventId = pickRandomNextEvent(action.nextEvents);
    } else if (action.nextEvents) {
      nextEventId = action.nextEvents[0].eventId;
    }

    setChain((prevChain) => {
      const updated = [...prevChain];
      updated[chainIndex] = {
        ...updated[chainIndex],
        outcomeMessage: outcomeMsg,
      };
      if (nextEventId) {
        updated.push({ eventId: nextEventId, outcomeMessage: null });
      }
      return updated;
    });
  };

  return (
    <div className="max-width">
      {chain.map((item, index) => {
        const event = getGameEventById(item.eventId);
        if (!event) {
          return <p key={index}>Unbekanntes Event: {item.eventId}</p>;
        }
        const description = parseDescription(event.description);
        const validButtons = event.buttons.filter((btn) =>
          checkAllConditions(
            btn.conditions,
            gameTime.data,
            gameState.data,
            playerStats.data,
            playerBase.data,
            playerFlux.data,
            playerMeta.data,
            playerEconomy.data
          )
        );
        return (
          <div key={index}>
            {event.label && <HeaderSmall>{event.label}</HeaderSmall>}
            <p className="mb-1 text-left">{description}</p>
            {item.outcomeMessage ? (
              <p className="mb-1 text-left" style={{ color: "#aaffff" }}>
                {item.outcomeMessage}
              </p>
            ) : (
              validButtons.map((btn) => (
                <ActionButton
                  key={btn.label}
                  onClick={() => handleButtonClick(index, btn.getAction)}
                  label={btn.label}
                  result={btn.result}
                />
              ))
            )}
          </div>
        );
      })}
      <ActionButton onClick={onFinish} label="Sich abwenden" />
    </div>
  );
};

export default Event;
