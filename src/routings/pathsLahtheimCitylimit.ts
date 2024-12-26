import { lazy } from "react";
import { RouteConfig } from "../routes";

export enum PathsLahtheimCityLimit {
    NorthGate = '/north-gate',
    NorthGateGuardian = '/north-gate-guardian',
    NorthGatePlaque = '/north-gate-plaque',
}

const NorthGateNavi = lazy(() => import('../playground/lahtheim/cityLimit/northGate/NorthGateNavi'));
const NorthGateGuardian = lazy(() => import('../playground/lahtheim/cityLimit/northGate/Guardian'));
const NorthGatePlaque = lazy(() => import('../playground/lahtheim/cityLimit/northGate/Plaque'));

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
];