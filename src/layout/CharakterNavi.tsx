import React from "react";
import Header from "./Header/Header";
import { observer } from "mobx-react-lite";
import { useRootStore } from "../store";
import YouAre from "./NaviPlayer/YouAre";
import YouCan from "./NaviPlayer/YouCan";
import YouHave from "./NaviPlayer/YouHave";

type CharakterNaviProps = {};

const CharakterNavi: React.FC<CharakterNaviProps> = observer(() => {
  const { gameState } = useRootStore();
  if (!gameState) return;

  return (
    <div>
      {gameState.data.creating && (
        <>
          <YouAre />
          <YouCan />
          <YouHave />
        </>
      )}
      {!gameState.data.creating && (
        <Header>Noch kein Charakter erstellt</Header>
      )}
    </div>
  );
});

export default CharakterNavi;
