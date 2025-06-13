import { CallingName } from "../../data/callingData";
import { OriginName } from "../../data/originData";
import { RaceName } from "../../data/raceData";
import { PlayerBase, PlayerStats, PlayerEconomy } from "../../store/types";
import { requiredExpForLevel } from "./Progression";

export function getSellPrice(ek: number) {
	return Math.floor(ek / 1.2);
}

// Funktion zum Zusammenführen und Aufsummieren numerischer Eigenschaften
const mergeAndSum = <T extends object>(...objs: Partial<T>[]): Partial<T> => {
	// ─ Änderung: Funktion extrahiert und wiederverwendbar gemacht
	const result: Partial<T> = {};
	objs.forEach((obj) => {
		if (!obj) return;
		Object.keys(obj).forEach((key) => {
			const typedKey = key as keyof T;
			const value = obj[typedKey];
			if (typeof value === "number") {
				result[typedKey] = (((result[typedKey] as number) || 0) + value) as T[keyof T];
			} else {
				result[typedKey] = value;
			}
		});
	});
	return result;
};

// Hilfsfunktion zur Berechnung aller Spielerattribute
export const calculatePlayerAttributes = (data: {
	race: { base: Partial<PlayerBase>; stats: Partial<PlayerStats>; economy: Partial<PlayerEconomy> };
	origin: {
		base: Partial<PlayerBase>;
		stats: Partial<PlayerStats>;
		economy: Partial<PlayerEconomy>;
	};
	calling: {
		base: Partial<PlayerBase>;
		stats: Partial<PlayerStats>;
		economy: Partial<PlayerEconomy>;
	};
}): { base: Partial<PlayerBase>; stats: Partial<PlayerStats>; economy: Partial<PlayerEconomy> } => {
	const mergedBase = mergeAndSum<PlayerBase>(data.race.base, data.origin.base, data.calling.base);
	const mergedStats = mergeAndSum<PlayerStats>(
		data.race.stats,
		data.origin.stats,
		data.calling.stats
	);
	const mergedEconomy = mergeAndSum<PlayerEconomy>(
		data.race.economy,
		data.origin.economy,
		data.calling.economy
	);

	// ─ Änderung: Berechnung der nächsten Levelanforderung (Funktion requiredExpForLevel muss definiert sein)
	const level = mergedBase.level ?? 1;
	const nextLevel = requiredExpForLevel(level);

	return {
		base: { ...mergedBase, nextLevel },
		stats: mergedStats,
		economy: mergedEconomy,
	};
};

// Funktion, die alle berechneten Werte im Store setzt
export const finalizePlayerCreation = (
	wizardData: {
		name: string;
		race: {
			name: RaceName | "Unbekant";
			base: Partial<PlayerBase>;
			stats: Partial<PlayerStats>;
			economy: Partial<PlayerEconomy>;
		};
		origin: {
			name: string;
			base: Partial<PlayerBase>;
			stats: Partial<PlayerStats>;
			economy: Partial<PlayerEconomy>;
		};
		calling: {
			name: CallingName | "Unbekant";
			base: Partial<PlayerBase>;
			stats: Partial<PlayerStats>;
			economy: Partial<PlayerEconomy>;
		};
	},
	store: {
		playerBase: { setPlayerBase: (base: Partial<PlayerBase>) => void };
		playerStats: { setPlayerStats: (stats: Partial<PlayerStats>) => void };
		playerEconomy: { setPlayerEconomy: (economy: Partial<PlayerEconomy>) => void };
		playerMeta: {
			setPlayerMeta: (meta: {
				name: string;
				race: RaceName;
				origin: OriginName;
				calling: CallingName;
			}) => void;
		};
	}
) => {
	const { base, stats, economy } = calculatePlayerAttributes({
		race: wizardData.race,
		origin: wizardData.origin,
		calling: wizardData.calling,
	});

	store.playerBase.setPlayerBase(base);
	store.playerStats.setPlayerStats(stats);
	store.playerEconomy.setPlayerEconomy(economy);
	store.playerMeta.setPlayerMeta({
		name: wizardData.name,
		race: wizardData.race.name as RaceName,
		origin: wizardData.origin.name as OriginName,
		calling: wizardData.calling.name as CallingName,
	});
};
