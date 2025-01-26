import React from "react";
import { observer } from "mobx-react-lite";
import { SYSTEM } from "../../data/helper/colorfullStrings";
import { useRootStore } from "../../store";
import Header from "../Header/Header";

type YouCanProps = {};

const YouCan: React.FC<YouCanProps> = observer(() => {
  const { getCombinedStats } = useRootStore();
  const combined = getCombinedStats();

  return (
    <div>
      <Header>Das kannst du</Header>
      <table style={{ paddingLeft: "20px", marginBottom: "25px" }}>
        <tbody>
          <tr>
            <td width={125}>{SYSTEM.Leben}</td>
            <td>
              {combined.life} / {combined.maxLife}
            </td>
          </tr>
          <tr>
            <td>{SYSTEM.Tatendrang}</td>
            <td>
              {combined.rounds} / {combined.maxRounds}
            </td>
          </tr>
          <tr>
            <td>{SYSTEM.Angriff}</td>
            <td>{combined.attack}</td>
          </tr>
          <tr>
            <td>{SYSTEM.Verteidigung}</td>
            <td>{combined.defense}</td>
          </tr>
          <tr>
            <td>{SYSTEM.Glück}</td>
            <td>{combined.luck}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
});

export default YouCan;
