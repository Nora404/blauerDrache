//#region [definition]
export type GameTime = {
    gameTime: string;   // z.B. "12:00"
    gameDay: "Tag" | "Nacht";
};

export type GameState = {
    weather: string;
    temperature: string;
    creating: boolean;
    mobilePop: boolean;
    currentPath: string;
    currentEventQueue: string[];
    switch: Record<string, boolean>;
};

export type PlayerMeta = {
    name: string;
    race: RaceName;
    origin: OriginName;
    calling: CallingName;
    titel: string;
    colortype: string;
    colors: string[];
};

export type PlayerStats = {
    life: number;
    rounds: number;
    attack: number;
    defense: number;
    luck: number;
};

export type PlayerBase = {
    level: number;
    nextLevel: number;
    exp: number;
    standing: number;
    reputation: number;
    nextReputation: number;
    maxLife: number;
    maxRounds: number;
};

export type PlayerFlux = {
    feeling: FeelingName;
    buff: Partial<Record<BuffName, number>>;
    debuff: Partial<Record<DebuffName, number>>;
    weapon: WeaponName;
    armor: ArmorName;
    item: ItemName;
};

export type PlayerEconomy = {
    gold: number;
    edelsteine: number;
    items: Record<string, { item: Item, quantity: number }>;
};

export type PlayerQuest = {
    activeQuests: Record<string, Progress>;
    completedQuest: string[];
}
//#endregion

export type GameStore = {
    gameTime: GameTime;
    gameState: GameState;
    playerMeta: PlayerMeta;
    playerStats: PlayerStats;
    playerBase: PlayerBase;
    playerFlux: PlayerFlux;
    playerEconomy: PlayerEconomy;
    playerQuest: PlayerQuest;
};

//#region [default]
const defaultGameStore: GameStore = {
    gameTime: {
        gameTime: "12:00",
        gameDay: "Tag",
    },
    gameState: {
        weather: "sonnig",
        temperature: "warm",
        creating: false,
        mobilePop: false,
        currentPath: "/start",
        currentEventQueue: [],
        switch: {},
    },
    playerMeta: {
        name: "Name",
        race: "Mensch",
        origin: "Mondauge",
        calling: "Alchemist",
        titel: "Keiner",
        colortype: "Einfarbig",
        colors: [],
    },
    playerStats: {
        life: 100,
        rounds: 20,
        attack: 5,
        defense: 5,
        luck: 5,
    },
    playerBase: {
        level: 1,
        nextLevel: 100,
        exp: 0,
        standing: 0,
        reputation: 0,
        nextReputation: 100,
        maxLife: 100,
        maxRounds: 20,
    },
    playerFlux: {
        feeling: "Normal",
        buff: {},
        debuff: {},
        weapon: "Nichts",
        armor: "Nichts",
        item: "Nichts"
    },
    playerEconomy: {
        gold: 100,
        edelsteine: 0,
        items: {},
    },
    playerQuest: {
        activeQuests: {},
        completedQuest: [],
    }
};
//#endregion 

//#region [context]  
type GameStoreContextType = {
    store: GameStore;
    setGameTime: (val: Partial<GameTime>) => void;
    setGameState: (val: Partial<GameState>) => void;
    setPlayerMeta: (val: Partial<PlayerMeta>) => void;
    setPlayerStats: (val: Partial<PlayerStats>) => void;
    setPlayerBase: (val: Partial<PlayerBase>) => void;
    setPlayerFlux: (val: Partial<PlayerFlux>) => void;
    setPlayerEconomy: (val: Partial<PlayerEconomy>) => void;

    resetGameData: () => void;
    consumeItem: (itemName: string) => void;
    newDay: () => void;

    updateGameSwitch: (key: string, value: boolean) => void; // oder (switchName: SwitchName, value: boolean)
    updatePlayerBuff: (name: BuffName) => void;
    updatePlayerDebuff: (name: DebuffName) => void;
    updateItems: (name: ItemName, quantity: number) => void;
    updateLife: (delta: number) => void;
    updateRounds: (delta: number) => void;
    updateWeapon: (name: WeaponName) => void;
    updateArmor: (name: ArmorName) => void;
    updateInHand: (name: ItemName) => void;
    updatePlayerStats: (delta: Partial<PlayerStats>) => void;
    updatePlayerEconomy: (delta: Partial<PlayerEconomy>) => void;
    updateExp: (earnedExp: number) => void;
    updateReputation: (earnedRep: number) => void;
    updateQuest: (questId: string) => void;
};

import React, { createContext, useState, useEffect, useContext, useRef } from "react";
import { emptyFeelingObj, feelingMap, FeelingName, getRandomFeeling } from "../data/feelingData";
import { getRandomArrayElement } from "../utility/RandomArrayElement";
import { TEMPERATURE, WEATHER } from "../data/weatherStrings";
import { emptyRaceObj, RaceName, racesMap } from "../data/raceData";
import { callingMap, CallingName, emptyCallingObj } from "../data/callingData";
import { armorMap, ArmorName, emptyArmorObj } from "../data/armorData";
import { emptyWeaponObj, weaponMap, WeaponName } from "../data/weaponData";
import { emptyItemObj, Item, itemMap, ItemName } from "../data/ItemData";
import { Buff, buffMap, BuffName } from "../data/buffData";
import { Debuff, debuffMap, DebuffName } from "../data/debuffData";
import { emptyOriginObj, originMap, OriginName } from "../data/originData";
import { calculateProgression } from "../utility/Progression";
import { Progress } from "../data/questData";
import { getGameQuestById } from "../utility/TriggerQuest";
import { useLocation, useNavigate } from "react-router-dom";

export const GameStoreContext = createContext<GameStoreContextType>(
    {} as GameStoreContextType
);

export const useNewGameStore = () => useContext(GameStoreContext);
//#endregion  

//#region [save data]
export const NewGameStoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const validateGameStore = (data: any): GameStore => {
        if (!data || typeof data !== "object") return defaultGameStore;

        return {
            gameTime: data.gameTime ?? defaultGameStore.gameTime,
            gameState: data.gameState ?? defaultGameStore.gameState,
            playerMeta: data.playerMeta ?? defaultGameStore.playerMeta,
            playerStats: data.playerStats ?? defaultGameStore.playerStats,
            playerBase: data.playerBase ?? defaultGameStore.playerBase,
            playerFlux: data.playerFlux ?? defaultGameStore.playerFlux,
            playerEconomy: data.playerEconomy ?? defaultGameStore.playerEconomy,
            playerQuest: data.playerQuest ?? defaultGameStore.playerQuest,
        };
    };

    const [store, setStore] = useState<GameStore>(() => {
        const saved = localStorage.getItem("myGameStore");
        const parsed = saved ? JSON.parse(saved) : null;
        return validateGameStore(parsed);
    });

    useEffect(() => {
        const validatedStore = validateGameStore(store);
        localStorage.setItem("myGameStore", JSON.stringify(validatedStore));
    }, [store]);
    //#endregion

    //#region [useEffect]
    const navigate = useNavigate();
    const location = useLocation();

    // useEffect, das die Route im Store speichert
    useEffect(() => {
        if (store.gameState.currentPath !== location.pathname) {
            setStore((prev) => ({
                ...prev,
                gameState: {
                    ...prev.gameState,
                    currentPath: location.pathname,
                },
            }));
        }
    }, [location.pathname]);

    useEffect(() => {
        // Kommentar: Sofern du nicht eh schon auf currentPath bist,
        // wollen wir nach dem ersten Laden dort hin.
        // Wir benutzen hier location.pathname != store.gameState.currentPath,
        // weil wir Schleifen vermeiden wollen.
        if (location.pathname !== store.gameState.currentPath) {
            navigate(store.gameState.currentPath, { replace: true });
        }
    }, []);

    //#endregion

    //#region [set time]  
    useEffect(() => {
        const intervalId = setInterval(() => {
            updateGameTime();
        }, 10000);

        return () => clearInterval(intervalId);
    }, []);

    const updateGameTime = () => {
        const now = new Date();
        const minutes = now.getMinutes();
        const seconds = now.getSeconds();
        const totalSeconds = minutes * 60 + seconds;
        const gameHours = (totalSeconds / 3600) * 24;

        const gameDay = (gameHours < 6 || gameHours > 20) ? "Nacht" : "Tag";

        const hh = String(Math.floor(gameHours) % 24).padStart(2, "0");
        let mm = Math.floor((gameHours - Math.floor(gameHours)) * 60);
        mm = Math.floor(mm / 10) * 10;

        const newGameTime = `${hh}:${String(mm).padStart(2, "0")}`;

        // Nur updaten, wenn sich was ändert
        if (store.gameTime.gameTime !== newGameTime || store.gameTime.gameDay !== gameDay) {
            setStore((prev) => ({
                ...prev,
                gameTime: { ...prev.gameTime, gameTime: newGameTime, gameDay },
            }));
        }
    };

    const previousGameDay = useRef(store.gameTime.gameDay);
    useEffect(() => {
        if (previousGameDay.current === "Nacht" && store.gameTime.gameDay === "Tag") {
            newDay();
        }
        previousGameDay.current = store.gameTime.gameDay;
    }, [store.gameTime.gameDay]);
    //#endregion

    //#region [setter]
    const setGameTime = (val: Partial<GameTime>) => {  // Partial bedeutet alle Eigenschaften sind optional
        setStore((prev) => ({                          // Es wird der gesamte aktuelle Store übergeben
            ...prev,                                   // und wieder eingesetzt
            gameTime: { ...prev.gameTime, ...val },    // dann überschreibt der neue Wert den alten Wert
        }));
    };

    const setGameState = (val: Partial<GameState>) => {
        setStore((prev) => ({
            ...prev,
            gameState: { ...prev.gameState, ...val },
        }));
    };

    const setPlayerMeta = (val: Partial<PlayerMeta>) => {
        setStore((prev) => ({
            ...prev,
            playerMeta: { ...prev.playerMeta, ...val },
        }));
    };

    const setPlayerStats = (val: Partial<PlayerStats>) => {
        setStore((prev) => ({
            ...prev,
            playerStats: { ...prev.playerStats, ...val },
        }));
    };

    const setPlayerBase = (val: Partial<PlayerBase>) => {
        setStore((prev) => ({
            ...prev,
            playerBase: { ...prev.playerBase, ...val },
        }));
    };

    const setPlayerFlux = (val: Partial<PlayerFlux>) => {
        setStore((prev) => ({
            ...prev,
            playerFlux: { ...prev.playerFlux, ...val },
        }));
    };

    const setPlayerEconomy = (val: Partial<PlayerEconomy>) => {
        setStore((prev) => ({
            ...prev,
            playerEconomy: { ...prev.playerEconomy, ...val },
        }));
    };
    //#endregion

    //#region [new and reset]
    const resetGameData = () => {
        setStore(defaultGameStore);
    };

    const newDay = () => {
        const feeling = getRandomFeeling();
        const weather = getRandomArrayElement(WEATHER);
        const temperature = getRandomArrayElement(TEMPERATURE);

        setStore((prev) => ({
            ...prev,
            playerStats: {
                life: prev.playerBase.maxLife,
                rounds: prev.playerBase.maxRounds,
                attack: prev.playerStats.attack,
                defense: prev.playerStats.defense,
                luck: prev.playerStats.luck,
            },

            playerFlux: {
                ...prev.playerFlux,
                buff: {},
                debuff: {},
                feeling: feeling.name
            },

            gameState: {
                ...prev.gameState,
                weather: weather,
                temperature: temperature,
            }
        }));
    };
    //#endregion

    //#region [update Game]
    const updateGameSwitch = (key: string, value: boolean) => {
        setStore((prev) => ({
            ...prev,
            gameState: {
                ...prev.gameState,
                switch: { ...prev.gameState.switch, [key]: value },
            },
        }));
    };

    const updateEventQueue = (eventId: string) => {
        setStore((prev) => {
            const newQueue = prev.gameState.currentEventQueue;
            newQueue.push(eventId);

            return {
                ...prev,
                gameState: {
                    ...prev.gameState,
                    currentEventQueue: newQueue,
                },
            };
        });
    };
    //#endregion

    //#region [update Stats]
    const updatePlayerStats = (delta: Partial<PlayerStats>) => {
        setStore((prev) => ({
            ...prev,
            playerStats: {
                life: prev.playerStats.life + (delta.life || 0),
                rounds: prev.playerStats.rounds + (delta.rounds || 0),
                attack: prev.playerStats.attack + (delta.attack || 0),
                defense: prev.playerStats.defense + (delta.defense || 0),
                luck: prev.playerStats.luck + (delta.luck || 0),
            },
        }));
    };

    const updateLife = (delta: number) => {
        setStore((prev) => {
            const newLife = Math.min(
                Math.max(prev.playerStats.life + delta, 0),
                prev.playerBase.maxLife
            );
            return {
                ...prev,
                playerStats: {
                    ...prev.playerStats,
                    life: newLife,
                },
            };
        });
    };

    const updateRounds = (delta: number) => {
        setStore((prev) => {
            const newRounds = Math.min(
                Math.max(prev.playerStats.rounds + delta, 0),
                prev.playerBase.maxRounds
            );

            let updatedBuffs = { ...prev.playerFlux.buff };
            let updatedDebuffs = { ...prev.playerFlux.debuff };

            if (delta < 0) {
                const absolute = Math.abs(delta);
                updatedBuffs = Object.fromEntries(
                    Object.entries(updatedBuffs)
                        .map(([buffName, duration]) => {
                            const newDuration = duration - absolute;
                            return [buffName, newDuration];
                        })
                        .filter(([_, d]) => (d as number) > 0)
                );

                // Debuffs kürzen und rauswerfen, wenn sie <= 0
                updatedDebuffs = Object.fromEntries(
                    Object.entries(updatedDebuffs)
                        .map(([debuffName, duration]) => {
                            const newDuration = duration - absolute;
                            return [debuffName, newDuration];
                        })
                        .filter(([_, d]) => (d as number) > 0)
                );
            }

            return {
                ...prev,
                playerStats: {
                    ...prev.playerStats,
                    rounds: newRounds,
                },
                playerFlux: {
                    ...prev.playerFlux,
                    buff: updatedBuffs,
                    debuff: updatedDebuffs,
                },
            };
        });
    };
    //#endregion

    //#region [update Base]
    const updateExp = (earnedExp: number) => {
        setStore((prev) => {
            let newExp = prev.playerBase.exp + earnedExp;
            let { level, nextLevel, maxLife } = prev.playerBase;
            let { attack, defense, luck, life } = prev.playerStats;

            while (newExp >= nextLevel) {
                newExp -= nextLevel; // Überschüssige EXP abziehen
                level += 1;
                attack += 2;
                defense += 2;
                luck += 1;
                life += 5;
                maxLife += 5;
                nextLevel = requiredExpForLevel(level);
            }

            return {
                ...prev,
                playerBase: {
                    ...prev.playerBase,
                    level,
                    exp: newExp,
                    nextLevel,
                    maxLife,
                },
                playerStats: {
                    ...prev.playerStats,
                    attack,
                    defense,
                    luck,
                    life,
                },
            };
        });
    };

    const updateReputation = (earnedRep: number) => {
        setStore((prev) => {
            let newRep = prev.playerBase.reputation + earnedRep;
            let standing = prev.playerBase.standing;

            const getRequiredExp = (currentStanding: number) => {
                return requiredExpForLevel(Math.abs(currentStanding) || 1);
            };

            let currentReq = getRequiredExp(standing);

            while (true) {
                // Prüfe, ob ein Level aufsteigen
                if (newRep >= currentReq) {
                    newRep -= currentReq;
                    standing += 1;
                    currentReq = getRequiredExp(standing);
                }
                // Prüfe, ob ein Level absteigen
                else if (newRep < 0) {
                    standing -= 1;
                    const negativeReq = getRequiredExp(standing);
                    newRep += negativeReq;
                    currentReq = getRequiredExp(standing);
                }
                else {
                    break;
                }
            }

            return {
                ...prev,
                playerBase: {
                    ...prev.playerBase,
                    standing,
                    nextReputation: currentReq,
                    reputation: newRep,
                },
            };
        });
    };
    //#endregion

    //#region [update Flux]
    const updatePlayerDebuff = (name: DebuffName) => {
        const debuff = debuffMap[name];
        if (!debuff) return;

        setStore((prev) => {
            const updatedDebuffs = { ...prev.playerFlux.debuff };
            updatedDebuffs[name] = (updatedDebuffs[name] || 0) + debuff.duration;

            return {
                ...prev,
                playerFlux: {
                    ...prev.playerFlux,
                    debuff: updatedDebuffs,
                },
            };
        });
    };

    const updatePlayerBuff = (name: BuffName) => {
        const buff = buffMap[name];
        if (!buff) return;

        setStore((prev) => {
            const updatedBuffs = { ...prev.playerFlux.buff };
            updatedBuffs[name] = (updatedBuffs[name] || 0) + buff.duration;

            return {
                ...prev,
                playerFlux: {
                    ...prev.playerFlux,
                    buff: updatedBuffs,
                },
            };
        });
    };

    const updateWeapon = (name: WeaponName) => {
        if (!weaponMap[name]) return;

        setStore((prev) => ({
            ...prev,
            playerFlux: {
                ...prev.playerFlux,
                weapon: name,
            },
        }));
    };

    const updateArmor = (name: ArmorName) => {
        if (!armorMap[name]) return;

        setStore((prev) => ({
            ...prev,
            playerFlux: {
                ...prev.playerFlux,
                armor: name,
            },
        }));
    };

    const updateInHand = (name: ItemName) => {
        if (!itemMap[name]) return;

        setStore((prev) => ({
            ...prev,
            playerFlux: {
                ...prev.playerFlux,
                item: name,
            },
        }));
    };
    //#endregion

    //#region [update Economy]
    const updatePlayerEconomy = (delta: Partial<PlayerEconomy>) => {
        setStore((prev) => {
            const newGold = (delta.gold || 0) + prev.playerEconomy.gold;
            const newEdelsteine = (delta.edelsteine || 0) + prev.playerEconomy.edelsteine;

            return {
                ...prev,
                playerEconomy: {
                    ...prev.playerEconomy,
                    gold: Math.max(newGold, 0),
                    edelsteine: Math.max(newEdelsteine, 0),
                },
            };
        });
    };

    const updateItems = (name: ItemName, quantity: number) => {
        const item = itemMap[name];
        if (!item) return;

        setStore((prev) => {
            const currentItem = prev.playerEconomy.items[item.name];
            const currentQuantity = currentItem ? currentItem.quantity : 0;

            const newQuantity = currentQuantity + quantity;

            const updatedItems = { ...prev.playerEconomy.items };

            if (newQuantity > 0) {
                updatedItems[item.name] = { quantity: newQuantity, item }; // Item hinzufügen/aktualisieren
            } else if (newQuantity <= 0) {
                delete updatedItems[item.name]; // Item entfernen, wenn Menge <= 0
            }

            return {
                ...prev,
                playerEconomy: {
                    ...prev.playerEconomy,
                    items: updatedItems,
                },
            };
        });
        updateProgress("itemAdded", { itemName: name, quantity });
    };
    //#endregion

    //#region [update Quest]
    const updateQuest = (questId: string) => {
        setStore((prevStore) => {
            const questToAdd = getGameQuestById(questId);
            if (!questToAdd) {
                console.warn("Quest nicht gefunden:", questId);
                return prevStore; // abbrechen, Rückgabe ohne Änderung
            }
            // Prüfen, ob die Quest bereits aktiv ist:
            const alreadyActive = !!prevStore.playerQuest.activeQuests[questId];
            const alreadyDone = prevStore.playerQuest.completedQuest.includes(questId);

            // Falls sie abgeschlossen ist und die Quest NICHT wiederholbar:
            if (alreadyDone && !questToAdd.repeat) {
                console.warn("Quest schon abgeschlossen und nicht wiederholbar:", questId);
                return prevStore; // keine Änderung
            }

            if (!alreadyActive) {
                return {
                    ...prevStore,
                    playerQuest: {
                        ...prevStore.playerQuest,
                        activeQuests: {
                            ...prevStore.playerQuest.activeQuests,
                            [questId]: questToAdd.progress, // QuestId als Key, Array als Value
                        },
                    },
                };
            }
            return prevStore;
        });
    }
    //#endregion

    //#region [progress]
    function updateProgress(action: "itemAdded" | "enemyKilled", payload: any) {
        setStore((prev) => {
            const newActive = { ...prev.playerQuest.activeQuests };

            for (const [questId, progress] of Object.entries(newActive)) {
                if (progress.isDone) continue;

                // Prüfen, ob es vom type "Besorgen" ist und ob `haveItem` existiert:
                if (action === "itemAdded" && progress.type === "Besorgen") {
                    // Wir erwarten payload.itemName, payload.quantity
                    const haveItems = progress.task.haveItem ?? [];
                    // Gibt es in haveItems einen Eintrag für payload.itemName?
                    for (let itemObj of haveItems) {
                        if (itemObj.item === payload.itemName) {
                            itemObj.count += payload.quantity;
                            // Dann check, ob count >= need
                            if (itemObj.count >= itemObj.need) {
                                // => quest fertig? Na ja, wenn ALLE items in haveItems erfüllt sind.
                                const allDone = haveItems.every((i) => i.count >= i.need);
                                if (allDone) {
                                    progress.isDone = true;
                                    updateEventQueue(progress.eventByEnd);
                                }
                            }
                        }
                    }
                }
                // else if (action === "enemyKilled" && progress.type === "Besiegen") { ... }

                newActive[questId] = progress;
            }

            return {
                ...prev,
                playerQuest: {
                    ...prev.playerQuest,
                    activeQuests: newActive
                }
            };
        });
    }
    //#endregion

    //#region [helper]
    const consumeItem = (itemName: string) => {
        setStore((prev) => {
            const currentItem = prev.playerEconomy.items[itemName];
            if (!currentItem || currentItem.quantity <= 0) {
                console.log(`${itemName} ist nicht im Inventar.`);
                return prev;
            }

            const { effects, buff, debuff } = currentItem.item;

            // Effekte des Gegenstandes anwenden
            const newPlayerStats = { ...prev.playerStats };
            if (effects) {
                newPlayerStats.life = Math.min(
                    newPlayerStats.life + (effects.life || 0),
                    prev.playerBase.maxLife
                );
                newPlayerStats.attack += effects.attack || 0;
                newPlayerStats.defense += effects.defense || 0;
                newPlayerStats.luck += effects.luck || 0;
            }

            if (buff) {
                updatePlayerBuff(buff);
            }

            if (debuff) {
                updatePlayerDebuff(debuff);
            }

            // Verbrauchten Gegenstand abziehen
            const updatedItems = { ...prev.playerEconomy.items };
            const newQuantity = currentItem.quantity - 1;
            if (newQuantity > 0) {
                updatedItems[itemName] = { ...currentItem, quantity: newQuantity };
            } else {
                delete updatedItems[itemName];
            }

            updateInHand("Nichts");

            return {
                ...prev,
                playerEconomy: {
                    ...prev.playerEconomy,
                    items: updatedItems,
                },
                playerStats: newPlayerStats,
            };
        });
    };
    //#endregion

    const contextValue: GameStoreContextType = {
        store,
        setGameTime,
        setGameState,
        setPlayerMeta,
        setPlayerStats,
        setPlayerBase,
        setPlayerFlux,
        setPlayerEconomy,
        resetGameData,
        newDay,
        consumeItem,
        updateGameSwitch,
        updatePlayerBuff,
        updatePlayerDebuff,
        updateItems,
        updateLife,
        updateRounds,
        updateWeapon,
        updateArmor,
        updateInHand,
        updatePlayerStats,
        updatePlayerEconomy,
        updateExp,
        updateReputation,
        updateQuest,
    };

    return (
        <GameStoreContext.Provider value={contextValue}>
            {children}
        </GameStoreContext.Provider>
    );
};

//#region [getter]
export function getCombinedStats(store: GameStore) {
    let life = store.playerStats.life;
    let rounds = store.playerStats.rounds;
    let attack = store.playerStats.attack;
    let defense = store.playerStats.defense;
    let luck = store.playerStats.luck;
    let maxLife = store.playerBase.maxLife;
    let maxRounds = store.playerBase.maxRounds;

    attack += weaponMap[store.playerFlux.weapon].attack ?? 0;
    defense += armorMap[store.playerFlux.armor].defense ?? 0;

    const scalingFactor = getScalingFactor(store.playerBase.level);

    // mit Math.trunc werden alle Nachkommazahlen abgeschnitten
    // Durch die Klammern wird die richtige Reihenfolge der berechnung garantiert
    // der scalingFactor mit dem Level soll verhindern das Elemente unwichtig werden
    for (const [buffName, currDuration] of Object.entries(store.playerFlux.buff)) {
        if (!currDuration) continue;
        const buff = buffMap[buffName as BuffName];
        if (!buff) continue;

        life += Math.trunc((buff.effects.life ?? 0) * scalingFactor);
        rounds += Math.trunc(buff.effects.rounds ?? 0);
        attack += Math.trunc((buff.effects.attack ?? 0) * scalingFactor);
        defense += Math.trunc((buff.effects.defense ?? 0) * scalingFactor);
        luck += Math.trunc((buff.effects.luck ?? 0) * scalingFactor);
        maxLife += Math.trunc((buff.effects.life ?? 0) * scalingFactor);
        maxRounds += Math.trunc((buff.effects.rounds ?? 0) * scalingFactor);
    }

    for (const [debuffName, currDuration] of Object.entries(store.playerFlux.debuff)) {
        if (!currDuration) continue;
        const debuff = debuffMap[debuffName as DebuffName];
        if (!debuff) continue;

        life += Math.trunc((debuff.effects.life ?? 0) * scalingFactor);
        rounds += Math.trunc(debuff.effects.rounds ?? 0);
        attack += Math.trunc((debuff.effects.attack ?? 0) * scalingFactor);
        defense += Math.trunc((debuff.effects.defense ?? 0) * scalingFactor);
        luck += Math.trunc((debuff.effects.luck ?? 0) * scalingFactor);
        maxLife += Math.trunc((debuff.effects.life ?? 0) * scalingFactor);
        maxRounds += Math.trunc((debuff.effects.rounds ?? 0) * scalingFactor);
    }

    const feeling = feelingMap[store.playerFlux.feeling];
    life += Math.trunc((feeling.stats.life ?? 0) * scalingFactor);
    rounds += Math.trunc(feeling.stats.rounds ?? 0);
    attack += Math.trunc((feeling.stats.attack ?? 0) * scalingFactor);
    defense += Math.trunc((feeling.stats.defense ?? 0) * scalingFactor);
    luck += Math.trunc((feeling.stats.luck ?? 0) * scalingFactor);
    maxLife += Math.trunc((feeling.stats.life ?? 0) * scalingFactor);
    maxRounds += Math.trunc((feeling.stats.rounds ?? 0) * scalingFactor);

    // Sicherstellen, dass die kombinierten Werte innerhalb der Grenzen bleiben
    life = Math.max(life, 0), maxLife;
    rounds = Math.max(rounds, 0), maxRounds;
    attack = Math.max(attack, 0);
    defense = Math.max(defense, 0);
    luck = Math.max(luck, 0);

    return { life, rounds, attack, defense, luck, maxLife, maxRounds };
}

export type ActiveBuff = Buff & { currentDuration: number };
export type ActiveDebuff = Debuff & { currentDuration: number };

export function getPlayerObj(store: GameStore) {
    const race = racesMap[store.playerMeta.race] ?? emptyRaceObj;
    const origin = originMap[store.playerMeta.origin] ?? emptyOriginObj;
    const calling = callingMap[store.playerMeta.calling] ?? emptyCallingObj;
    const feeling = feelingMap[store.playerFlux.feeling] ?? emptyFeelingObj;
    const weapon = weaponMap[store.playerFlux.weapon] ?? emptyWeaponObj;
    const armor = armorMap[store.playerFlux.armor] ?? emptyArmorObj;
    const item = itemMap[store.playerFlux.item] ?? emptyItemObj;

    const buffs: ActiveBuff[] = Object.entries(store.playerFlux.buff)
        .map(([buffName, duration]) => {
            const buff = buffMap[buffName as BuffName];
            if (!buff) return null;
            return { ...buff, currentDuration: duration };
        })
        .filter((buff): buff is ActiveBuff => buff !== null) ?? []; // Type Guard, um null-Werte zu entfernen

    const debuffs: ActiveDebuff[] = Object.entries(store.playerFlux.debuff)
        .map(([debuffName, duration]) => {
            const debuff = debuffMap[debuffName as DebuffName];
            if (!debuff) return null;
            return { ...debuff, currentDuration: duration };
        })
        .filter((debuff): debuff is ActiveDebuff => debuff !== null) ?? [];


    return { race, origin, calling, feeling, weapon, armor, item, buffs, debuffs }
}
//#endregion

export const requiredExpForLevel = (level: number) => {
    return Math.round(
        calculateProgression(100, 9999, 14, level - 1, 'geometric')
    );
}

export function getScalingFactor(level: number): number {
    // Jede Levelerhöhung erhöht den Faktor um 10%
    return 1 + (level - 1) * 0.1;
}

// EINBINDEN
//   function MyComponent() {
//     const { store } = useNewGameStore();
//     const combined = getCombinedStats(store);
//     const selected = getPlayerObj(store);
//     return <div>Leben: {combined.life}</div>;
//   }
