import { lazy } from "react";
import { RouteConfig } from "../routes";

export enum PathsGame {
  Home = "/",
  Start = "/start",
  WhatsIs = "/whatis",
  Chronic = "/chronic",
  NewDay = "/new-day",
  NewPlayer = "/new-player",
  PlayerInfo = "/player-info",
  PlayerInventar = "/player-inventar",
  Collecting = "/collecting",
  QuestLog = "/questlog",
  Settings = "/setting",
  Map = "/map",
  Transit = "/transit/:targetPath/:startPath/:steps",
  Quest = "/quest/:eventId/:backPath",
  NotFound = "*",
}

const Start = lazy(() => import("../playground/game/game/Start"));
const NotFoundPage = lazy(() => import("../playground/game/game/Start"));
const NorthGateNavi = lazy(
  () => import("../playground/lahtheim/cityLimit/northGate/NorthGateNavi")
);
const EmptyNavi = lazy(() => import("../playground/game/infos/EmptyNavi"));

const CreatePlayer = lazy(
  () => import("../playground/game/newPlayer/CreatePlayer")
);
const PlayerInfo = lazy(
  () => import("../playground/game/infos/PlayerInfo/PlayerInfo")
);
const PlayerInventory = lazy(
  () => import("../playground/game/infos/PlayerInventory")
);
const Collecting = lazy(() => import("../playground/game/infos/Collecting"));
const QuestLog = lazy(() => import("../playground/game/infos/QuestLog"));
const Quest = lazy(() => import("../layout/Quest"));

const WhatIs = lazy(() => import("../playground/game/game/AboutGame"));
const Chronic = lazy(() => import("../playground/game/infos/Chronic"));
const NewDay = lazy(() => import("../playground/game/infos/NewDay"));
const Map = lazy(() => import("../playground/game/infos/Map"));
const Transit = lazy(() => import("../layout/Transit/Transit"));
const Settings = lazy(() => import("../playground/game/game/Settings"));

export const routesGame: RouteConfig[] = [
  {
    path: PathsGame.Home,
    element: Start,
    navigation: NorthGateNavi,
  },
  {
    path: PathsGame.Start,
    element: Start,
    navigation: NorthGateNavi,
  },
  {
    path: PathsGame.NotFound,
    element: NotFoundPage,
    navigation: NorthGateNavi,
  },
  {
    path: PathsGame.WhatsIs,
    element: WhatIs,
  },
  {
    path: PathsGame.Settings,
    element: Settings,
  },
  {
    path: PathsGame.NewDay,
    element: NewDay,
  },
  {
    path: PathsGame.NewPlayer,
    element: CreatePlayer,
  },
  {
    path: PathsGame.PlayerInfo,
    element: PlayerInfo,
  },
  {
    path: PathsGame.PlayerInventar,
    element: PlayerInventory,
  },
  {
    path: PathsGame.Collecting,
    element: Collecting,
  },
  {
    path: PathsGame.QuestLog,
    element: QuestLog,
  },
  {
    path: PathsGame.Map,
    element: Map,
  },
  {
    path: PathsGame.Chronic,
    element: Chronic,
  },
  {
    path: PathsGame.Transit,
    element: Transit,
    navigation: EmptyNavi,
  },
  {
    path: PathsGame.Quest,
    element: Quest,
  },
];
