import { ItemName } from "../data/ItemData";
import { PlayerBase, PlayerEconomy } from "../store/newGameStore";

export const RewardsDisplay: React.FC<{
    rewards: {
        base?: Partial<PlayerBase>;
        economy?: Partial<PlayerEconomy>;
        items?: { itemName: ItemName; quantity: number }[];
    }
}> = ({ rewards }) => {

    return (
        <div>
            {/* Base */}
            {rewards.base && (
                <div>
                    <h4>Base</h4>
                    {Object.entries(rewards.base).map(([key, value]) => (
                        <div key={key}>
                            <span>{key}:</span> <span>{value}</span>
                        </div>
                    ))}
                </div>
            )}

            {/* Economy */}
            {rewards.economy && (
                <div>
                    <h4>Economy</h4>
                    {Object.entries(rewards.economy).map(([key, value]) => {
                        // Prüfen, ob der Wert ein Item-ähnliches Objekt ist
                        if (
                            typeof value === "object" &&
                            value !== null &&
                            "item" in value &&
                            "quantity" in value
                        ) {
                            return null; // Ignoriere Items
                        }

                        return (
                            <div key={key}>
                                <span>{key}:</span> <span>{String(value)}</span>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Items */}
            {rewards.items && rewards.items.length > 0 && (
                <div>
                    <h4>Items</h4>
                    {rewards.items.map((item, index) => (
                        <div key={index}>
                            <span>{item.itemName}:</span> <span>{item.quantity}</span>
                        </div>
                    ))}
                </div>
            )}

            {/* Kein Reward */}
            {!rewards.base && !rewards.economy && (!rewards.items || rewards.items.length === 0) && (
                <p>Keine Rewards verfügbar.</p>
            )}
        </div>
    );
};
