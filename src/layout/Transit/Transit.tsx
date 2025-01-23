//#region [imports]
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { GradientText } from "../../utility/Formatted/GradientText";
import {
  getPlaceLabelFromRoute,
  getPlaceNameFromRoute,
} from "../../routings/mappingPathToLabel";
import { getEventByPlace } from "../../utility/Helper/TriggerEvent";
import "./Transit.css";
import TwoActionButton from "../ActionButtons/TwoActionButton";
import { GameEventChain } from "../GameEventChain";
//#endregion

//#region [prepare]
type TransitProps = {};

const Transit: React.FC<TransitProps> = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { targetPath, startPath, steps } = useParams<{
    targetPath: string; // z.B. "path"
    startPath: string; // z.B. "north-gate"
    steps: string;
  }>();

  const initialSteps = Number(steps) || 5;
  const [currentSteps, setCurrentSteps] = useState<number>(initialSteps);
  const [eventChainActive, setEventChainActive] = useState<string | null>(null);

  const isAtStart = currentSteps === initialSteps;
  const isAtEnd = currentSteps === 1;
  //#endregion

  //#region [events]
  useEffect(() => {
    if (currentSteps <= 0) {
      navigate(`/${targetPath}`, { replace: true });
    }

    if (currentSteps >= initialSteps + 1) {
      const state = location.state as { from?: string } | undefined;
      if (state?.from) {
        navigate(state.from, { replace: true });
      } else {
        navigate(`/${startPath}`, { replace: true });
      }
    }
  }, [currentSteps, startPath, targetPath, location, initialSteps, navigate]);
  //#endregion

  //#region [handler]
  const handleGoForward = () => {
    setCurrentSteps((prev) => prev - 1);
    triggerPossibleEvent();
  };

  const handleGoBack = () => {
    setCurrentSteps((prev) => prev + 1);
    triggerPossibleEvent();
  };

  const handleFastForward = () => {
    setCurrentSteps(1);
  };

  const handleFastBack = () => {
    setCurrentSteps(initialSteps);
  };

  const handleFinishEventChain = () => {
    setEventChainActive(null);
  };
  //#endregion

  //#region [helpers]
  const currentStepIndex = initialSteps - currentSteps;

  const triggerPossibleEvent = () => {
    const placeName = getPlaceNameFromRoute(startPath);
    const gameEvent = getEventByPlace(placeName);
    if (gameEvent) {
      setEventChainActive(gameEvent.id);
    }
  };
  //#endregion

  //#region [jsx]
  return (
    <div className="max-width">
      <h2>
        Von {getPlaceLabelFromRoute(startPath || "")} nach{" "}
        {getPlaceLabelFromRoute(targetPath || "")}
      </h2>
      <p className="mb-1 text-left">
        Du ziehst los, um den nächsten Ort zu bereisen. Du stellst fest das du
        noch{" "}
        <b>
          <GradientText>{currentSteps}</GradientText>
        </b>{" "}
        Schritte brauchst um {getPlaceLabelFromRoute(targetPath || "")} zu
        erreichen. Du kannst dich auch einfach umdrehen und zu{" "}
        {getPlaceLabelFromRoute(startPath || "")} zurück gehen. Auf so einer
        Reise könntest du wertvolles finden: Reichtümer, Wissen oder einen
        qualvollen Tod. Du kannst auch schnell laufen, aber dann wird vermutlich
        nichts auf deinem Weg passieren.
      </p>
      <br />

      <div className="steps-container">
        {Array.from({ length: initialSteps }).map((_, index) => (
          // ist das gleiche wie <></> erzeugt keinen HTML Knoten (Bessere Performance)
          <React.Fragment key={index}>
            <div
              className={`step ${index === currentStepIndex ? "active" : ""}`}
            >
              {index === currentStepIndex ? "." : ""}
            </div>
            {index < initialSteps - 1 && <div className="step-line"></div>}
          </React.Fragment>
        ))}
      </div>
      <br />
      <br />

      {currentSteps > 0 && !eventChainActive && (
        <>
          <TwoActionButton
            onLeftAction={handleGoBack}
            leftBtn={isAtStart ? "vorheriges Gebiet" : "zurück"}
            onRightAction={handleGoForward}
            rightBtn={isAtEnd ? "nächstes Gebiet" : "weiter"}
          />
          <TwoActionButton
            onLeftAction={handleFastBack}
            leftBtn="schnell zurück"
            leftDisable={isAtStart}
            onRightAction={handleFastForward}
            rightBtn="schnell weiter"
            rightDisable={isAtEnd}
          />
        </>
      )}
      {currentSteps <= 0 && <p>Du hast dein Ziel erreicht ...</p>}
      <br />
      {eventChainActive ? (
        <GameEventChain
          initialEventName={eventChainActive}
          onFinishChain={handleFinishEventChain}
        />
      ) : (
        <p className="mb-1 text-left">
          Links von dir ist Umgebung, rechts von dir ist Umgebung – alles sieht
          völlig normal und unauffällig aus. Es ist schon fast langweilig, wie
          ereignislos die letzten Schritte waren. Du kannst deinen Weg unbeirrt
          weiter fortsetzen.
        </p>
      )}
      <br />
    </div>
  );
  //#endregion
};

export default Transit;
