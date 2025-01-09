import { lazy } from "react";
import { RouteConfig } from "../routes";

export enum PathsLahtheimCenter {
    Fountain = '/fountain',
    FountainBoard = '/fountain-board',
    FountainPeople = '/fountain-people',
    FountainWarrior = '/fountain-warrior',
    FountainTreasure = '/fountain-treasure',
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
    GraveyardPath = '/graveyard-path',
    GraveyardTreasure = '/graveyard-treasure',
    GraveyardHole = '/graveyard-hole',
    GraveyardDGrave = '/graveyard-dgrave',
    GraveyardZombie = '/graveyard-zombie',
    GraveyardNGrave = '/graveyard-ngrave',
    Townhall = '/townhall',
    TownhallColor = '/townhall-color',
    TownhallHome = '/townhall-home',
    TownhallCalling = '/townhall-calling',
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
const FountainBoard = lazy(() => import('../playground/lahtheim/center/fountain/FountainBoard'));
const FountainPeople = lazy(() => import('../playground/lahtheim/center/fountain/FountainPeople'));
const FountainWarrior = lazy(() => import('../playground/lahtheim/center/fountain/FountainWarrior'));
const FountainTreasure = lazy(() => import('../playground/lahtheim/center/fountain/FountainTreasure'));

const GraveyardNavi = lazy(() => import('../playground/lahtheim/center/graveyard/GraveyardNavi'));
const Graveyard = lazy(() => import('../playground/lahtheim/center/graveyard/Graveyard'));
const GraveyardPath = lazy(() => import('../playground/lahtheim/center/graveyard/GraveyardPath'));
const GraveyardTreasure = lazy(() => import('../playground/lahtheim/center/graveyard/GraveyardTreasure'));
const GraveyardHole = lazy(() => import('../playground/lahtheim/center/graveyard/GraveyardHole'));
const GraveyardDGrave = lazy(() => import('../playground/lahtheim/center/graveyard/GraveyardDGrave'));
const GraveyardZombie = lazy(() => import('../playground/lahtheim/center/graveyard/GraveyardZombie'));
const GraveyardNGrave = lazy(() => import('../playground/lahtheim/center/graveyard/GraveyardNGrave'));

const TownhallNavi = lazy(() => import('../playground/lahtheim/center/townHall/TownHallNavi'));
const Townhall = lazy(() => import('../playground/lahtheim/center/townHall/TownHall'));
const TownhallColor = lazy(() => import('../playground/lahtheim/center/townHall/TownHallColor'));
const TownhallHome = lazy(() => import('../playground/lahtheim/center/townHall/TownHallHome'));
const TownhallCalling = lazy(() => import('../playground/lahtheim/center/townHall/TownHallCalling'));

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
        path: PathsLahtheimCenter.FountainBoard,
        element: FountainBoard,
        navigation: FountainNavi,
    },
    {
        path: PathsLahtheimCenter.FountainPeople,
        element: FountainPeople,
        navigation: FountainNavi,
    },
    {
        path: PathsLahtheimCenter.FountainWarrior,
        element: FountainWarrior,
        navigation: FountainNavi,
    },
    {
        path: PathsLahtheimCenter.FountainTreasure,
        element: FountainTreasure,
        navigation: FountainNavi,
    },
    {
        path: PathsLahtheimCenter.Graveyard,
        element: Graveyard,
        navigation: GraveyardNavi,
    },
    {
        path: PathsLahtheimCenter.GraveyardPath,
        element: GraveyardPath,
        navigation: GraveyardNavi,
    },
    {
        path: PathsLahtheimCenter.GraveyardTreasure,
        element: GraveyardTreasure,
        navigation: GraveyardNavi,
    },
    {
        path: PathsLahtheimCenter.GraveyardHole,
        element: GraveyardHole,
        navigation: GraveyardNavi,
    },
    {
        path: PathsLahtheimCenter.GraveyardDGrave,
        element: GraveyardDGrave,
        navigation: GraveyardNavi,
    },
    {
        path: PathsLahtheimCenter.GraveyardZombie,
        element: GraveyardZombie,
        navigation: GraveyardNavi,
    },
    {
        path: PathsLahtheimCenter.GraveyardNGrave,
        element: GraveyardNGrave,
        navigation: GraveyardNavi,
    },
    {
        path: PathsLahtheimCenter.Townhall,
        element: Townhall,
        navigation: TownhallNavi,
    },
    {
        path: PathsLahtheimCenter.TownhallColor,
        element: TownhallColor,
        navigation: TownhallNavi,
    },
    {
        path: PathsLahtheimCenter.TownhallHome,
        element: TownhallHome,
        navigation: TownhallNavi,
    },
    {
        path: PathsLahtheimCenter.TownhallCalling,
        element: TownhallCalling,
        navigation: TownhallNavi,
    },
];