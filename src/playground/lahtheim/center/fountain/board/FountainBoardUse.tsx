// #region [imports]
import React from "react";
import { observer } from "mobx-react-lite";
import { WeightedEvent } from "../../../../../data/eventData";
import PlaceTemplate from "../../../../../layout/PlaceTemplate";
import { GradientText } from "../../../../../utility/Formatted/GradientText";
import { yellowColors } from "../../../../../data/helper/colorMappingData";
// #endregion

// #region [prepare]
const FountainBoardUse: React.FC = observer(() => {
	const possibleEvents: WeightedEvent[] = [
		{ eventId: "E003FindStoneTrigger", probability: 100, questId: "Q003FindStone" },
		{ eventId: "E004OneTrashTrigger", probability: 100, questId: "Q004OneTrash" },
	];

	const description = (
		<>
			<p className="mb-1 text-left">
				Dein Blick wandert über die angepinnten Zettel. Einige hängen offensichtlich schon lange
				hier - ihr Text ist von der <GradientText colors={yellowColors}>Sonne</GradientText>{" "}
				ausgeblichen, und die Ränder sind von der morgendlichen{" "}
				<GradientText colors={["#99D9EA", "#9697FF", "#C8E9FF"]}>Feuchtigkeit</GradientText>{" "}
				aufgeweicht.
			</p>
			<p className="mb-1 text-left">
				Dein Interesse gilt besonders den Aufgaben, bei denen etwas <b>besorgt</b> werden soll:
				Materialien, Zutaten oder Trophäen. Die Menschen von Lahtheim suchen nach den
				unterschiedlichsten Gegenständen. Manche Anfragen erscheinen absurd, andere könnten eine
				gute Möglichkeit sein, deinen Geldbeutel zu füllen …
			</p>
		</>
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

export default FountainBoardUse;
