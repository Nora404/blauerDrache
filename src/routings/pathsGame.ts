import { lazy } from "react";
import { RouteConfig } from "../routes";

export enum PathsGame {
    Home = '/',
    Start = '/start',
    WhatsIs = '/whatis',
    NewDay = '/new-day',
    NewPlayer = '/new-player',
    ChooseOrigin = '/choose-origin',
    Map = '/map',
    NotFound = '*',
}

const Start = lazy(() => import('../playground/lahtheim/cityLimit/northGate/NorthGate'));
const NotFoundPage = lazy(() => import('../playground/lahtheim/cityLimit/northGate/NorthGate'));
const NorthGateNavi = lazy(() => import('../playground/lahtheim/cityLimit/northGate/NorthGateNavi'));

const CreatePlayer = lazy(() => import('../playground/game/newPlayer/CreatePlayer'));
const ChooseOrigin = lazy(() => import('../playground/game/newPlayer/ChooseOrigin'));
const WhatIs = lazy(() => import('../playground/game/infos/WhatIs'));
const NewDay = lazy(() => import('../playground/game/infos/NewDay'));
const Map = lazy(() => import('../playground/game/otherThings/Map'));

export const routesGame: RouteConfig[] = [
    {
        path: PathsGame.Home,
        element: Start,
    },
    {
        path: PathsGame.Start,
        element: Start,
        navigation: NorthGateNavi,
    },
    {
        path: PathsGame.NotFound,
        element: NotFoundPage,
    },
    {
        path: PathsGame.WhatsIs,
        element: WhatIs,
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
        path: PathsGame.ChooseOrigin,
        element: ChooseOrigin,
    },
    {
        path: PathsGame.Map,
        element: Map,
    },
];