import { lazy } from "react";
import { RouteConfig } from "../routes";

export enum PathsLahtheimCityLimit {
    NorthGate = '/north-gate',
    NorthGateGuardian = '/north-gate-guardian',
    NorthGatePlaque = '/north-gate-plaque',
    SouthWall = '/south-wall',
    SouthWallSymbol = '/south-wall-symbol',
    SouthWallTreasure = '/south-wall-treasure',
    WestWall = '/west-wall',
    EastWall = '/east-wall',
    EastWallTower = '/east-wall-tower',
    EastWallBox = '/east-wall-box',
    EastWallGear = '/east-wall-gear',
    EastWallFence = '/east-wall-fence',
}

const NorthGate = lazy(() => import('../playground/lahtheim/cityLimit/northGate/NorthGate'));
const NorthGateNavi = lazy(() => import('../playground/lahtheim/cityLimit/northGate/NorthGateNavi'));
const NorthGateGuardian = lazy(() => import('../playground/lahtheim/cityLimit/northGate/Guardian'));
const NorthGatePlaque = lazy(() => import('../playground/lahtheim/cityLimit/northGate/Plaque'));

const SouthWallNavi = lazy(() => import('../playground/lahtheim/cityLimit/southWall/SouthWallNavi'));
const SouthWall = lazy(() => import('../playground/lahtheim/cityLimit/southWall/SouthWall'));
const SouthWallSymbol = lazy(() => import('../playground/lahtheim/cityLimit/southWall/SouthWallSymbol'));
const SouthWallTreasure = lazy(() => import('../playground/lahtheim/cityLimit/southWall/SouthWallTreasure'));

const WestWallNavi = lazy(() => import('../playground/lahtheim/cityLimit/westWall/WestWallNavi'));
const WestWall = lazy(() => import('../playground/lahtheim/cityLimit/westWall/WestWall'));

const EastWallNavi = lazy(() => import('../playground/lahtheim/cityLimit/eastWall/EastWallNavi'));
const EastWall = lazy(() => import('../playground/lahtheim/cityLimit/eastWall/EastWall'));
const EastWallTower = lazy(() => import('../playground/lahtheim/cityLimit/eastWall/EastWallTower'));
const EastWallBox = lazy(() => import('../playground/lahtheim/cityLimit/eastWall/EastWallBox'));
const EastWallGear = lazy(() => import('../playground/lahtheim/cityLimit/eastWall/EastWallGear'));
const EastWallFence = lazy(() => import('../playground/lahtheim/cityLimit/eastWall/EastWallFence'));

export const routesLahtheimCityLimit: RouteConfig[] = [
    {
        path: PathsLahtheimCityLimit.NorthGate,
        element: NorthGate,
        navigation: NorthGateNavi,
    },
    {
        path: PathsLahtheimCityLimit.NorthGateGuardian,
        element: NorthGateGuardian,
        navigation: NorthGateNavi,
    },
    {
        path: PathsLahtheimCityLimit.NorthGatePlaque,
        element: NorthGatePlaque,
        navigation: NorthGateNavi,
    },
    {
        path: PathsLahtheimCityLimit.SouthWall,
        element: SouthWall,
        navigation: SouthWallNavi,
    },
    {
        path: PathsLahtheimCityLimit.SouthWallSymbol,
        element: SouthWallSymbol,
        navigation: SouthWallNavi,
    },
    {
        path: PathsLahtheimCityLimit.SouthWallTreasure,
        element: SouthWallTreasure,
        navigation: SouthWallNavi,
    },
    {
        path: PathsLahtheimCityLimit.WestWall,
        element: WestWall,
        navigation: WestWallNavi,
    },
    {
        path: PathsLahtheimCityLimit.EastWall,
        element: EastWall,
        navigation: EastWallNavi,
    },
    {
        path: PathsLahtheimCityLimit.EastWallTower,
        element: EastWallTower,
        navigation: EastWallNavi,
    },
    {
        path: PathsLahtheimCityLimit.EastWallBox,
        element: EastWallBox,
        navigation: EastWallNavi,
    },
    {
        path: PathsLahtheimCityLimit.EastWallGear,
        element: EastWallGear,
        navigation: EastWallNavi,
    },
    {
        path: PathsLahtheimCityLimit.EastWallFence,
        element: EastWallFence,
        navigation: EastWallNavi,
    },
];