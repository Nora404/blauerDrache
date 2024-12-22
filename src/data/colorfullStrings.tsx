import { GradientText } from "../utility/GradientText";

export const CREATURE: Record<string, JSX.Element> = {
    geflügeltesWesen: <GradientText colors={['#cf388f', '#8839cf']}>geflügeltes Wesen</GradientText>,
    rotesWesen: <GradientText colors={['#ff0000', '#ff6644']}>rotes Wesen</GradientText>,
    blauesWesen: <GradientText colors={['#99ddff', '#0000ff']}>blaues Wesen</GradientText>,

    grünerDrache: <b><GradientText colors={['#46CF25', '#29CF72']}>grüner Drache</GradientText></b>,
    blauerDrache: <b><GradientText colors={['#1ECECF', '#1763CF']}>blauer Drache</GradientText></b>,
  };