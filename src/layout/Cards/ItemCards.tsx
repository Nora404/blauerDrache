import { useState } from "react";
import { Armor, ArmorName } from "../../data/gameItems/armorData";
import {
  emptyItemObj,
  Item,
  itemMap,
  ItemName,
} from "../../data/gameItems/ItemData";
import { Weapon, WeaponName } from "../../data/gameItems/weaponData";
import { SYSTEM } from "../../data/helper/colorfullStrings";
import "./ItemCard.css";
import { useRootStore } from "../../store";

type ItemCardProps = {
  itemName: ItemName;
  quantity?: number;
};

const ItemCard: React.FC<ItemCardProps> = ({ itemName, quantity }) => {
  const item: Item | Weapon | Armor = itemMap[itemName] || emptyItemObj;

  const [showDetails, setShowDetails] = useState<boolean>(false);
  const { playerFlux, playerEconomy } = useRootStore();

  const handleClick = () => {
    setShowDetails((prev) => !prev);
  };

  const handleItem = () => {
    const cat = itemMap[item.name].category;
    switch (cat) {
      case "Waffen":
        playerFlux.updateWeapon(item.name as WeaponName);
        break;
      case "Ausrüstung":
        playerFlux.updateArmor(item.name as ArmorName);
        break;
      default:
        playerFlux.updateInHand(item.name);
        return;
    }
  };

  const handleUse = () => {
    playerEconomy.consumeItem(item.name);
  };

  const handleDrop = () => {
    const cat = itemMap[item.name].category;
    switch (cat) {
      case "Waffen":
        playerFlux.updateWeapon("Nichts");
        break;
      case "Ausrüstung":
        playerFlux.updateArmor("Nichts");
        break;
      default:
        playerFlux.updateInHand("Nichts");
        return;
    }
  };

  return (
    <button className="btn-border item-card " onClick={handleClick}>
      <div className="full">
        {item.label} {quantity ? <span>(x{quantity})</span> : null}
        {showDetails && <div>{item.description}</div>}
        {item.effects?.life && (
          <div>
            {SYSTEM.Leben}: {item.effects.life}
            {showDetails && (
              <div>
                <button className="btn-border" onClick={handleItem}>
                  Ausrüsten
                </button>
                <button className="btn-border" onClick={handleUse}>
                  Benutzten
                </button>
              </div>
            )}
          </div>
        )}
        {item.effects?.energy && (
          <div>
            {SYSTEM.Tatendrang}: {item.effects.energy}
            {showDetails && (
              <div>
                <button className="btn-border" onClick={handleItem}>
                  Ausrüsten
                </button>
                <button className="btn-border" onClick={handleUse}>
                  Benutzten
                </button>
              </div>
            )}
          </div>
        )}
        {item.attack && (
          <div>
            {SYSTEM.Angriff}: {item.attack}
            {showDetails && (
              <div>
                <button className="btn-border" onClick={handleItem}>
                  Ausrüsten
                </button>
                <button className="btn-border" onClick={handleDrop}>
                  Ablegen
                </button>
              </div>
            )}
          </div>
        )}
        {item.defense && (
          <div>
            {SYSTEM.Verteidigung}: {item.defense}
            {showDetails && (
              <div>
                <button className="btn-border" onClick={handleItem}>
                  Ausrüsten
                </button>
                <button className="btn-border" onClick={handleDrop}>
                  Ablegen
                </button>
                {}
              </div>
            )}
          </div>
        )}
        {item.luck && (
          <div>
            {SYSTEM.Glück}: {item.luck}
            {showDetails && (
              <div>
                <button className="btn-border" onClick={handleItem}>
                  Ausrüsten
                </button>
                <button className="btn-border" onClick={handleDrop}>
                  Ablegen
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </button>
  );
};

export default ItemCard;
