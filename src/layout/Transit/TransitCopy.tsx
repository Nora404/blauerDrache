//#region [imports]
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { GradientText } from "../../utility/Formatted/GradientText";
import { getPlaceLabelFromRoute, getPlaceNameFromRoute, getPlaceTextFromRoute } from "../../routings/mappingPathToLabel";
import { getEventByPlace } from "../../utility/Event/TriggerEvent";
import "./Transit.css";
import TwoActionButton from "../ActionButtons/TwoActionButton";
import { EventManager } from "../Events/EventManager";
import { WeightedEvent } from "../../data/eventData";
//#endregion

//#region [prepare]


const placeColors: Record<string, string> = {
	"path": "#DEB887",
	"north-gate": "#bbbbbb",
	"forest-edge": "#96c795",
	"forest": "#228B22",
};

const edgeAngleMap: Record<string, number> = {
	N: 0,
	NE: 45,
	E: 90,
	SE: 315,
	S: 0,
	SW: 45,
	W: 270,
	NW: 315,
};

const directionPositions: Record<string, { x: number; y: number }> = {
	N: { x: 50, y: 0 },
	NE: { x: 85, y: 15 },
	E: { x: 100, y: 50 },
	SE: { x: 85, y: 85 },
	S: { x: 50, y: 100 },
	SW: { x: 15, y: 85 },
	W: { x: 0, y: 50 },
	NW: { x: 15, y: 15 },
};

const Transit: React.FC = () => {
	const navigate = useNavigate();
	const location = useLocation();

	const {
		targetPath,  // z.B. "path"
		startPath,   // z.B. "north-gate"
		steps,       // z.B. "6"
		targetPos,   // z.B. "n"
		startPos,    // z.B. "s"
	} = useParams<{
		targetPath: string;
		startPath: string;
		steps: string;
		targetPos: string;
		startPos: string;
	}>();

	const initialSteps = Number(steps) || 5;
	const [currentSteps, setCurrentSteps] = useState<number>(initialSteps);

	const targetColor = placeColors[targetPath ?? ""] ?? "#ccc";
	const startColor = placeColors[startPath ?? ""] ?? "#ccc";

	const targetDirPos = directionPositions[targetPos ?? ""] ?? { x: 50, y: 0 };
	const startDirPos = directionPositions[startPos ?? ""] ?? { x: 50, y: 100 };

	const [eventChainActive, setEventChainActive] = useState<WeightedEvent[]>([]);

	const isAtStart = currentSteps === initialSteps;
	const isAtEnd = currentSteps === 1;

	const LABEL_OFFSET = 0.9;

	// Für das Start-Label nehmen wir startDirPos:
	const startLabelPos = {
		x: 50 + (startDirPos.x - 50) * LABEL_OFFSET,
		y: 50 + (startDirPos.y - 50) * LABEL_OFFSET,
	};

	// Für das Ziel-Label nehmen wir targetDirPos:
	const targetLabelPos = {
		x: 50 + (targetDirPos.x - 50) * LABEL_OFFSET,
		y: 50 + (targetDirPos.y - 50) * LABEL_OFFSET,
	};

	const startAngle = edgeAngleMap[startPos ?? ''] ?? 0;
	const targetAngle = edgeAngleMap[targetPos ?? ''] ?? 180;
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
		setEventChainActive([]);
	};
	//#endregion

	//#region [helpers]
	const triggerPossibleEvent = () => {
		// Erstmal deaktiviert um zu testen
		// const placeName = getPlaceNameFromRoute(startPath);
		// const gameEvent = getEventByPlace(placeName);
		// if (gameEvent) {
		// 	const activeEvent: WeightedEvent = {
		// 		eventId: gameEvent.id,
		// 		probability: 100,
		// 	};
		// 	setEventChainActive([activeEvent]);
		// }
	};

	const getStepCoordinates = (stepIndex: number) => {
		const center = { x: 50, y: 50 };
		const half = Math.ceil(initialSteps / 2);

		if (stepIndex <= half) {
			// Interpoliert Start -> Mitte
			const fraction = stepIndex / half;
			return {
				x: startDirPos.x + (center.x - startDirPos.x) * fraction,
				y: startDirPos.y + (center.y - startDirPos.y) * fraction,
			};
		} else {
			// Interpoliert Mitte -> Ziel
			const fraction = (stepIndex - half) / ((initialSteps - half) + 1);
			return {
				x: center.x + (targetDirPos.x - center.x) * fraction,
				y: center.y + (targetDirPos.y - center.y) * fraction,
			};
		}
	};
	//#endregion


	//#region [NEU] CSS-Styles für das 8-Eck + Farbverläufe
	// Erzeugt den Style für den Container, in dem zwei Radial-Verläufe übereinandergelegt werden.
	const octagonBackgroundStyle: React.CSSProperties = {
		clipPath: `polygon(
		  30% 0%,
		  70% 0%,
		  100% 30%,
		  100% 70%,
		  70% 100%,
		  30% 100%,
		  0% 70%,
		  0% 30%
		)`,
		background: `
		  radial-gradient(
			circle at ${startDirPos.x}% ${startDirPos.y}%,
			${startColor},
			transparent 60%
		  ),
		  radial-gradient(
			circle at ${targetDirPos.x}% ${targetDirPos.y}%,
			${targetColor},
			transparent 60%
		  )
		`,
		backgroundSize: "100% 100%",
		backgroundRepeat: "no-repeat",
		position: "relative",
		maxWidth: "400px",
		maxHeight: "400px",
		margin: "0 auto",
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
				Du ziehst los, um den nächsten Ort zu bereisen. Du stellst fest das du noch{" "}
				<b>
					<GradientText>{currentSteps}</GradientText>
				</b>{" "}
				Schritte brauchst um {getPlaceLabelFromRoute(targetPath || "")} zu erreichen. Du kannst dich
				auch einfach umdrehen und zu {getPlaceLabelFromRoute(startPath || "")} zurück gehen. Auf so
				einer Reise könntest du wertvolles finden: Reichtümer, Wissen oder einen qualvollen Tod. Du
				kannst auch schnell laufen, aber dann wird vermutlich nichts auf deinem Weg passieren.
			</p>
			<br />

			{/* <div className="steps-container">
				{Array.from({ length: initialSteps }).map((_, index) => (
					// ist das gleiche wie <></> erzeugt keinen HTML Knoten (Bessere Performance)
					<React.Fragment key={index}>
						<div className={`step ${index === currentStepIndex ? "active" : ""}`}>
							{index === currentStepIndex ? "." : ""}
						</div>
						{index < initialSteps - 1 && <div className="step-line"></div>}
					</React.Fragment>
				))}
			</div> */}


			{/* [NEU] Unser Container mit Oktagon und Farbverläufen */}
			<div className="octagon-container" style={octagonBackgroundStyle}>
				<svg viewBox="0 0 100 100" style={{ width: "100%", height: "100%" }} >
					{/* Linie Start -> Mitte */}
					<line
						x1={startDirPos.x}
						y1={startDirPos.y}
						x2={50}
						y2={50}
						stroke="#333"
						strokeWidth="0.5"
					/>
					{/* Linie Mitte -> Ziel */}
					<line
						x1={50}
						y1={50}
						x2={targetDirPos.x}
						y2={targetDirPos.y}
						stroke="#333"
						strokeWidth="0.5"
					/>

					{/* Schritte als Kreise */}
					{Array.from({ length: initialSteps }, (_, i) => i + 1).map((stepIndex) => {
						const { x, y } = getStepCoordinates(stepIndex);
						const isActive = currentSteps === (initialSteps - stepIndex + 1);
						return (
							<circle
								key={stepIndex}
								cx={x}
								cy={y}
								r={isActive ? 2.5 : 2}
								fill={isActive ? "#FFF" : "#000"}
								stroke="#333"
								strokeWidth="0.2"
							/>
						);
					})}

					{/* Start-Label */}
					<text
						x={startLabelPos.x}
						y={startLabelPos.y}
						textAnchor="middle"
						fontSize="4"
						fill="#000" // Textfarbe
						stroke="#fff" // Rahmenfarbe (Hintergrund-Effekt)
						strokeWidth="1" // Stärke des Rahmens
						paintOrder="stroke" // Zeichnet zuerst den Rahmen, dann den Text
						transform={`
							rotate(${startAngle}, ${startLabelPos.x}, ${startLabelPos.y})
						  `}
					>
						{getPlaceTextFromRoute(startPath ?? 'start')}
					</text>

					{/* Ziel-Label */}
					<text
						x={targetLabelPos.x}
						y={targetLabelPos.y}
						textAnchor="middle"
						fontSize="4"
						fill="#000" // Textfarbe
						stroke="#fff" // Rahmenfarbe (Hintergrund-Effekt)
						strokeWidth="1" // Stärke des Rahmens
						paintOrder="stroke" // Zeichnet zuerst den Rahmen, dann den Text
						transform={`
							rotate(${targetAngle}, ${targetLabelPos.x}, ${targetLabelPos.y})
						  `}
					>
						{getPlaceTextFromRoute(targetPath ?? 'ziel')}
					</text>
				</svg>
			</div>


			<br />
			<br />

			{currentSteps > 0 && eventChainActive.length < 1 && (
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
				<EventManager events={eventChainActive} onFinish={handleFinishEventChain} backBtn={false} />
			) : (
				<p className="mb-1 text-left">
					Links von dir ist Umgebung, rechts von dir ist Umgebung – alles sieht völlig normal und
					unauffällig aus. Es ist schon fast langweilig, wie ereignislos die letzten Schritte waren.
					Du kannst deinen Weg unbeirrt weiter fortsetzen.
				</p>
			)}
			<br />
		</div>
	);
	//#endregion
};

export default Transit;