// [NEU] Datei: EventManager.tsx

import React, { useState, useEffect } from "react";
import { WeightedEvent, GameEvent, GameAction } from "../data/eventData"; // Pfad anpassen
import { filterEventsByConditions, pickRandomNextEvent, getGameEventById } from "../utility/Helper/TriggerEvent"; // Pfad anpassen
import { useRootStore } from "../store"; // Pfad anpassen
import { useApplyGameAction } from "../utility/Hooks/ApplyGameAction"; // Pfad anpassen
import Combat from "./Combat"; // Pfad anpassen
import { parseDescription } from "../utility/Helper/ParseTextToJSX"; // Pfad anpassen

// [NEU] Platzhalter-Quest-Komponente – Ersetze sie mit deiner richtigen Quest-Komponente
function QuestPlaceholder({ questId }: { questId: string }) {
  return <div>Quest gestartet: {questId}</div>;
}

// [NEU] Props für den EventManager
type EventManagerProps = {
  events: WeightedEvent[];
  forcedEventId?: string; // Falls du ein Event zu 100% erzwingen willst
  onFinish?: () => void; // Optional: Callback wenn alles vorbei ist
};

// [NEU] Hauptkomponente EventManager
export const EventManager: React.FC<EventManagerProps> = ({
  events,
  forcedEventId,
  onFinish,
}) => {
  const { gameTime, gameState, playerStats, playerBase, playerFlux, playerMeta, playerEconomy } = useRootStore();

  // Wenn ein Kampf oder eine Quest gestartet wurde, speichern wir das in State
  const [currentBattleId, setCurrentBattleId] = useState<string | null>(null);
  const [currentQuestId, setCurrentQuestId] = useState<string | null>(null);

  // Unser aktuell ausgewähltes Event (nach Filterung/Zufall)
  const [currentEventId, setCurrentEventId] = useState<string | null>(null);

  // [NEU] Beim ersten Rendern ermitteln wir, ob forcedEventId gesetzt ist,
  //       oder wählen per Zufall aus dem gefilterten Event-Array
  useEffect(() => {
    if (events.length === 0) return;

    const validEvents = filterEventsByConditions(
      events,
      gameTime.data,
      gameState.data,
      playerStats.data,
      playerBase.data,
      playerFlux.data,
      playerMeta.data,
      playerEconomy.data
    );

    let chosenEventId: string | null = null;
    if (forcedEventId) {
      chosenEventId = forcedEventId;
    } else {
      chosenEventId = pickRandomNextEvent(validEvents);
    }

    if (chosenEventId) {
      setCurrentEventId(chosenEventId);
    } else {
      // Wenn kein Event passt, kannst du hier optional was tun
      if (onFinish) onFinish();
    }
  }, [
    events,
    forcedEventId,
    gameTime.data,
    gameState.data,
    playerStats.data,
    playerBase.data,
    playerFlux.data,
    playerMeta.data,
    playerEconomy.data,
    onFinish,
  ]);

  // [NEU] Wenn wir gerade einen Kampf haben, zeigen wir Combat
  if (currentBattleId) {
    return <Combat battleId={currentBattleId} />;
  }

  // [NEU] Wenn wir gerade eine Quest haben, zeige QuestPlaceholder (o. deine Komponente)
  if (currentQuestId) {
    return <QuestPlaceholder questId={currentQuestId} />;
  }

  // [NEU] Sonst rendern wir das aktuelle Event (falls vorhanden)
  if (currentEventId) {
    return (
      <EventRenderer
        eventId={currentEventId}
        onTriggerBattle={setCurrentBattleId}
        onTriggerQuest={setCurrentQuestId}
        onFinish={() => {
          // Wenn das Event (und evtl. Folge-Events) fertig ist
          if (onFinish) onFinish();
        }}
      />
    );
  }

  // [NEU] Falls nichts los ist, kannst du einen Platzhalter anzeigen
  return <div>Kein Event verfügbar</div>;
};

// [NEU] Kleine Hilfskomponente, die ein Event anzeigt und
//       bei Button-Klicks Aktionen ausführt (Kampf, Quest, Folge-Events)
type EventRendererProps = {
  eventId: string;
  onTriggerBattle: (battleId: string) => void;
  onTriggerQuest: (questId: string) => void;
  onFinish: () => void;
};

const EventRenderer: React.FC<EventRendererProps> = ({
  eventId,
  onTriggerBattle,
  onTriggerQuest,
  onFinish,
}) => {
  const event = getGameEventById(eventId);
  const { applyGameAction } = useApplyGameAction();
  const [currentEvent, setCurrentEvent] = useState<GameEvent | null>(event || null);

  // Falls das Event nicht gefunden wird
  if (!currentEvent) {
    return <div>Unbekanntes Event: {eventId}</div>;
  }

  // Beschreibungstext parsen
  const descriptionJSX = parseDescription(currentEvent.description);

  // [NEU] Wenn der Spieler einen Button klickt
  const handleButtonClick = (getAction: () => GameAction) => {
    const action = getAction();

    // Aktion ausführen (Buffs, Stats, Items usw.)
    applyGameAction(action);

    // Falls ein Kampf getriggert wird
    if (action.triggerBattle) {
      onTriggerBattle(action.triggerBattle);
      return;
    }

    // Falls eine Quest gestartet wird
    if (action.triggerQuest) {
      onTriggerQuest(action.triggerQuest);
      return;
    }

    // Falls ein Folge-Event kommt
    if (action.nextEvents && action.nextEvents.length > 0) {
      const nextEventId = pickRandomNextEvent(action.nextEvents);
      if (nextEventId) {
        const nextEvent = getGameEventById(nextEventId);
        if (nextEvent) {
          setCurrentEvent(nextEvent);
          return; // => Nächstes Event
        }
      }
    }

    // Wenn nichts mehr folgt, sind wir fertig
    onFinish();
  };

  // [NEU] Renderer
  return (
    <div className="max-width">
      <h3>{currentEvent.label || currentEvent.id}</h3>
      <div className="mb-1">{descriptionJSX}</div>

      {currentEvent.buttons.map((btn) => (
        <button
          key={btn.label}
          onClick={() => handleButtonClick(btn.getAction)}
          style={{ margin: "0.5rem" }}
        >
          {btn.label}
        </button>
      ))}
    </div>
  );
};
