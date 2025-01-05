import { lazy } from "react";
import { RouteConfig } from "../routes";

export enum PathsGame {
    Home = '/',
    Start = '/start',
    WhatsIs = '/whatis',
    NewDay = '/new-day',
    NewPlayer = '/new-player',
    PlayerInfo = '/player-info',
    PlayerInventar = '/player-inventar',
    Settings = '/setting',
    Map = '/map',
    Transit = '/transit/:targetPath/:startPath/:steps',
    NotFound = '*',
}

const Start = lazy(() => import('../playground/lahtheim/cityLimit/northGate/NorthGate'));
const NotFoundPage = lazy(() => import('../playground/lahtheim/cityLimit/northGate/NorthGate'));
const NorthGateNavi = lazy(() => import('../playground/lahtheim/cityLimit/northGate/NorthGateNavi'));
const EmptyNavi = lazy(() => import('../playground/game/infos/EmptyNavi'));

const CreatePlayer = lazy(() => import('../playground/game/newPlayer/CreatePlayer'));
const PlayerInfo = lazy(() => import('../playground/game/infos/PlayerInfo'));
const PlayerInventory = lazy(() => import('../playground/game/infos/PlayerInventory'));

const WhatIs = lazy(() => import('../playground/game/game/AboutGame'));
const NewDay = lazy(() => import('../playground/game/infos/NewDay'));
const Map = lazy(() => import('../playground/game/infos/Map'));
const Transit = lazy(() => import('../playground/game/game/Transit'));
const Settings = lazy(() => import('../playground/game/game/Settings'));

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
        path: PathsGame.Map,
        element: Map,
    },
    {
        path: PathsGame.Transit,
        element: Transit,
        navigation: EmptyNavi,
    },
];