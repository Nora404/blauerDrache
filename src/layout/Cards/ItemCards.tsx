import { useState, MouseEvent } from "react";
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
import { PlayerStats } from "../../store/types";
import { getSellPrice } from "../../utility/Helper/Calculate";
import { renderBuffDuration } from "../../utility/Helper/RenderData";

type ItemCardMode = "view" | "buy" | "sell";

type ItemCardProps = {
  item: Item | Weapon | Armor | Consum;
  quantity?: number;
  mode?: ItemCardMode;
};

const ItemCard: React.FC<ItemCardProps> = ({
  item,
  quantity,
  mode = "view", 
}) => {

  const [showDetails, setShowDetails] = useState<boolean>(false);
  const { playerFlux, playerEconomy } = useRootStore();

  const buyPrice = item.ek || 0;
  const sellPrice = getSellPrice(item.ek || 0);

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

  const handleBuy = (e: MouseEvent) => {
    e.stopPropagation();
    console.log("Kaufen-Logik hier implementieren", item.name);
  };

  const handleSell = (e: MouseEvent) => {
    e.stopPropagation();
    console.log("Verkaufen-Logik hier implementieren", item.name);
  };

  return (
    <button className="btn-border item-card" onClick={handleClick}>
      <div className="full">
        {item.label} {quantity ? <span>(x{quantity})</span> : null}
 
        {mode === "buy" && <div>Kaufen für: {buyPrice}</div>}
        {mode === "sell" && <div>Verkaufspreis: {sellPrice}</div>}

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
        {item.buff && (
          <div style={{fontSize: "80%", lineHeight: "150%"}}>
            <div>{buffMap[item.buff].label}</div>
            <div>{renderBuffDuration(buffMap[item.buff])}</div>
          </div>
        )}
        {item.debuff && (
          <div style={{fontSize: "80%", lineHeight: "150%"}}>
            <div>{debuffMap[item.debuff].label}</div>
            <div>{renderBuffDuration(debuffMap[item.debuff])}</div>
          </div>
        )}
        {item.life && (
          <div style={{fontSize: "80%", lineHeight: "150%"}}>
            {SYSTEM.Leben}: {item.life}
            {showDetails && mode === "view" && (
              <div>
                <button className="btn-border" onClick={handleUse}>
                  <MultiColoredLetters colors={blueColors}>
                    Benutzen
                  </MultiColoredLetters>
                </button>
              </div>
            )}
          </div>
        )}
        {item.energy && (
          <div style={{fontSize: "80%", lineHeight: "150%"}}>
            {SYSTEM.Tatendrang}: {item.energy}
            {showDetails && mode === "view" && (
              <div>
                <button className="btn-border" onClick={handleUse}>
                  <MultiColoredLetters colors={blueColors}>
                    Benutzen
                  </MultiColoredLetters>
                </button>
              </div>
            )}
          </div>
        )}
        {item.attack && (
          <div style={{fontSize: "80%", lineHeight: "150%"}}>
            {SYSTEM.Angriff}: {item.attack}
            {showDetails && mode === "view" && (
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
          <div style={{fontSize: "80%", lineHeight: "150%"}}>
            {SYSTEM.Verteidigung}: {item.defense}
            {showDetails && mode === "view" && (
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
        {item.luck && (
          <div style={{fontSize: "80%", lineHeight: "150%"}}>
            {SYSTEM.Glück}: {item.luck}
            {showDetails && mode === "view" && (
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
            {mode === "view" && (
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
            {mode === "buy" && (
              <button className="btn-border" onClick={handleBuy}>
                Jetzt kaufen
              </button>
            )}
            {mode === "sell" && (
              <button className="btn-border" onClick={handleSell}>
                Jetzt verkaufen
              </button>
            )}
          </>
        )}
      </div>
    </button>
  );
};

export default ItemCard;
