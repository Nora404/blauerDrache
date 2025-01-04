import { GameAction } from "../data/eventData";
import { useNewGameStore } from "../store/newGameStore";

// Verarbeitet alle Deltas aus einem Event
export function useApplyGameAction() {
    const { setPlayerMeta } = useNewGameStore();

    function applyGameAction(action: GameAction) {

        // 1) Meta-Änderungen
        if (action.metaDelta) {
            setPlayerMeta(action.metaDelta);
        }

        // 2) Stats Dauerhaft
        if (action.statsDelta) {
            // Du könntest hier direkt z. B.:
            // updateStats({life: gameStore.stats.life + (action.statsDelta.life ?? 0)})
            // oder du machst es einfach:
            // setPlayerStats(action.statsDelta);
        }

        // 3) Economy
        if (action.economyDelta) {
            // Wir holen die bestehenden Werte:
            // const { gold, edelsteine } = gameStore.economy;
            // // Dann addieren wir, was in economyDelta steht (falls es gesetzt ist)
            // updateEconomy({
            //     gold: action.economyDelta.gold !== undefined
            //         ? gold + action.economyDelta.gold
            //         : gold,
            //     edelsteine: action.economyDelta.edelsteine !== undefined
            //         ? edelsteine + action.economyDelta.edelsteine
            //         : edelsteine,
            // });
        }

        // 4) Items-Delta
        if (action.itemsDelta) {
            // Erstelle eine Kopie der aktuellen Items
            // const itemsCopy: Partial<Record<ItemName, number>> = { ...gameStore.equipment.items };

            // // Iteriere über die Delta-Items
            // for (const itemName in action.itemsDelta) {
            //     // Stelle sicher, dass der Schlüssel ein gültiger ItemName ist
            //     if (action.itemsDelta.hasOwnProperty(itemName)) {
            //         const delta = action.itemsDelta[itemName as ItemName];

            //         if (delta !== undefined) {
            //             // Aktualisiere den Wert des Items
            //             itemsCopy[itemName as ItemName] = (itemsCopy[itemName as ItemName] || 0) + delta;

            //             // Entferne das Item, wenn der Wert kleiner oder gleich 0 ist
            //             if (itemsCopy[itemName as ItemName]! <= 0) {
            //                 delete itemsCopy[itemName as ItemName];
            //             }
            //         }
            //     }
            // }
            // updateEquipment({ items: itemsCopy });
        }

        // 5) Equipment-Delta (z. B. Rüstung oder Waffe wechseln)
        // if (action.equipmentDelta) {
        //     updateEquipment(action.equipmentDelta);
        // }

        // if (action.tempStatsDelta) {
        //     gameState?.updateTempStats(action.tempStatsDelta);
        // }

        // if (action.tempItemsDelta) {
        //     gameState?.updateTempItems(action.tempItemsDelta)
        // }

    }

    return { applyGameAction };
}