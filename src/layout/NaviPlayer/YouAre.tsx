import React from "react";
import { observer } from "mobx-react-lite";
import { useRootStore } from "../../store";
import { GradientText } from "../../utility/Formatted/GradientText";
import Header from "../Header/Header";

type YouAreProps = {};

const YouAre: React.FC<YouAreProps> = observer(() => {
  const { playerMeta, getPlayerObj } = useRootStore();
  const selected = getPlayerObj();

  return (
    <div>
      <Header>Das bist du</Header>
      <table style={{ paddingLeft: "20px", marginBottom: "25px" }}>
        <tbody>
          <tr>
            <td width={125}>Name</td>
            <td>{playerMeta.data.name}</td>
          </tr>
          <tr>
            <td>Rasse</td>
            <td>{selected.race.label}</td>
          </tr>
          <tr>
            <td>Herkunft</td>
            <td>{selected.origin.label}</td>
          </tr>
          <tr>
            <td>Berufung</td>
            <td>{selected.calling.label}</td>
          </tr>
          <tr>
            <td>Titel</td>
            <td>
              <GradientText>{playerMeta.data.titel}</GradientText>
            </td>
          </tr>
          <tr>
            <td>Stimmung</td>
            <td>{selected.feeling.label}</td>
          </tr>
          <tr>
            <td>Buff</td>
            <td>
              <span
                className={selected.buffs.length > 0 ? "text-green" : "text-gray"}
              >
                {selected.buffs.length} aktiv
              </span>
            </td>
          </tr>
          <tr>
            <td>Debuff</td>
            <td>
              <span
                className={selected.debuffs.length > 0 ? "text-red" : "text-gray"}
              >
                {selected.debuffs.length} aktiv
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
});

export default YouAre;
