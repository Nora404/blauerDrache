import React, { Suspense, useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import navigationMap from "../NavigationList";
import GameNavi from "../playground/game/game/GameNavi";
import InfoNavi from "../playground/game/infos/InfoNavi";
import TransitNavi from "./Transit/TransitNavi";
import { observer } from "mobx-react-lite";
import { useRootStore } from "../store";

const MainNavi: React.FC = observer(() => {
  const location = useLocation();
  const { gameState } = useRootStore();

  const currentNav = useMemo(() => {
    const pathName = location.pathname.split("/");
    if (pathName.length <= 2) {
      const NavComponent = navigationMap[gameState.data.currentPath];
      return NavComponent ? <NavComponent /> : undefined;
    }
    return (
      <TransitNavi
        target={pathName[2]}
        start={pathName[3]}
        steps={pathName[4]}
      />
    );
  }, [location.pathname, gameState.data.currentPath]);

  return (
    <Suspense fallback={<div>Lädt…</div>}>
      <div>
        <GameNavi />
        {gameState.data.creating && currentNav}
        {gameState.data.creating && <InfoNavi />}
      </div>
    </Suspense>
  );
});

export default MainNavi;
