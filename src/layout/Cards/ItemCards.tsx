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
import Talk from "../../utility/Formatted/Talk";
import MultiColoredLetters from "../../utility/Formatted/MultiColoredLetters";
import {
  blueColors,
  greenColors,
  redColors,
  yellowColors,
} from "../../data/helper/colorMappingData";
import { Buff, buffMap } from "../../data/buffData";
import { Consum } from "../../data/gameItems/consumData";
import { Debuff, debuffMap } from "../../data/debuffData";

type ItemCardProps = {
  itemName: ItemName;
  quantity?: number;
};

const ItemCard: React.FC<ItemCardProps> = ({ itemName, quantity }) => {
  const item: Item | Weapon | Armor | Consum =
    itemMap[itemName] || emptyItemObj;

  const [showDetails, setShowDetails] = useState<boolean>(false);
  const { playerFlux, playerEconomy } = useRootStore();

  const buff: Buff | null = buffMap[item.buff];
  const debuff: Debuff | null = debuffMap[item.debuff];

  const handleClick = () => {
    setShowDetails((prev) => !prev);
  };

  const handleItem = (e: MouseEvent) => {
    e.stopPropagation();
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

  const handleUse = (e: MouseEvent) => {
    e.stopPropagation();
    playerEconomy.consumeItem(item.name);
  };

  const handleDrop = (e: MouseEvent) => {
    e.stopPropagation();
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

  const handleRemove = (e: MouseEvent) => {
    e.stopPropagation();
    playerEconomy.updateItems(item.name, -1);
  };

  return (
    <button className="btn-border item-card " onClick={handleClick}>
      <div className="full">
        {item.label} {quantity ? <span>(x{quantity})</span> : null}
        {showDetails && (
          <div
            style={{
              fontSize: "80%",
              lineHeight: "130%",
              marginTop: "8px",
              marginBottom: "8px",
            }}
          >
            <Talk color="#C5EDFF">{item.description}</Talk>
          </div>
        )}
        {buff && <div>{buff.label}</div>}
        {debuff && <div>{debuff.label}</div>}
        {item.life && (
          <div>
            {SYSTEM.Leben}: {item.life}
            {showDetails && (
              <div>
                <button className="btn-border" onClick={handleUse}>
                  <MultiColoredLetters colors={blueColors}>
                    Benutzten
                  </MultiColoredLetters>
                </button>
              </div>
            )}
          </div>
        )}
        {item.energy && (
          <div>
            {SYSTEM.Tatendrang}: {item.energy}
            {showDetails && (
              <div>
                <button className="btn-border" onClick={handleUse}>
                  <MultiColoredLetters colors={blueColors}>
                    Benutzten
                  </MultiColoredLetters>
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
                <button className="btn-border" onClick={handleDrop}>
                  <MultiColoredLetters colors={yellowColors}>
                    Ablegen
                  </MultiColoredLetters>
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
                <button className="btn-border" onClick={handleDrop}>
                  <MultiColoredLetters colors={yellowColors}>
                    Ablegen
                  </MultiColoredLetters>
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
        {showDetails && (
          <>
            <button className="btn-border" onClick={handleItem}>
              <MultiColoredLetters colors={greenColors}>
                Ausrüsten
              </MultiColoredLetters>
            </button>
            <button className="btn-border" onClick={handleRemove}>
              <MultiColoredLetters colors={redColors}>
                Wegwerfen
              </MultiColoredLetters>
            </button>
          </>
        )}
      </div>
    </button>
  );
};

export default ItemCard;
