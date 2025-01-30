import { observer } from "mobx-react-lite";
import { SYSTEM } from "../../../data/helper/colorfullStrings";
import Header from "../../../layout/Header/Header";
import { GradientText } from "../../../utility/Formatted/GradientText";
import { useRootStore } from "../../../store";
import { Item } from "../../../data/gameItems/ItemData";
import ItemCard from "../../../layout/Cards/ItemCards";

const PlayerInventory: React.FC = observer(() => {
  const { getPlayerObj, playerEconomy } = useRootStore();
  const selected = getPlayerObj();
  const items = playerEconomy.data.items;

  const groupItemsByCategory = (
    items: Record<string, { item: Item; quantity: number }>
  ) => {
    return Object.values(items).reduce<
      Record<string, { item: Item; quantity: number }[]>
    >((acc, itemData) => {
      const category = itemData.item.category;
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(itemData);
      return acc;
    }, {});
  };
  const groupedItems = groupItemsByCategory(items);

  return (
    <div className="max-width">
      <h2>Inventar</h2>
      {/* <Header>Alles</Header> */}
      <p className="mb-1 text-left">
        Du öffnest deinen Beutel und stellst mal wieder fest das dort
        unglaublich viele Gegenstände Platz haben. Von Außen nicht zu erkennen
        hat dieses, anscheinend magische Stück Stoff, mehrere Innentaschen mit
        deren Hilfe du dein Hab und Gut sortieren kannst. Aber um einen dieser
        Gegenstände zu nutzten, oder anderen zu zeigen, musst du ihn wohl leider
        aus dem Beutel und {SYSTEM.HandDie} nehmen.
        <br />
        <br />
        Du besitzt <GradientText>{playerEconomy.data.gold}</GradientText>{" "}
        {SYSTEM.Gold} und{" "}
        <GradientText>{playerEconomy.data.edelsteine}</GradientText>{" "}
        {SYSTEM.Edelsteine}.
      </p>

      {Object.keys(items).length === 0 ? (
        <p>Keine Items im Inventar.</p>
      ) : (
        <div>
          {Object.entries(groupedItems).map(([category, itemsInCategory]) => (
            <div key={category}>
              <Header>{category}</Header>
              <div className="category-section">
                {itemsInCategory.map((itemData) => (
                  <ItemCard
                  key={itemData.item.name}
                    item={itemData.item}
                    quantity={itemData.quantity}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
      <br />

      <div>
        Du hast {selected.item.label} in die Hand genommen und kannst es
        jederzeit nutzen,
        <br />
        falls man es nutzten kann.
      </div>
      <br />
    </div>
  );
});

export default PlayerInventory;
