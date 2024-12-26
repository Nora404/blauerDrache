import { lazy } from "react";
import { RouteConfig } from "../routes";

export enum PathsLahtheimCenter {
    Fountain = '/fountain',
    Church = '/church',
    Courtyard = '/courtyard',
    Graveyard = '/graveyard',
    Townhall = '/townhall',
}

const ChurchNavi = lazy(() => import('../playground/lahtheim/center/church/ChurchNavi'));
const Church = lazy(() => import('../playground/lahtheim/center/church/Church'));

const CourtyardNavi = lazy(() => import('../playground/lahtheim/center/courtyard/CourtyardNavi'));
const Courtyard = lazy(() => import('../playground/lahtheim/center/courtyard/Courtyard'));

const FountainNavi = lazy(() => import('../playground/lahtheim/center/fountain/FountainNavi'));
const Fountain = lazy(() => import('../playground/lahtheim/center/fountain/Fountain'));

const GraveyardNavi = lazy(() => import('../playground/lahtheim/center/graveyard/GraveyardNavi'));
const Graveyard = lazy(() => import('../playground/lahtheim/center/graveyard/Graveyard'));

const TownhallNavi = lazy(() => import('../playground/lahtheim/center/townHall/TownHallNavi'));
const Townhall = lazy(() => import('../playground/lahtheim/center/townHall/TownHall'));

export const routesLahtheimCenter: RouteConfig[] = [
    {
        path: PathsLahtheimCenter.Church,
        element: Church,
        navigation: ChurchNavi,
    },
    {
        path: PathsLahtheimCenter.Courtyard,
        element: Courtyard,
        navigation: CourtyardNavi,
    },
    {
        path: PathsLahtheimCenter.Fountain,
        element: Fountain,
        navigation: FountainNavi,
    },
    {
        path: PathsLahtheimCenter.Graveyard,
        element: Graveyard,
        navigation: GraveyardNavi,
    },
    {
        path: PathsLahtheimCenter.Townhall,
        element: Townhall,
        navigation: TownhallNavi,
    },
];