import { BuffName } from "../../data/buffData";
import { DebuffName } from "../../data/debuffData";
import { GameAction } from "../../data/eventData";
import { ItemName } from "../../data/gameItems/ItemData";
import { useRootStore } from "../../store";

export function useApplyGameAction() {
  const {
    playerStats,
    playerFlux,
    playerEconomy,
    playerQuest,
    playerBase,
    gameState,
  } = useRootStore();

  function applyGameAction(action: GameAction) {
    console.log("im hook: ", action);

    if (action.itemsDelta) {
      Object.entries(action.itemsDelta).forEach(([name, count]) => {
        if (count !== undefined) {
          playerEconomy.updateItems(name as ItemName, count);
        }
      });
    }

    if (action.stateDelta?.life) {
      playerStats.updateLife(action.stateDelta?.life);
    }

    if (action.stateDelta?.actionPoints) {
      playerStats.updateActionPoints(action.stateDelta?.actionPoints);
    }

    if (action.economyDelta) {
      playerEconomy.updatePlayerEconomy(action.economyDelta);
    }

    if (action.baseDelta?.exp) {
      playerBase.updateExp(action.baseDelta.exp);
    }

    if (action.baseDelta?.leumund) {
      playerBase.updateLeumund(action.baseDelta.leumund);
    }

    if (action.fluxDelta?.buff) {
      Object.entries(action.fluxDelta?.buff).forEach(([name]) => {
        playerFlux.updatePlayerBuff(name as BuffName);
      });
    }

    if (action.fluxDelta?.debuff) {
      Object.entries(action.fluxDelta?.debuff).forEach(([name]) => {
        playerFlux.updatePlayerDebuff(name as DebuffName);
      });
    }

    if (action.triggerQuest) {
      playerQuest.updateQuest(action.triggerQuest, false);
    }

    if (action.endQuest) {
      playerQuest.updateQuest(action.endQuest, true);
      playerQuest.updateCompletedQuests(action.endQuest);

      const eventId = action.endQuest.replace("Q", "E") + "End";
      gameState.removeFromEventQueue(eventId);
    }
  }

  return { applyGameAction };
}
