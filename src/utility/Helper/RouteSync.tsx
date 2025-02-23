import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useRootStore } from "../../store";
import navigationMap from "../../NavigationList";
import { PathsGame } from "../../routings/pathsGame";


// Effekt 1: Speichere den Pfad im Store, sobald sich die URL ändert (sofern nicht ausgeschlossen).
// Effekt 2: Beim ersten Laden — soll der Pfad im Store und in der URL synchronisiert werden.
export const RouteSync: React.FC = observer(() => {
  const { gameState } = useRootStore();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const currentNavComponent = navigationMap[location.pathname];

    if (
      typeof currentNavComponent !== "undefined" &&
      !location.pathname.startsWith("/transit") &&
      !location.pathname.startsWith("/quest") &&
      !Object.values(PathsGame).includes(location.pathname as PathsGame) &&
      gameState.data.currentPath !== location.pathname
    ) {
      gameState.setCurrentPath(location.pathname);
    }
  }, [location.pathname]);

  useEffect(() => {
    if (location.pathname !== gameState.data.currentPath) {
      navigate(gameState.data.currentPath, { replace: true });
    }
  }, []);

  return null;
});