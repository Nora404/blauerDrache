import { useNewGameStore } from "../../../store/newGameStore";

const PlayerInventory: React.FC = () => {
    const { store, consumeItem } = useNewGameStore();
    const items = store.playerEconomy.items;

    return (
        <div>
            <h2>Inventar</h2>
            {/* <Header>Alles</Header> */}
            {Object.keys(items).length === 0 ? (
                <p>Keine Items im Inventar.</p>
            ) : (
                <div className="text-left">
                    {Object.entries(items).map(([itemName, itemData]) => {
                        if (!itemData || !itemData.item) return null;

                        return (
                            <div key={itemName}>
                                <strong>{itemData.item.name}:</strong> {itemData.quantity} <br />
                                <small>{itemData.item.description}</small>
                                {itemData.item.effects && (
                                    <button onClick={() => consumeItem(itemName)}>
                                        Benutzen
                                    </button>
                                )}
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default PlayerInventory;