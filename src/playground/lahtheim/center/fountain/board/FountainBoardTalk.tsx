// #region [imports]
import React from "react";
import { observer } from "mobx-react-lite";
import { WeightedEvent } from "../../../../../data/eventData";
import PlaceTemplate from "../../../../../layout/PlaceTemplate";
// #endregion

// #region [prepare]
const FountainBoardTalk: React.FC = observer(() => {
	const possibleEvents: WeightedEvent[] = [
		// { eventId: "E003FindStoneTrigger", probability: 100, questId: "Q003FindStone" },
		// { eventId: "E004OneTrashTrigger", probability: 100, questId: "Q004OneTrash" },
	];

	const description = (
		<p className="mb-1 text-left">
			Deine Blicke schweifen über die verschiedenen Zettel am schwarzen Brett. Flüchtig nimmst du
			vereinzelte Wortfetzen wahr, bevor deine Aufmerksamkeit bereits zum nächsten Zettel springt.
			Besonders interessieren dich Aufgaben, die eine spannende neue Begegnung versprechen. Oft wird
			nach bestimmten Personen gesucht - alten Liebschaften oder verlorenen Familienmitgliedern.
			Hinter solchen Gesuchen steckt meist eine bewegende Geschichte. So jedenfalls deine
			Vorstellung. Genauso gut könnte dich aber auch ein Flüchtling vor dem Gesetz erwarten oder
			eine Leiche … im besten Fall tatsächlich tot, denn der Auftraggeber wäre sicher wenig
			begeistert, wenn du mit einem Zombie zurückkehrst.
		</p>
	);

	// #endregion

	// #region [jsx]
	return (
		<div className="max-width">
			<PlaceTemplate
				title={<b>Begegnung</b>}
				description={description}
				backPath="/fountain-board"
				possibleEvents={possibleEvents}
			/>
		</div>
	);
	// #endregion
});

export default FountainBoardTalk;
