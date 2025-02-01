import { Buff } from "../../data/buffData";
import { Debuff } from "../../data/debuffData";
import { SYSTEM } from "../../data/helper/colorfullStrings";
import { PlayerStats } from "../../store/types";

export const renderPlayerStats = (effect: Partial<PlayerStats>) => {
  const statMapping: Record<string, JSX.Element[]> = {
    life: [<>{SYSTEM.Leben}</>],
    actionPoints: [<>{SYSTEM.Aktionen}</>],
    attack: [<>{SYSTEM.Angriff}</>],
    defense: [<>{SYSTEM.Rüstung}</>],
    luck: [<>{SYSTEM.Glück}</>],
  };

  return (
    <>
      {Object.entries(effect).flatMap(([key, value]) =>
        typeof value === "number" || typeof value === "string" ? (
          statMapping[key]?.map((label, index) => (
            <span key={`${key}-${index}`}>
              {label}: {value}
            </span>
          )) || []
        ) : []
      )}
    </>
  );
};


export function renderBuffDuration(buff: Buff | Debuff) {
  const time = buff.duration === 1 ? "Sofort" : buff.duration;
  return (
    <span>
      {renderPlayerStats(buff.effects)} ({time} {" Runden"})
    </span>
  );
};