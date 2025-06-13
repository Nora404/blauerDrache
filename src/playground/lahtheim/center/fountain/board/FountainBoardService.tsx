// #region [imports]
import React from "react";
import { WeightedEvent } from "../../../../../data/eventData";
import PlaceTemplate from "../../../../../layout/PlaceTemplate";
import { observer } from "mobx-react-lite";
import { CREATURE } from "../../../../../data/helper/colorfullStrings";
import Talk from "../../../../../utility/Formatted/Talk";
// #endregion

// #region [prepare]
const FountainBoardService: React.FC = observer(() => {
	const possibleEvents: WeightedEvent[] = [];

	const description = (
		<p className="mb-1 text-left">
			Du wendest dich der kleinen Truhe zu, die unter dem schwarzen Brett steht. Neben ihr flattert
			ein kleines {CREATURE.geflügeltesWesen}. Du hast längst erkannt, dass diese Truhe
			diebstahlsicher ist - nur Gegenstände, die für einen Auftrag bestimmt sind, finden hier ihren
			Platz. Das {CREATURE.geflügelteWesen} scheint genau darauf zu achten und deine erledigten
			Aufgaben entgegennehmen zu wollen. Auf einem kleinen Etikett könntest du vermutlich die Worte{" "}
			<Talk color="weiß">„Quest Service“</Talk> lesen - wenn es nicht so winzig wäre und das Wesen
			nicht unaufhörlich hin und her flattern würde.
		</p>
	);
	// #endregion

	// #region [jsx]
	return (
		<div className="max-width">
			<PlaceTemplate
				title={<b>Quest Service</b>}
				description={description}
				backPath="/fountain-board"
				possibleEvents={possibleEvents}
			/>
		</div>
	);
	// #endregion
});

export default FountainBoardService;
