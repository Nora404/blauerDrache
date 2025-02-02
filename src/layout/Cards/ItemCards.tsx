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

  const handleClick = () => {
    setShowDetails((prev) => !prev);
  };


  return (
    <div
      className="btn-border item-card"
      onClick={handleClick}
      style={{ display: "inline-block" }}
    >
      {mode === "buy" && (
        <BuyCard item={item} showDetails={showDetails} />
      )}

      {mode === "view" && (
        <ViewCard item={item} showDetails={showDetails} quantity={quantity} />
      )}
    </div>
  );
};

export default ItemCard;


export function getItemEffectText(item: Item) {
  const effectElements = [];

  if (item.life) {
    effectElements.push(
      <>
        {SYSTEM.Leben}: {item.life}
        <br />
      </>
    );
  }
  if (item.actionPoints) {
    effectElements.push(
      <>
        {SYSTEM.Aktionen}: {item.actionPoints}
        <br />
      </>
    );
  }
  if (item.attack) {
    effectElements.push(
      <>
        {SYSTEM.Angriff}: {item.attack}
        <br />
      </>
    );
  }
  if (item.defense) {
    effectElements.push(
      <>
        {SYSTEM.Verteidigung}: {item.defense}
        <br />
      </>
    );
  }
  if (item.luck) {
    effectElements.push(
      <>
        {SYSTEM.Glück}: {item.luck}
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

  return (
    <div style={{ marginBottom: "4px" }}>
      {effectElements}
    </div>
  );
}
