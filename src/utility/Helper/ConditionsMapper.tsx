// conditionsMapper.ts oder am Anfang von GenerateEventCode.tsx

import { Conditions } from "../../data/eventData";
import { ConditionsConfig } from "../Editor/Context/EventContext";

export function mapConditionsConfigToConditions(cfg: ConditionsConfig): Conditions {
    // Das finale "Conditions"-Objekt aus deinem eventData:
    const finalCond: Conditions = {};

    // 1) operator
    if (cfg.operator) {
        finalCond.operator = cfg.operator;
    }

    // 2) gameTime (nur, wenn enabled & Werte vorhanden)
    if (cfg.gameTimeEnabled && cfg.gameTime) {
        const { gameTime, gameDay } = cfg.gameTime;
        // Falls mindestens eines definiert
        if (gameTime || gameDay) {
            finalCond.gameTime = {};
            if (typeof gameTime === "string" && gameTime.trim() !== "") {
                finalCond.gameTime.gameTime = gameTime;
            }
            if (gameDay === "Tag" || gameDay === "Nacht") {
                finalCond.gameTime.gameDay = gameDay;
            }
        }
    }

    // 3) gameState
    if (cfg.gameStateEnabled && cfg.gameState) {
        const { weather, temperature } = cfg.gameState;
        if (weather || temperature) {
            finalCond.gameState = {};
            if (weather && weather.trim() !== "") {
                finalCond.gameState.weather = weather;
            }
            if (temperature && temperature.trim() !== "") {
                finalCond.gameState.temperature = temperature;
            }
        }
    }

    // 4) playerStats
    if (cfg.playerStatsEnabled && cfg.playerStats) {
        const { life, actionPoints, attack, defense, luck } = cfg.playerStats;
        const partialStats: Partial<Conditions["playerStats"]> = {};
        if (life != null && life !== 0) partialStats.life = life;
        if (actionPoints != null && actionPoints !== 0) partialStats.actionPoints = actionPoints;
        if (attack != null && attack !== 0) partialStats.attack = attack;
        if (defense != null && defense !== 0) partialStats.defense = defense;
        if (luck != null && luck !== 0) partialStats.luck = luck;

        if (Object.keys(partialStats).length > 0) {
            finalCond.playerStats = partialStats;
        }
    }

    // 5) playerBase
    if (cfg.playerBaseEnabled && cfg.playerBase) {
        const { level, exp, standing } = cfg.playerBase;
        const partialBase: Partial<Conditions["playerBase"]> = {};
        if (level != null && level !== 0) partialBase.level = level;
        if (exp != null && exp !== 0) partialBase.exp = exp;
        if (standing != null && standing !== 0) partialBase.ruf = standing;

        if (Object.keys(partialBase).length > 0) {
            finalCond.playerBase = partialBase;
        }
    }

    // 6) playerFlux
    if (cfg.playerFluxEnabled && cfg.playerFlux) {
        const { feeling, weapon, armor, item, haveBuff, haveDebuff } = cfg.playerFlux;
        const partialFlux: Partial<Conditions["playerFlux"]> = {};

        if (feeling) partialFlux.feeling = feeling;
        if (weapon) partialFlux.weapon = weapon;
        if (armor) partialFlux.armor = armor;
        if (item) partialFlux.item = item;

        // Falls du Buffs/Debuffs in die finalen Conditions übernehmen willst:
        // Dein finales `playerFlux.buff` ist `Partial<Record<BuffName, number>>`.
        if (haveBuff && Object.keys(haveBuff).length > 0) {
            partialFlux.buff = haveBuff;
        }
        if (haveDebuff && Object.keys(haveDebuff).length > 0) {
            partialFlux.debuff = haveDebuff;
        }

        if (Object.keys(partialFlux).length > 0) {
            finalCond.playerFlux = partialFlux;
        }
    }

    // 7) playerMeta
    if (cfg.playerMetaEnabled && cfg.playerMeta) {
        const { race, origin, calling, titel } = cfg.playerMeta;
        const partialMeta: Partial<Conditions["playerMeta"]> = {};

        if (race) partialMeta.race = race;
        if (origin) partialMeta.origin = origin;
        if (calling) partialMeta.calling = calling;
        if (titel) partialMeta.titel = titel;

        if (Object.keys(partialMeta).length > 0) {
            finalCond.playerMeta = partialMeta;
        }
    }

    // 8) playerEconomy
    if (cfg.playerEconomyEnabled && cfg.playerEconomy) {
        const { gold, edelsteine } = cfg.playerEconomy;
        const partialEcon: Partial<Conditions["playerEconomy"]> = {};

        if (gold != null && gold !== 0) partialEcon.gold = gold;
        if (edelsteine != null && edelsteine !== 0) partialEcon.edelsteine = edelsteine;

        if (Object.keys(partialEcon).length > 0) {
            finalCond.playerEconomy = partialEcon;
        }
    }

    // 9) haveBuffs / haveDebuffs? 
    if (cfg.haveBuffs === true) {
        finalCond.haveBuffs = true;
    }
    if (cfg.haveDebuffs === true) {
        finalCond.haveDebuffs = true;
    }

    return finalCond;
}
