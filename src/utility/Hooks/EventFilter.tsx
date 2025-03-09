//#region [import]
import { useMemo } from "react";
import { useRootStore } from "../../store";
import { Conditions, EventActionButtons, WeightedEvent } from "../../data/eventData";
import { getGameQuestById } from "../../data/questData";
import {
	GameTime,
	GameState,
	PlayerStats,
	PlayerBase,
	PlayerFlux,
	PlayerMeta,
	PlayerEconomy,
} from "../../store/types";
import { checkGameState } from "../Event/CheckGameStateConditions";
import { checkGameTime } from "../Event/CheckGameTimeConditions";
import { checkPlayerBase } from "../Event/CheckPlayerBaseConditions";
import { checkPlayerEconomy } from "../Event/CheckPlayerEconomyConditions";
import { checkPlayerFlux } from "../Event/CheckPlayerFluxConditions";
import { checkPlayerMeta } from "../Event/CheckPlayerMetaConditions";
import { checkPlayerStats } from "../Event/CheckPlayerStatsConditions";
//#endregion

//#region [filter]
export function useEventFilter(events: WeightedEvent[]): WeightedEvent[] {
	const {
		gameTime,
		gameState,
		playerStats,
		playerBase,
		playerFlux,
		playerMeta,
		playerQuest,
		playerEconomy,
	} = useRootStore();

	const filteredEvents = useMemo(() => {
		return events.filter((evt) => {
			// Prüfung ob eine mögliche Quest bereits abgeschlossen ist oder aktiv ist.
			if (evt.questId) {
				const questDef = getGameQuestById(evt.questId);
				if (questDef) {
					const isDone = playerQuest.data.completedQuest.includes(evt.questId);
					if (isDone && questDef.repeat === false) {
						return false;
					}

					const isActive = Boolean(playerQuest.data.activeQuests[evt.questId]);
					if (isActive) {
						return false;
					}
				}
			}

			// Gibt es keine Bedingungen ist das Event immer gültig.
			if (!evt.conditions) return true;

			// Prüfung
			const pass = checkAllConditions(
				evt.conditions,
				gameTime.data,
				gameState.data,
				playerStats.data,
				playerBase.data,
				playerFlux.data,
				playerMeta.data,
				playerEconomy.data
			);
			if (!pass) return false;

			// Wenn alle Bedingungen erfüllt sind,
			// wird das Event in die Liste der gültigen Events aufgenommen.
			return true;
		});
	}, [events, gameState.data, gameTime.data, playerBase.data, playerEconomy.data, playerFlux.data, playerMeta.data, playerQuest.data.completedQuest, playerStats.data]);

	return filteredEvents;
}

export function useButtonFilter(buttons: EventActionButtons[]) {
	const { gameTime, gameState, playerStats, playerBase, playerFlux, playerMeta, playerEconomy } =
		useRootStore();

	const filterButtons = buttons.filter((btn) => {
		return checkAllConditions(
			btn.conditions,
			gameTime.data,
			gameState.data,
			playerStats.data,
			playerBase.data,
			playerFlux.data,
			playerMeta.data,
			playerEconomy.data
		);
	});

	return filterButtons;
}
//#endregion

//#region [check conditions]
export function checkAllConditions(
	conditions: Conditions | undefined,
	gameTimeData: GameTime,
	gameStateData: GameState,
	playerStatsData: PlayerStats,
	playerBaseData: PlayerBase,
	playerFluxData: PlayerFlux,
	playerMetaData: PlayerMeta,
	playerEconomyData: PlayerEconomy
): boolean {
	// Falls gar keine conditions gesetzt sind, ist alles ok:
	if (!conditions) return true;

	if (conditions.gameTime && !checkGameTime(conditions, gameTimeData)) return false;
	if (conditions.gameState && !checkGameState(conditions, gameStateData)) return false;
	if (conditions.playerStats && !checkPlayerStats(conditions, playerStatsData)) return false;
	if (conditions.playerBase && !checkPlayerBase(conditions, playerBaseData)) return false;
	if (conditions.playerMeta && !checkPlayerMeta(conditions, playerMetaData)) return false;
	if (conditions.playerEconomy && !checkPlayerEconomy(conditions, playerEconomyData)) return false;

	if (
		conditions.playerFlux ||
		conditions.haveBuffs !== undefined ||
		conditions.haveDebuffs !== undefined
	) {
		if (!checkPlayerFlux(conditions, playerFluxData)) {
			return false;
		}
	}
	return true;
}
//#endregion
