import { GradientText } from "../utility/GradientText";
import MultiColoredLetters from "../utility/MultiColoredLetters";

export const CREATURE: Record<string, JSX.Element> = {
    geflügeltesWesen: <GradientText colors={['#cf388f', '#8839cf']}>geflügeltes Wesen</GradientText>,
    rotesWesen: <GradientText colors={['#FFE1C2', '#ff6644']}>rotes Wesen</GradientText>,
    blauesWesen: <GradientText colors={['#A3D8FF', '#ffffff']}>blaues Wesen</GradientText>,

    grünerDrache: <b><GradientText colors={['#46CF25', '#29CF72']}>grüner Drache</GradientText></b>,
    blauerDrache: <b><GradientText colors={['#1ECECF', '#1763CF']}>blauer Drache</GradientText></b>,
  };

  export const RACES: Record<string, JSX.Element> = {
    Mensch: <GradientText colors={['#cf388f', '#8839cf']}>Mensch</GradientText>,
    Elf: <i><GradientText colors={['#FFE1C2', '#ff6644']}>Elf</GradientText></i>,
    Zwerg: <b style={{ fontSize: '85%' }}><GradientText colors={['#A3D8FF', '#ffffff']}>Zwerg</GradientText></b>,
    Echse: <GradientText colors={['#46CF25', '#29CF72']}>Echse</GradientText>,
    Troll: <b><MultiColoredLetters colors={[
      { index: 0, color: '#A1FA4F' },
      { index: 1, color: '#54D650' },
      { index: 2, color: '#B7D66A' },
      { index: 3, color: '#60E8BC' },
      { index: 4, color: '#54D650' },
    ]}>Troll</MultiColoredLetters></b>,
    Felkin: <GradientText colors={['#E8E8E8', '#eeeeee', '#E8E8E8']}>Felkin</GradientText>,
    Fenril: <b><GradientText colors={['#FFFCE4', '#E8CBA9']}>Fenril</GradientText></b>,
    Dryade: <i><GradientText colors={['#91FF5A', '#FF9CFD', '#91FF5A']}>Dryade</GradientText></i>,
  };