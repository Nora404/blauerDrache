// #region [imports]
import React from "react";
import { observer } from "mobx-react-lite";
import { WeightedEvent } from "../../../../../data/eventData";
import PlaceTemplate from "../../../../../layout/PlaceTemplate";
// #endregion

// #region [prepare]
const FountainBoardSwitch: React.FC = observer(() => {
	const possibleEvents: WeightedEvent[] = [
		// { eventId: "E003FindStoneTrigger", probability: 100, questId: "Q003FindStone" },
		// { eventId: "E004OneTrashTrigger", probability: 100, questId: "Q004OneTrash" },
	];

	const description = (
		<p className="mb-1 text-left">
			Du bemerkst einige mysteriöse Zettel, deren Aufträge vage formuliert sind und deren Folgen
			wohl dauerhaft die Welt um dich herum verändern könnten. Hier scheint es um mehr zu gehen, als
			nur einen schnellen Lohn zu verdienen. Vielleicht entdeckst du neue Geheimnisse, löst komplexe
			Rätsel oder beeinflusst das Leben anderer auf tiefgreifende Weise. Ein Hebel wird umgelegt,
			eine Entscheidung getroffen - und Lahtheim wird nie wieder dasselbe sein.
		</p>
	);

	// #endregion

	// #region [jsx]
	return (
		<div className="max-width">
			<PlaceTemplate
				title={<>PLACES.vergessen</>}
				description={description}
				backPath="/fountain-board"
				possibleEvents={possibleEvents}
			/>
		</div>
	);
	// #endregion
});

export default FountainBoardSwitch;
