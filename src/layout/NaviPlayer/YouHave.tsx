import React from "react";
import { observer } from "mobx-react-lite";
import { useRootStore } from "../../store";
import { SYSTEM } from "../../data/helper/colorfullStrings";
import Header from "../Header/Header";

const YouHave: React.FC = observer(() => {
  const { playerEconomy, playerBase, getPlayerObj } = useRootStore();
  const selected = getPlayerObj();

  const handleConsume = () => {
    playerEconomy.consumeItem(selected.item.name);
  };

  return (
    <div>
      <Header>Das hast du</Header>
      <table style={{ paddingLeft: "20px", marginBottom: "5px" }}>
        <tbody>
          <tr>
            <td width={125}>{SYSTEM.Level}</td>
            <td>{playerBase.data.level}</td>
          </tr>
          <tr>
            <td>{SYSTEM.Erfahrung}</td>
            <td>
              {playerBase.data.exp} / {playerBase.data.nextLevel}
            </td>
          </tr>

          <tr>
            <td>{SYSTEM.Ruf}</td>
            <td>{playerBase.data.ruf}</td>
          </tr>
          <tr>
            <td>{SYSTEM.Leumund}</td>
            <td>
              {playerBase.data.leumund} / {playerBase.data.nextLeumund}
            </td>
          </tr>
          <tr>
            <td width={125}>{SYSTEM.Gold}</td>
            <td>{playerEconomy.data.gold || "0"}</td>
          </tr>
          <tr>
            <td>{SYSTEM.Edelsteine}</td>
            <td>{playerEconomy.data.edelsteine || "0"}</td>
          </tr>
          <tr>
            <td>{SYSTEM.Waffe}</td>
            <td>{selected.weapon.label || "Nichts"}</td>
          </tr>
          <tr>
            <td>{SYSTEM.Rüstung}</td>
            <td>{selected.armor.label || "Nichts"}</td>
          </tr>
          <tr>
            <td>{SYSTEM.HandDer}</td>
            <td>{selected.item.label || "Nichts"}</td>
          </tr>
        </tbody>
      </table>

      {selected.item.effects && (
        <button
          className="btn-border"
          style={{ width: "90%" }}
          onClick={handleConsume}
        >
          {selected.item.name} benutzen
        </button>
      )}
    </div>
  );
});

export default YouHave;
