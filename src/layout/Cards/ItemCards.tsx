import { useState } from "react";
import { Armor } from "../../data/gameItems/armorData";
import { Item } from "../../data/gameItems/ItemData";
import { Weapon } from "../../data/gameItems/weaponData";
import { SYSTEM } from "../../data/helper/colorfullStrings";
import "./ItemCard.css";
import { buffMap } from "../../data/buffData";
import { Consum } from "../../data/gameItems/consumData";
import { debuffMap } from "../../data/debuffData";
import { renderBuffDuration } from "../../utility/Helper/RenderData";
import BuyCard from "./BuyCard";
import ViewCard from "./ViewCard";
import SellCard from "./SellCard";

type ItemCardMode = "view" | "buy" | "sell";

type ItemCardProps = {
  item: Item | Weapon | Armor | Consum;
  quantity?: number;
  mode?: ItemCardMode;
  onClick?: (item: Item) => void;
  isActive?: boolean;
};

const ItemCard: React.FC<ItemCardProps> = ({
  item,
  quantity,
  mode = "view",
  onClick,
  isActive = false
}) => {
  const [showDetails, setShowDetails] = useState<boolean>(false);

  const handleClick = () => {
    setShowDetails((prev) => !prev);
    onClick?.(item);
  };

  return (
    <div
      className={`btn-border item-card text-left ${isActive ? "glow" : ""}`}
      onClick={handleClick}
      style={{ display: "inline-block" }}
    >
      {mode === "buy" && (
        <BuyCard item={item} />
      )}

      {mode === "view" && (
        <ViewCard item={item} showDetails={showDetails} quantity={quantity} />
      )}

      {mode === "sell" && (
        <SellCard item={item} quantity={quantity} />
      )}
    </div>
  );
};

export default ItemCard;


function formatWithSign(value: number): string {
  return value >= 0 ? `+${value}` : `${value}`;
}


export function getItemEffectText(item: Item) {
  const effectElements = [];

  if (item.life) {
    effectElements.push(
      <>
        {SYSTEM.Leben}: {formatWithSign(item.life)} {/* Änderung */}
        <br />
      </>
    );
  }
  if (item.actionPoints) {
    effectElements.push(
      <>
        {SYSTEM.Aktionen}: {formatWithSign(item.actionPoints)} {/* Änderung */}
        <br />
      </>
    );
  }
  if (item.attack) {
    effectElements.push(
      <>
        {SYSTEM.Angriff}: {formatWithSign(item.attack)} {/* Änderung */}
        <br />
      </>
    );
  }
  if (item.defense) {
    effectElements.push(
      <>
        {SYSTEM.Verteidigung}: {formatWithSign(item.defense)} {/* Änderung */}
        <br />
      </>
    );
  }
  if (item.luck) {
    effectElements.push(
      <>
        {SYSTEM.Glück}: {formatWithSign(item.luck)} {/* Änderung */}
        <br />
      </>
    );
  }
  if (item.buff) {
    effectElements.push(
      <>
        {buffMap[item.buff].name}
        <br />
        {renderBuffDuration(buffMap[item.buff])}
        <br />
      </>
    );
  }
  if (item.debuff) {
    effectElements.push(
      <>
        {debuffMap[item.debuff].name}
        <br />
        {renderBuffDuration(debuffMap[item.debuff])}
        <br />
      </>
    );
  }

  return <>{effectElements}</>;
}

