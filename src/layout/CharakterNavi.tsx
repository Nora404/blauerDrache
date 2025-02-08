import React, { Suspense } from "react";
import Header from "./Header/Header";
import { observer } from "mobx-react-lite";
import { useRootStore } from "../store";
import YouAre from "./NaviPlayer/YouAre";
import YouCan from "./NaviPlayer/YouCan";
import YouHave from "./NaviPlayer/YouHave";

const CharakterNavi: React.FC = observer(() => {
  const { gameState } = useRootStore();
  if (!gameState) return;

  return (
    <Suspense fallback={<div>Lädt…</div>}>
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
    </Suspense>
  );
});

export default CharakterNavi;
