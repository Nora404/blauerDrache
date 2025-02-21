// RouteSync.tsx
import { observer } from "mobx-react-lite";
import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useRootStore } from "../../store";
import navigationMap from "../../NavigationList";

export const RouteSync: React.FC = observer(() => {
  const { gameState } = useRootStore();
  const navigate = useNavigate();
  const location = useLocation();

  const isInitialMount = useRef(true);

  // Effekt 1: Store-Update NUR nach dem initialen Laden
  useEffect(() => {
    if (isInitialMount.current) {
      // Initialen Mount überspringen
      isInitialMount.current = false;
      return;
    }
    const currentNavComponent = navigationMap[location.pathname];
    if (
      typeof currentNavComponent !== "undefined" &&
      gameState.data.currentPath !== location.pathname
    ) {
      gameState.setCurrentPath(location.pathname);
    }
  }, [location.pathname, gameState.data.currentPath]);

  // Effekt 2: Beim Laden (und bei Änderungen) navigiere zum gespeicherten Pfad
  useEffect(() => {
    if (location.pathname !== gameState.data.currentPath) {
      navigate(gameState.data.currentPath, { replace: true });
    }
  }, [location.pathname, gameState.data.currentPath]);

  return null;
});
