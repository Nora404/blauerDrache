// #region [imports]
import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import MultiColoredLetters from "../../../../utility/Formatted/MultiColoredLetters";
import { yellowColors } from "../../../../data/helper/colorMappingData";
import ActionButton from "../../../../layout/ActionButtons/ActionButton";
import { useNavigate } from "react-router-dom";
import {
  Weapon,
  emptyWeaponObj,
  WeaponName,
  weapons,
} from "../../../../data/gameItems/weaponData";
import { SYSTEM } from "../../../../data/helper/colorfullStrings";
import { useRootStore } from "../../../../store";
import { GradientText } from "../../../../utility/Formatted/GradientText";
import Talk from "../../../../utility/Formatted/Talk";
import ItemCard from "../../../../layout/Cards/ItemCards";
// #endregion

// #region [prepare]
type WeaponBuyProps = {};

const WeaponBuy: React.FC<WeaponBuyProps> = observer(() => {
  const navigate = useNavigate();
  const [localWeapon, setLocalWeapon] = useState<Weapon>(emptyWeaponObj);
  const { getPlayerObj, playerEconomy, playerFlux } = useRootStore();
  const selected = getPlayerObj();

  const exchangePrice = (selected.weapon.ek / 1.2).toFixed();
  //#endregion

  //#region [handler]
  const handleClick = (Weapon: Weapon) => {
    setLocalWeapon(Weapon);
  };

  const handleBuy = () => {
    playerEconomy.updatePlayerEconomy({
      gold: Number(exchangePrice) - localWeapon.ek,
    });
    playerEconomy.updateItems(localWeapon.name, 1);
    playerFlux.updateWeapon(localWeapon.name as WeaponName);
  };
  //#endregion

  //#region [helper]
  const canBuy = () => {
    const canBuy = playerEconomy.data.gold - localWeapon.ek;
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

  const handleBack = () => {
    navigate("/weapon-shop");
  };
  // #endregion

  // #region [jsx]
  return (
    <div className="max-width">
      <h2>Waffen kaufen</h2>
      {weapons.map((weapon: Weapon) => (
        <ItemCard item={weapon} mode="buy" key={weapon.name}/>
      ))}
      <br />

      <div className="text-left">
        Du zeigst interesse an {localWeapon.label}&nbsp;
        {localWeapon.name !== "Nichts" && (
          <>
            und liest auf einem kleinen Schild daneben den Preis von{" "}
            <GradientText colors={["#FFE452"]}>{localWeapon.ek}</GradientText>.
            Nach einem Blick in deinen Goldbeutel ernnst du, dass {showText()}
            .&nbsp;
          </>
        )}
        Der Verkäufer schaut dich erwartungsvoll an.
        {localWeapon.name !== "Nichts" && (
          <>
            <GradientText colors={["#D1813B"]}>"Für </GradientText>
            {selected.weapon.label}
            <GradientText colors={["#D1813B"]}>
              {" "}
              wäre ich bereit im Tausch{" "}
            </GradientText>
            <GradientText colors={["#FFE452"]}>{exchangePrice}</GradientText>
            <GradientText colors={["#D1813B"]}> Gold zu bezahlen"</GradientText>
          </>
        )}
      </div>
      <br />

      {localWeapon.name !== "Nichts" && canBuy() ? (
        <ActionButton onClick={handleBuy} label="kaufen" />
      ) : (
        <ActionButton disable={true} label="kaufen" />
      )}

      <ActionButton onClick={handleBack} label="Sich abwenden" />
    </div>
  );
  // #endregion
});

export default WeaponBuy;
