import React, { useEffect, useState } from "react";
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

  const [currentNav, setCurrentNav] = useState<JSX.Element | undefined>(
    undefined
  );

  useEffect(() => {
    const pathName = location.pathname.split("/");

    const NavComponent = navigationMap[gameState.data.currentPath];
    if (NavComponent && pathName.length <= 2) {
      setCurrentNav(<NavComponent />);
    } else if (pathName.length > 2) {
      const navi = (
        <TransitNavi
          target={pathName[2]}
          start={pathName[3]}
          steps={pathName[4]}
        />
      );
      setCurrentNav(navi);
    }
  }, [location.pathname]);

  return (
    <div>
      <GameNavi />
      {gameState.data.creating && currentNav}
      {gameState.data.creating && <InfoNavi />}
    </div>
  );
});

export default MainNavi;
