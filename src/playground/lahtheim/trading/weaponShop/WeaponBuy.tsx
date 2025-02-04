// #region [imports]
import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import ActionButton from "../../../../layout/ActionButtons/ActionButton";
import { useNavigate } from "react-router-dom";
import {
  emptyWeaponObj,
  weapons,
} from "../../../../data/gameItems/weaponData";
import ItemCard from "../../../../layout/Cards/ItemCards";
import { Item } from "../../../../data/gameItems/ItemData";
import { GradientText } from "../../../../utility/Formatted/GradientText";
import { useRootStore } from "../../../../store";
import { SYSTEM } from "../../../../data/helper/colorfullStrings";
import Talk from "../../../../utility/Formatted/Talk";
// #endregion

// #region [prepare]
type WeaponBuyProps = {};

const WeaponBuy: React.FC<WeaponBuyProps> = observer(() => {
  const [localWeapon, setLocalWeapon] = useState<Item>(emptyWeaponObj);
  const { playerEconomy, getPlayerObj } = useRootStore();
  const navigate = useNavigate();

  const currentWeapon = getPlayerObj().weapon;
  const refund = currentWeapon.ek ? Number((currentWeapon.ek / 1.2).toFixed()) : 0;
  //#endregion


  //#region [helper]
  const handleBack = () => {
    navigate("/weapon-shop");
  };

  const handleClick = (weapon: Item) => {
    setLocalWeapon(weapon);
  };

  const canBuy = () => {
    const canBuy = playerEconomy.data.gold - (localWeapon.ek || 0);
    return canBuy >= 0 ? true : false;
  };

  const showText = () => {
    return canBuy() ? (
      <GradientText colors={["#53E8AD"]}>du es dir leisten kannst</GradientText>
    ) : (
      <GradientText colors={["#DB6575"]}>
        du es dir nicht leisten kannst
      </GradientText>
    );
  };
  // #endregion

  // #region [jsx]
  return (
    <div className="max-width">
      <h2>Waffen kaufen</h2>

      <p className="mb-1 text-left">
        Du zeigst interesse an <b>{localWeapon.name}</b> und liest an einem kleinen Schild, dass es <Talk color="rot">{localWeapon.ek}</Talk> {SYSTEM.Gold} kostet. Nach einem Blick in deinen Geldbeutel erkennst du dass, {showText()}. Der Verkäufer schaut dich erwartungsvoll an. Seine Blicke wandern zu deiner Hand, in der sich <b>{currentWeapon.name}</b> befindet. Er sagt: <GradientText colors={["#D1813B"]}>"Ich nehme es dir gerne ab, für</GradientText> <Talk color="grün">{refund}</Talk> {SYSTEM.Gold}."
      </p>

      <div className="category-section">
        {weapons.map((weapon: Item) =>
          weapon.name !== "Nichts" ? (
            <ItemCard item={weapon} mode="buy" key={weapon.name} onClick={handleClick} isActive={localWeapon.name === weapon.name} />
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
