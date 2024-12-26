import { lazy } from "react";
import { RouteConfig } from "../routes";

export enum PathsLahtheimCityLimit {
    NorthGate = '/north-gate',
    NorthGateGuardian = '/north-gate-guardian',
    NorthGatePlaque = '/north-gate-plaque',
    SouthWall = '/southWall',
    WestWall = '/westWall',
    EastWall = '/eastWall',
}

const NorthGateNavi = lazy(() => import('../playground/lahtheim/cityLimit/northGate/NorthGateNavi'));
const NorthGateGuardian = lazy(() => import('../playground/lahtheim/cityLimit/northGate/Guardian'));
const NorthGatePlaque = lazy(() => import('../playground/lahtheim/cityLimit/northGate/Plaque'));

const SouthWallNavi = lazy(() => import('../playground/lahtheim/cityLimit/southWall/SouthWallNavi'));
const SouthWall = lazy(() => import('../playground/lahtheim/cityLimit/southWall/SouthWall'));

const WestWallNavi = lazy(() => import('../playground/lahtheim/cityLimit/westWall/WestWallNavi'));
const WestWall = lazy(() => import('../playground/lahtheim/cityLimit/westWall/WestWall'));

const EastWallNavi = lazy(() => import('../playground/lahtheim/cityLimit/eastWall/EastWallNavi'));
const EastWall = lazy(() => import('../playground/lahtheim/cityLimit/eastWall/EastWall'));

export const routesLahtheimCityLimit: RouteConfig[] = [
    {
        path: PathsLahtheimCityLimit.NorthGate,
        element: NorthGateNavi,
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
        path: PathsLahtheimCityLimit.WestWall,
        element: WestWall,
        navigation: WestWallNavi,
    },
    {
        path: PathsLahtheimCityLimit.EastWall,
        element: EastWall,
        navigation: EastWallNavi,
    },
];