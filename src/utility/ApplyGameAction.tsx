import { GameAction } from "../data/eventData";
import { useGameStore } from "../data/gameStore";

// Verarbeitet alle Deltas aus einem Event
export function useApplyGameAction() {
    const {
        gameStore,
        updateMeta,
        updateStats,
        updateEconomy,
        updateEquipment,
    } = useGameStore();

    function applyGameAction(action: GameAction) {
        // 1) Meta-Änderungen
        if (action.metaDelta) {
            updateMeta(action.metaDelta);
        }

        // 2) Stats
        if (action.statsDelta) {
            // Du könntest hier direkt z. B.:
            // updateStats({life: gameStore.stats.life + (action.statsDelta.life ?? 0)})
            // oder du machst es einfach:
            updateStats(action.statsDelta);
        }

        // 3) Economy
        if (action.economyDelta) {
            // Wir holen die bestehenden Werte:
            const { gold, edelsteine } = gameStore.economy;
            // Dann addieren wir, was in economyDelta steht (falls es gesetzt ist)
            updateEconomy({
                gold: action.economyDelta.gold !== undefined
                    ? gold + action.economyDelta.gold
                    : gold,
                edelsteine: action.economyDelta.edelsteine !== undefined
                    ? edelsteine + action.economyDelta.edelsteine
                    : edelsteine,
            });
        }

        // 4) Items-Delta
        if (action.itemsDelta) {
            const itemsCopy = { ...gameStore.equipment.items };
            for (const itemName in action.itemsDelta) {
                const delta = action.itemsDelta[itemName];
                itemsCopy[itemName] = (itemsCopy[itemName] || 0) + delta;
                if (itemsCopy[itemName] <= 0) {
                    delete itemsCopy[itemName];
                }
            }
            updateEquipment({ items: itemsCopy });
        }

        // 5) Equipment-Delta (z. B. Rüstung oder Waffe wechseln)
        if (action.equipmentDelta) {
            // Hier wäre es das Gleiche Prinzip:
            // Du könntest newEquipment = {...gameStore.equipment, ...action.equipmentDelta}
            // und das dann per updateEquipment(newEquipment) setzen
            updateEquipment(action.equipmentDelta);
        }
    }

    return { applyGameAction };
}