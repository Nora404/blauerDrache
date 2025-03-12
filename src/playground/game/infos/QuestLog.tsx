// #region [imports]
import { emptyQuest, getGameQuestById, HaveItem, Progress } from "../../../data/questData";
import ActionButton from "../../../layout/ActionButtons/ActionButton";
import { useCallback } from "react";
import { observer } from "mobx-react-lite";
import { useRootStore } from "../../../store";
import { parseDescription } from "../../../utility/Helper/ParseTextToJSX";
import { redColors } from "../../../data/helper/colorMappingData";
// #endregion

// #region [prepare]
const Questlog: React.FC = observer(() => {
	const { playerQuest, gameState } = useRootStore();
	// #endregion

	// #region [handler]
	const handleAbandon = useCallback(
		(questId: string) => {
			playerQuest.updateQuest(questId, true);
		},
		[playerQuest]
	);

	const handleClick = () => {
		console.log("Aktive: ", Object.entries(playerQuest.data.activeQuests));
		console.log("Wartet: ", Object.entries(gameState.data.currentEventQueue));
		console.log("Fertig: ", Object.keys(playerQuest.data.completedQuest));
	};
	// #endregion

	// #region [jsx]
	return (
		<div className="max-width">
			<h2>Deine Aufgaben</h2>
			<p className="mb-1 text-left">
				Du hast ein kleines Büchlein bei dir, doch anstatt Einkaufszettel oder Gedichte hältst du
				darin deine Aufgaben fest. Wer könnte sich schon all die Orte und Namen ohne Hilfsmittel
				merken? Zwischen den Seiten stecken die abgerissenen Zettel deiner Auftraggeber, sorgsam
				verwahrt, damit du keinen Auftrag aus den Augen verlierst.
			</p>
			<br />
			{playerQuest.data.activeQuests ? (
				<div className="flex-warp">
					{Object.entries(playerQuest.data.activeQuests).map(([questId, currentProgress]) => {
						const questObject = getGameQuestById(questId) || emptyQuest;
						return (
							<div key={questId} className="text-center questbox paper flex-quest">
								<div>
									<strong className="text-yellow">{questObject.label}</strong>
									<p className="mb-1">{parseDescription(questObject.description)}</p>
									<p className="mb-1">{parseDescription(questObject.reward)}</p>
								</div>
								<div>
									<p className={currentProgress.isDone ? "text-green" : "text-white"}>
										{renderTask(currentProgress)}
										<br />
									</p>
									<ActionButton
										onClick={() => {
											handleAbandon(questObject.id);
										}}
										color={redColors}
										bgColor="red"
										label="Aufgeben"
									/>
								</div>
							</div>
						);
					})}
				</div>
			) : (
				<p>Keine aktiven Aufgaben</p>
			)}
			<br />
			<ActionButton onClick={handleClick} label="Debug" />
		</div>
	);
	// #endregion
});

export default Questlog;

const renderTask = (quest: Progress) => {
	switch (quest.type) {
		case "Begegnung":
			return <span>Triff dich mit {quest.task.label ?? "der gesuchten Person"}.</span>;
		case "Besorgen":
			return (
				<>
					{quest.task.haveItem?.map((item: HaveItem) => (
						<span key={item.item}>
							Besorge {item.need}x {item.item}, du hast {item.count} besorgt.
						</span>
					))}
				</>
			);

		default:
			break;
	}
};
