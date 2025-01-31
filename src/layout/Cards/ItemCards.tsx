import { useState, MouseEvent } from "react";
import { Armor, ArmorName } from "../../data/gameItems/armorData";
import { Item, itemMap } from "../../data/gameItems/ItemData";
import { Weapon, WeaponName } from "../../data/gameItems/weaponData";
import { SYSTEM } from "../../data/helper/colorfullStrings";
import "./ItemCard.css";
import { useRootStore } from "../../store";
import Talk from "../../utility/Formatted/Talk";
import MultiColoredLetters from "../../utility/Formatted/MultiColoredLetters";
import {
  blueColors,
  braunColors,
  greenColors,
  redColors,
  yellowColors,
} from "../../data/helper/colorMappingData";
import { buffMap } from "../../data/buffData";
import { Consum } from "../../data/gameItems/consumData";
import { debuffMap } from "../../data/debuffData";
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

  const buyPrice = item.ek ?? 0;
  const sellPrice = getSellPrice(item.ek ?? 0);

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

  const handleSwap = (e: MouseEvent) => {
    e.stopPropagation();
    console.log("Tausch-Logik hier implementieren", item.name);
  };

  return (
    <div
      className="btn-border item-card"
      onClick={handleClick}
      style={{ display: "inline-block" }}
    >
      <div className="full">
        <span>
          {item.name} {quantity ? <span>(x{quantity})</span> : null}
        </span>
        {mode === "buy" && (
          <div style={{ fontSize: "80%", lineHeight: "150%" }}>
            Kaufen für: <Talk>{buyPrice}</Talk> {SYSTEM.Gold}
          </div>
        )}
        {mode === "sell" && (
          <div style={{ fontSize: "80%", lineHeight: "150%" }}>
            Verkaufspreis: {sellPrice}
          </div>
        )}
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
          <div style={{ fontSize: "80%", lineHeight: "150%" }}>
            <div>{buffMap[item.buff].name}</div>
            <div>{renderBuffDuration(buffMap[item.buff])}</div>
          </div>
        )}
        {item.debuff && (
          <div style={{ fontSize: "80%", lineHeight: "150%" }}>
            <div>{debuffMap[item.debuff].name}</div>
            <div>{renderBuffDuration(debuffMap[item.debuff])}</div>
          </div>
        )}
        {item.life && (
          <div style={{ fontSize: "80%", lineHeight: "150%" }}>
            {SYSTEM.Leben}: {item.life}
          </div>
        )}
        {item.energy && (
          <div style={{ fontSize: "80%", lineHeight: "150%" }}>
            {SYSTEM.Tatendrang}: {item.energy}
          </div>
        )}
        {item.attack && (
          <div style={{ fontSize: "80%", lineHeight: "150%" }}>
            {SYSTEM.Angriff}: {item.attack}
          </div>
        )}
        {item.defense && (
          <div style={{ fontSize: "80%", lineHeight: "150%" }}>
            {SYSTEM.Verteidigung}: {item.defense}
          </div>
        )}
        {item.luck && (
          <div style={{ fontSize: "80%", lineHeight: "150%" }}>
            {SYSTEM.Glück}: {item.luck}
          </div>
        )}
        {showDetails && (
          <>
            {mode === "view" && (
              <>
                {item.category === "Nahrung" && (
                  <button className="btn-border" onClick={handleUse}>
                    <MultiColoredLetters colors={greenColors}>
                      Benutzten
                    </MultiColoredLetters>
                  </button>
                )}
                <button className="btn-border" onClick={handleItem}>
                  <MultiColoredLetters colors={greenColors}>
                    Ausrüsten
                  </MultiColoredLetters>
                </button>
                {item.name === playerFlux.data.item && (
                  <button className="btn-border" onClick={handleDrop}>
                    <MultiColoredLetters colors={yellowColors}>
                      Ablegen
                    </MultiColoredLetters>
                  </button>
                )}
                <button className="btn-border" onClick={handleRemove}>
                  <MultiColoredLetters colors={redColors}>
                    Wegwerfen
                  </MultiColoredLetters>
                </button>
              </>
            )}
            {mode === "buy" && (
              <>
                <button className="btn-border" onClick={handleBuy}>
                  <MultiColoredLetters colors={yellowColors}>
                    Kaufen
                  </MultiColoredLetters>
                </button>
                <button className="btn-border" onClick={handleSwap}>
                  <MultiColoredLetters colors={braunColors}>
                    Tauschen
                  </MultiColoredLetters>
                </button>
              </>
            )}
            {mode === "sell" && (
              <button className="btn-border" onClick={handleSell}>
                <MultiColoredLetters colors={blueColors}>
                  Verkaufen
                </MultiColoredLetters>
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ItemCard;
