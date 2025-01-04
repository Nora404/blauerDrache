import { SYSTEM } from "../../../data/colorfullStrings";
import { ItemName } from "../../../data/ItemData";
import { useNewGameStore } from "../../../store/newGameStore";

const PlayerInventory: React.FC = () => {
    const { store, consumeItem, updateInHand } = useNewGameStore();
    const items = store.playerEconomy.items;

    const handelClick = (name: ItemName) => {
        updateInHand(name);
    }

    return (
        <div className="max-width">
            <h2>Inventar</h2>
            {/* <Header>Alles</Header> */}
            <p className="mb-1 text-left">
                Du öffnest deinen Beutel und stellst mal wieder fest das dort unglaublich viele Gegenstände Platz haben.
                Von Außen nicht zu erkennen hat dieses, anscheinend magische Stück Stoff, mehrere Innentaschen mit deren Hilfe du dein Hab und Gut sortieren kannst.
                Aber um einen dieser Gegenstände zu nutzten, oder anderen zu zeigen, musst du ihn wohl leider aus dem Beutel und {SYSTEM.HandDie} nehmen.
            </p>

            {Object.keys(items).length === 0 ? (
                <p>Keine Items im Inventar.</p>
            ) : (
                <div className="text-left">
                    {Object.entries(items).map(([itemName, itemData]) => {
                        if (!itemData || !itemData.item) return null;

                        return (
                            <button key={itemName} onClick={() => handelClick(itemName as ItemName)}>
                                <strong>{itemData.item.name}:</strong> {itemData.quantity} <br />
                                <small>{itemData.item.description}</small>
                                {/* {itemData.item.effects && (
                                    <button onClick={() => consumeItem(itemName)}>
                                        Benutzen
                                    </button>
                                )} */}
                            </button>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default PlayerInventory;