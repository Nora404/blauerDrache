import React, { ReactNode } from "react";

export const textColors: Record<string, string> = {
  weiß: "#FCFCFC",
  gelb: "#FCED8A",
  orange: "#FCB45F",
  rot: "#DB6868",
  pink: "#DB72CD",
  lila: "#9077F5",
  blau: "#728FF5",
  türkis: "#61C9DE",
  grün: "#86DE83",
  braun: "#C9AA85",
  grau: "#CCCCCC",
};

export const talkingColors: Record<string, string> = {
  geflügeltesWesen: "#ff33ff",
  blauesWesen: "#A3D8FF",
  rotesWesen: "#ff3333",
  dunkleGestalt: "#8C6570",
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
