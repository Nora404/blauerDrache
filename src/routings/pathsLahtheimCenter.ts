import { lazy } from "react";
import { RouteConfig } from "../routes";

export enum PathsLahtheimCenter {
    Fountain = '/fountain',
    Church = '/church',
    ChurchTalk = '/church-talk',
    ChurchDonate = '/church-donate',
    ChurchPeace = '/church-peace',
    Courtyard = '/courtyard',
    CourtyardBench = '/courtyard-bench',
    CourtyardStand = '/courtyard-stand',
    CourtyardBard = '/courtyard-bard',
    CourtyardTreasure = '/courtyard-Treasure',
    Graveyard = '/graveyard',
    Townhall = '/townhall',
}

const ChurchNavi = lazy(() => import('../playground/lahtheim/center/church/ChurchNavi'));
const Church = lazy(() => import('../playground/lahtheim/center/church/Church'));
const ChurchTalk = lazy(() => import('../playground/lahtheim/center/church/ChurchTalk'));
const ChurchDonate = lazy(() => import('../playground/lahtheim/center/church/ChurchDonate'));
const ChurchPeace = lazy(() => import('../playground/lahtheim/center/church/ChurchPeace'));

const CourtyardNavi = lazy(() => import('../playground/lahtheim/center/courtyard/CourtyardNavi'));
const Courtyard = lazy(() => import('../playground/lahtheim/center/courtyard/Courtyard'));
const CourtyardBench = lazy(() => import('../playground/lahtheim/center/courtyard/CourtyardBench'));
const CourtyardBard = lazy(() => import('../playground/lahtheim/center/courtyard/CourtyardBard'));
const CourtyardStand = lazy(() => import('../playground/lahtheim/center/courtyard/CourtyardStand'));
const CourtyardTreasure = lazy(() => import('../playground/lahtheim/center/courtyard/CourtyardTreasure'));

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
        path: PathsLahtheimCenter.ChurchTalk,
        element: ChurchTalk,
        navigation: ChurchNavi,
    },
    {
        path: PathsLahtheimCenter.ChurchDonate,
        element: ChurchDonate,
        navigation: ChurchNavi,
    },
    {
        path: PathsLahtheimCenter.ChurchPeace,
        element: ChurchPeace,
        navigation: ChurchNavi,
    },
    {
        path: PathsLahtheimCenter.Courtyard,
        element: Courtyard,
        navigation: CourtyardNavi,
    },
    {
        path: PathsLahtheimCenter.CourtyardBench,
        element: CourtyardBench,
        navigation: CourtyardNavi,
    },
    {
        path: PathsLahtheimCenter.CourtyardBard,
        element: CourtyardBard,
        navigation: CourtyardNavi,
    },
    {
        path: PathsLahtheimCenter.CourtyardStand,
        element: CourtyardStand,
        navigation: CourtyardNavi,
    },
    {
        path: PathsLahtheimCenter.CourtyardTreasure,
        element: CourtyardTreasure,
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