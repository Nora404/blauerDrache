// RouteSync.tsx
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useRootStore } from "../../store";
import navigationMap from "../../NavigationList";


export const RouteSync: React.FC = observer(() => {
  const { gameState } = useRootStore();
  const navigate = useNavigate();
  const location = useLocation();

  // Effekt 1: Speichere den Pfad im Store, sobald sich die URL ändert (sofern nicht ausgeschlossen).
  useEffect(() => {
    const currentNavComponent = navigationMap[location.pathname]; // kann undefined sein
    // # Änderung: explizite Prüfung, ob currentNavComponent !== undefined
    if (typeof currentNavComponent !== 'undefined' && gameState.data.currentPath !== location.pathname) {
      gameState.setCurrentPath(location.pathname);
    }
  }, [location.pathname, gameState, gameState.data.currentPath]);

  // Effekt 2: Beim ersten Laden — oder wenn die Komponente gemountet wird —
  // vergleiche den actualPath mit dem gespeicherten `currentPath`.
  // Weiche ab -> navigiere dorthin.
  useEffect(() => {
    if (location.pathname !== gameState.data.currentPath) {
      navigate(gameState.data.currentPath, { replace: true });
    }
  }, []);

  return null; // Diese Komponente rendert nichts, kümmert sich nur um die Synchro
});
