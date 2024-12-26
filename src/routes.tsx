import React, { lazy } from "react";

export enum Paths {
  Home = '/',
  Start = '/start',
  WhatsIs = '/whatis',
  NewDay = '/new-day',
  NewPlayer = '/new-player',
  ChooseOrigin = '/choose-origin',
  Map = '/map',

  // LAHTHEIM CENTER
  Fountain = '/fountain',
  Church = '/church',
  Courtyard = '/courtyard',
  Graveyard = '/graveyard',
  Townhall = '/townhall',

  // LAHTHEIM CITYLIMIT
  NorthGate = '/north-gate',
  NorthGateGuardian = '/north-gate-guardian',
  NorthGatePlaque = '/north-gate-plaque',

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

// LAHTHEIM CENTER -----------------------------------------------------------------------------------------
const ChurchNavi = lazy(() => import('./playground/lahtheim/center/church/ChurchNavi'));
const Church = lazy(() => import('./playground/lahtheim/center/church/Church'));
const CourtyardNavi = lazy(() => import('./playground/lahtheim/center/courtyard/CourtyardNavi'));
const Courtyard = lazy(() => import('./playground/lahtheim/center/courtyard/Courtyard'));
const FountainNavi = lazy(() => import('./playground/lahtheim/center/fountain/FountainNavi'));
const Fountain = lazy(() => import('./playground/lahtheim/center/fountain/Fountain'));
const GraveyardNavi = lazy(() => import('./playground/lahtheim/center/graveyard/GraveyardNavi'));
const Graveyard = lazy(() => import('./playground/lahtheim/center/graveyard/Graveyard'));
const TownhallNavi = lazy(() => import('./playground/lahtheim/center/townHall/TownHallNavi'));
const Townhall = lazy(() => import('./playground/lahtheim/center/townHall/TownHall'));

// LAHTHEIM CITYLIMIT ---------------------------------------------------------------------------------------
const NorthGateNavi = lazy(() => import('./playground/lahtheim/cityLimit/northGate/NorthGateNavi'));
const NorthGateGuardian = lazy(() => import('./playground/lahtheim/cityLimit/northGate/Guardian'));
const NorthGatePlaque = lazy(() => import('./playground/lahtheim/cityLimit/northGate/Plaque'));

// LAHTHEIM RESIDENTIAL -------------------------------------------------------------------------------------

// LAHTHEIM TRADING -----------------------------------------------------------------------------------------

// WORLD SURROUNDINGS ---------------------------------------------------------------------------------------

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
    path: Paths.NorthGateGuardian,
    element: NorthGateGuardian,
    navigation: NorthGateNavi,
  },
  {
    path: Paths.NorthGatePlaque,
    element: NorthGatePlaque,
    navigation: NorthGateNavi,
  },
  {
    path: Paths.Church,
    element: Church,
    navigation: ChurchNavi,
  },
  {
    path: Paths.Courtyard,
    element: Courtyard,
    navigation: CourtyardNavi,
  },
  {
    path: Paths.Fountain,
    element: Fountain,
    navigation: FountainNavi,
  },
  {
    path: Paths.Graveyard,
    element: Graveyard,
    navigation: GraveyardNavi,
  },
  {
    path: Paths.Townhall,
    element: Townhall,
    navigation: TownhallNavi,
  },
];