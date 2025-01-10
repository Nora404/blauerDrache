import { BuffName } from "../data/buffData";
import { DebuffName } from "../data/debuffData";
import { GameAction } from "../data/eventData";
import { ItemName } from "../data/ItemData";
import { useNewGameStore } from "../store/newGameStore";

export function useApplyGameAction() {
    const {
        updateItems,
        updatePlayerEconomy,
        updateLife,
        updateRounds,
        updatePlayerBuff,
        updatePlayerDebuff,
        updateQuest,
    } = useNewGameStore();

    function applyGameAction(action: GameAction) {

        if (action.itemsDelta) {
            Object.entries(action.itemsDelta).forEach(([name, count]) => {
                if (count !== undefined) {
                    updateItems(name as ItemName, count);
                }
            });
        }

        if (action.stateDelta?.life) {
            updateLife(action.stateDelta?.life);
        }

        if (action.stateDelta?.rounds) {
            updateRounds(action.stateDelta?.rounds);
        }

        if (action.economyDelta) {
            updatePlayerEconomy(action.economyDelta);
        }

        if (action.triggerQuest) {
            updateQuest(action.triggerQuest);
        }

        if (action.fluxDelta?.buff) {
            Object.entries(action.fluxDelta?.buff).forEach(([name, buff]) => {
                updatePlayerBuff(name as BuffName);
            }
            );
        }

        if (action.fluxDelta?.debuff) {
            Object.entries(action.fluxDelta?.debuff).forEach(([name, debuff]) => {
                updatePlayerDebuff(name as DebuffName);
            }
            );
        }
    }

    return { applyGameAction };
}