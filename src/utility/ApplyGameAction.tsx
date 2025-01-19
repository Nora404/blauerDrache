import { BuffName } from "../data/buffData";
import { DebuffName } from "../data/debuffData";
import { GameAction } from "../data/eventData";
import { ItemName } from "../data/ItemData";
import { useRootStore } from "../store";

export function useApplyGameAction() {
    const { playerStats, playerFlux, playerEconomy, playerQuest, playerBase } = useRootStore();

    function applyGameAction(action: GameAction) {

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

        if (action.stateDelta?.rounds) {
            playerStats.updateRounds(action.stateDelta?.rounds);
        }

        if (action.economyDelta) {
            playerEconomy.updatePlayerEconomy(action.economyDelta);
        }

        if (action.baseDelta?.exp) {
            playerBase.updateExp(action.baseDelta.exp);
        }

        if (action.baseDelta?.reputation) {
            playerBase.updateReputation(action.baseDelta.reputation);
        }

        if (action.fluxDelta?.buff) {
            Object.entries(action.fluxDelta?.buff).forEach(([name]) => {
                playerFlux.updatePlayerBuff(name as BuffName);
            }
            );
        }

        if (action.fluxDelta?.debuff) {
            Object.entries(action.fluxDelta?.debuff).forEach(([name]) => {
                playerFlux.updatePlayerDebuff(name as DebuffName);
            }
            );
        }

        if (action.triggerQuest) {
            playerQuest.updateQuest(action.triggerQuest, false);
        }

        if (action.endQuest) {
            playerQuest.updateQuest(action.endQuest, true);
            playerQuest.updateCompletedQuests(action.endQuest);
        }
    }

    return { applyGameAction };
}