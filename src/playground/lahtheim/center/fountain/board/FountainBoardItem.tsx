// #region [imports]
import React from "react";
import { observer } from "mobx-react-lite";
import { WeightedEvent } from "../../../../../data/eventData";
import PlaceTemplate from "../../../../../layout/PlaceTemplate";
// #endregion

// #region [prepare]
const FountainBoardItem: React.FC = observer(() => {
	const possibleEvents: WeightedEvent[] = [
		{ eventId: "E003FindStoneTrigger", probability: 100, questId: "Q003FindStone" },
		{ eventId: "E004OneTrashTrigger", probability: 100, questId: "Q004OneTrash" },
	];

	const description = (
		<p className="mb-1 text-left">
			Dein Blick wandert über die angepinnten Zettel. Einige hängen offensichtlich schon lange hier
			- ihr Text ist von der Sonne ausgeblichen, die Ränder von der morgendlichen Feuchtigkeit
			aufgeweicht. Dein Interesse gilt besonders Aufgaben, bei denen etwas besorgt werden soll:
			Materialien, Zutaten oder Trophäen. Die Menschen von Lahtheim suchen nach den
			unterschiedlichsten Gegenständen. Manche Anfragen erscheinen absurd, andere könnten eine
			hervorragende Gelegenheit sein, deinen Geldbeutel aufzufüllen …
		</p>
	);

	// #endregion

	// #region [jsx]
	return (
		<div className="max-width">
			<PlaceTemplate
				title={<b>Besorgen</b>}
				description={description}
				backPath="/fountain-board"
				possibleEvents={possibleEvents}
			/>
		</div>
	);
	// #endregion
});

export default FountainBoardItem;
