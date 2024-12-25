import React, { lazy } from "react";

export enum Paths {
  Home = '/',
  Start = '/start',
  WhatsIs = '/whatis',
  NewDay = '/new-day',
  NewPlayer = '/new-player',
  ChooseOrigin = '/choose-origin',
  Map = '/map',
  NorthGate = '/north-gate',
  Fountain = '/fountain',
  NotFound = '*',
}

export interface RouteConfig {
  path: Paths;
  element: React.LazyExoticComponent<React.ComponentType<any>>;
  navigation?: React.LazyExoticComponent<React.ComponentType<any>>;
}

const Start = lazy(() => import('./playground/lahtheim/cityLimit/northGate/NorthGate'));
const NotFoundPage = lazy(() => import('./playground/lahtheim/cityLimit/northGate/NorthGate'));

const CreatePlayer = lazy(() => import('./playground/game/newPlayer/CreatePlayer'));
const ChooseOrigin = lazy(() => import('./playground/game/newPlayer/ChooseOrigin'));
const WhatIs = lazy(() => import('./playground/game/infos/WhatIs'));
const NewDay = lazy(() => import('./playground/game/infos/NewDay'));

const Map = lazy(() => import('./playground/game/otherThings/Map'));

const NorthGateNavi = lazy(() => import('./playground/lahtheim/cityLimit/northGate/NorthGateNavi'));
const FountainNavi = lazy(() => import('./playground/lahtheim/center/fountain/FountainNavi'));
const Fountain = lazy(() => import('./playground/lahtheim/center/fountain/Fountain'));


export const routes: RouteConfig[] = [
  {
    path: Paths.Home,
    element: Start,
    navigation: NorthGateNavi,
  },
  {
    path: Paths.Start,
    element: Start,
    navigation: NorthGateNavi,
  },
  {
    path: Paths.NotFound,
    element: NotFoundPage,
  },
  {
    path: Paths.WhatsIs,
    element: WhatIs,
  },
  {
    path: Paths.NewDay,
    element: NewDay,
  },
  {
    path: Paths.NewPlayer,
    element: CreatePlayer,
  },
  {
    path: Paths.ChooseOrigin,
    element: ChooseOrigin,
  },
  {
    path: Paths.Map,
    element: Map,
  },
  {
    path: Paths.NorthGate,
    element: Start,
    navigation: NorthGateNavi,
  },
  {
    path: Paths.Fountain,
    element: Fountain,
    navigation: FountainNavi, 
  },
];