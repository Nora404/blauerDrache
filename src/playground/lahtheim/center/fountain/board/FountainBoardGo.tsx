// #region [imports]
import React from "react";
import { observer } from "mobx-react-lite";
import { WeightedEvent } from "../../../../../data/eventData";
import PlaceTemplate from "../../../../../layout/PlaceTemplate";
// #endregion

// #region [prepare]
const FountainBoardGo: React.FC = observer(() => {
	const possibleEvents: WeightedEvent[] = [
		// { eventId: "E003FindStoneTrigger", probability: 100, questId: "Q003FindStone" },
		// { eventId: "E004OneTrashTrigger", probability: 100, questId: "Q004OneTrash" },
	];

	const description = (
		<p className="mb-1 text-left">
			Mit schnellen Blicken überfliegst du die Zettel am schwarzen Brett. Deine Augen suchen gezielt
			nach gezeichneten Karten - idealerweise solche, auf denen Schätze mit einem X markiert sind
			und nur darauf warten, von dir geborgen zu werden. Häufig wollen Gelehrte unbekannte Gebiete,
			Höhlen oder längst vergessene Ruinen erforschen, ohne selbst vor Ort zu sein. Deine Aufgabe
			besteht dann darin, diese Orte aufzusuchen, Skizzen anzufertigen oder neues Wissen ans Licht
			zu bringen.
		</p>
	);

	// #endregion

	// #region [jsx]
	return (
		<div className="max-width">
			<PlaceTemplate
				title={<b>Erkundung</b>}
				description={description}
				backPath="/fountain-board"
				possibleEvents={possibleEvents}
			/>
		</div>
	);
	// #endregion
});

export default FountainBoardGo;
