
export const multiplier = (bonus: number) => {
  const bonusFactor = 0.01;
  const thresholds = [0.1, 0.3, 0.7, 0.9]; // [10%, 30%, 70%, 90%]
  const multipliers = [0.4, 0.8, 1, 1.4, 1.8]; // Multiplikatoren

  const dice = Math.random();
  const effective = Math.min(Math.max(dice + bonus * bonusFactor, 0), 1);

  if (effective < thresholds[0]) return multipliers[0]; // 10%: 0.4
  if (effective < thresholds[1]) return multipliers[1]; // 20%: 0.8
  if (effective < thresholds[2]) return multipliers[2]; // 40%: 1 (Default)
  if (effective < thresholds[3]) return multipliers[3]; // 20%: 1.4
  return multipliers[4];                                // 10%: 1.8
};

export const generateAttackLog = (multi: number, type: "player" | "enemy") => {
  const colorMap: Record<number, { player: string; enemy: string }> = {
    0.4: { player: "#cb6380", enemy: "#6cc180" },
    0.8: { player: "#c998ae", enemy: "#9ac7ba" },
    1.4: { player: "#9ac7ba", enemy: "#c998ae" },
    1.8: { player: "#6cc180", enemy: "#cb6380" },
  };

  const textMap: Record<number, string> = {
    0.4: "war besonders schwach!",
    0.8: "war schwach!",
    1.4: "war gut!",
    1.8: "Volltreffer!",
  };

  const prefix = type === "player" ? "Dein Angriff" : "Der Angriff";
  const color = colorMap[multi]?.[type] || "#FFFFFF";
  const text = textMap[multi] || "";

  const log = multi === 1 ? "" : `{Talk|custom:${color}}${prefix} ${text}{/Talk}`;

  return log;
};