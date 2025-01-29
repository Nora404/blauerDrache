//#region [imports]
import React, { useState } from "react";
import { GradientText } from "../../../../utility/Formatted/GradientText";

import ActionButton from "../../../../layout/ActionButtons/ActionButton";
import { observer } from "mobx-react-lite";
import { useRootStore } from "../../../../store";
import { SYSTEM } from "../../../../data/helper/colorfullStrings";
import Talk from "../../../../utility/Formatted/Talk";
import {
  Weapon,
  emptyWeaponObj,
  WeaponName,
  weapons,
} from "../../../../data/gameItems/weaponData";
import { useNavigate } from "react-router-dom";
//#endregion

//#region [prepare]
const WeaponShop: React.FC = observer(() => {
  const navigate = useNavigate();

  //#endregion

  //#region [handler]
  const handleGoSell = () => {
    navigate("/weapon-sell");
  };

  const handleGoBuy = () => {
    navigate("/weapon-buy");
  };
  //#endregion

  //#region [jsx]
  return (
    <div className="max-width">
      <h2>Waffen Laden</h2>
      <p className="mb-1 text-left">
        Schwerfällig und mit lautem Quietschen öffnet sich die Tür zum
        Waffenladen. Du bist dir nicht sicher, ob hier Waffen oder
        Haushaltsgegenstände verkauft werden. Neben Messern liegen auch Löffel,
        Seile, ein Tischholzbein und Glasflaschen. Die offenen Regale, welche
        mitten im Raum stehen, führen dich weiter in den Raum hinein. In einer
        Ecke des Ladens steht ein Raumtrenner, hinter dem ein sanftes grünes
        Leuchten schimmert. Bevor du dich ihm nähern kannst kommt ein stämmiger
        Mann mittleren Alters und frei von Kopfhaaren, die dafür gleichmäßig auf
        seinem Arm verteilt sind, auf dich zu.
        <br />
        <GradientText colors={["#D1813B"]}>
          {" "}
          „Wie kann ich dir helfen? Brauchst du Waffen, um auf's Feld zu ziehen
          oder finden deine Schlachten in der Küche statt, was meiner Meinung
          nach VIEL gefährlicher ist!“{" "}
        </GradientText>
        Er scheint sich sehr über seinen Witz zu amüsieren, breitet beide Arme
        aus und lädt dich ein, in seinen Waren zu stöbern - und vor allem zu
        kaufen.
      </p>
      <br />

      <ActionButton onClick={handleGoBuy} label="Waffen kaufen" />
      <ActionButton onClick={handleGoSell} label="Waffen verkaufen" />
    </div>
  );
  //#endregion
});

export default WeaponShop;
