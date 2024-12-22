import { GradientText } from "../utility/GradientText";

export const CREATURE: Record<string, JSX.Element> = {
    geflügeltesWesen: <GradientText colors={['#cf388f', '#8839cf']}>geflügeltes Wesen</GradientText>,
    rotesWesen: <GradientText colors={['#ff0000', '#ff6644']}>rotes Wesen</GradientText>,
    blauesWesen: <GradientText colors={['#99ddff', '#0000ff']}>blaues Wesen</GradientText>,
  };