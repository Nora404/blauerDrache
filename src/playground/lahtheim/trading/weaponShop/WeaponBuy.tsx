// #region [imports]
import React, { } from "react";
import { observer } from "mobx-react-lite";
import ActionButton from "../../../../layout/ActionButtons/ActionButton";
import { useNavigate } from "react-router-dom";
import {
  weapons,
} from "../../../../data/gameItems/weaponData";
import ItemCard from "../../../../layout/Cards/ItemCards";
import { Item } from "../../../../data/gameItems/ItemData";
// #endregion

// #region [prepare]
type WeaponBuyProps = {};

const WeaponBuy: React.FC<WeaponBuyProps> = observer(() => {
  const navigate = useNavigate();
  //#endregion


  //#region [helper]
  const handleBack = () => {
    navigate("/weapon-shop");
  };
  // #endregion

  // #region [jsx]
  return (
    <div className="max-width">
      <h2>Waffen kaufen</h2>
      <div className="category-section">
        {weapons.map((weapon: Item) =>
          weapon.name !== "Nichts" ? (
            <ItemCard item={weapon} mode="buy" key={weapon.name} />
          ) : null
        )}
      </div>
      <br />

      <ActionButton onClick={handleBack} label="Sich abwenden" />
    </div>
  );
  // #endregion
});

export default WeaponBuy;
