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
import { useRootStore } from "../../store";

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
  const { getPlayerObj } = useRootStore();

  const handleClick = () => {
    onClick?.(item);
  };

  const getPlayerItem = () => {
    if (item.category === "Waffen") { return getPlayerObj().weapon; }
    if (item.category === "Ausrüstung") { return getPlayerObj().armor; }
    return getPlayerObj().item;
  };
  const playerItem = getPlayerItem();
  const isEquipped = playerItem.name === item.name;

  return (
    <div
      className={`btn-border item-card text-left ${isActive ? "glow" : ""}`}
      onClick={handleClick}
      style={{ display: "inline-block", paddingTop: "2px", paddingBottom: "2px" }}
    >
      {mode === "buy" && (
        <BuyCard item={item} isEquipped={isEquipped} />
      )}

      {mode === "view" && (
        <ViewCard item={item} quantity={quantity} isEquipped={isEquipped} />
      )}

      {mode === "sell" && (
        <SellCard item={item} quantity={quantity} isEquipped={isEquipped} />
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

