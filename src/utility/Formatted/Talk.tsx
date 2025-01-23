import React, { ReactNode } from "react";

export const textColors: Record<string, string> = {
  weiß: "#FFFFFF",
  gelb: "#FFFF33",
  orange: "#FFA500",
  rot: "#FF3333",
  pink: "#FF69B4",
  lila: "#800080",
  blau: "#0000FF",
  türkis: "#40E0D0",
  grün: "#008000",
  braun: "#A52A2A",
  grau: "#808080",
};

export const talkingColors: Record<string, string> = {
  geflügeltesWesen: "#ff33ff",
  blauesWesen: "#A3D8FF",
  rotesWesen: "#ff3333",
};

type TextColorKey = keyof typeof textColors;
type TalkingColorKey = keyof typeof talkingColors;
type ColorProp = string | TextColorKey | TalkingColorKey;

type TalkProps = {
  children: ReactNode;
  color?: ColorProp;
};

const Talk: React.FC<TalkProps> = ({ children, color = "#C7FAFF" }) => {
  const resolveColor = (inputColor: ColorProp): string => {
    if (typeof inputColor === "string") {
      if (inputColor in textColors) {
        return textColors[inputColor];
      }
      if (inputColor in talkingColors) {
        return talkingColors[inputColor];
      }
      return inputColor;
    }
    return "#C7FAFF";
  };

  const actualColor = resolveColor(color);

  return (
    <span style={{ color: actualColor }}>
      <i>{children}</i>
    </span>
  );
};

export default Talk;
