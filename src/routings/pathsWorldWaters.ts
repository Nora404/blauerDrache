import { lazy } from "react";
import { RouteConfig } from "../routes";

export enum PathsWorldWaters {
    Lake = '/lake',
    River = '/river',
    Spring = '/spring',
    Swamp = '/swamp',
}


const LakeNavi = lazy(() => import('../playground/world/waters/lake/LakeNavi'));
const Lake = lazy(() => import('../playground/world/waters/lake/Lake'));

const RiverNavi = lazy(() => import('../playground/world/waters/river/RiverNavi'));
const River = lazy(() => import('../playground/world/waters/river/River'));

const SpringNavi = lazy(() => import('../playground/world/waters/spring/SpringNavi'));
const Spring = lazy(() => import('../playground/world/waters/spring/Spring'));

const SwampNavi = lazy(() => import('../playground/world/waters/swamp/SwampNavi'));
const Swamp = lazy(() => import('../playground/world/waters/swamp/Swamp'));

export const routesWorldWaters: RouteConfig[] = [
    {
        path: PathsWorldWaters.Lake,
        element: Lake,
        navigation: LakeNavi,
    },
    {
        path: PathsWorldWaters.River,
        element: River,
        navigation: RiverNavi,
    },
    {
        path: PathsWorldWaters.Spring,
        element: Spring,
        navigation: SpringNavi,
    },
    {
        path: PathsWorldWaters.Swamp,
        element: Swamp,
        navigation: SwampNavi,
    },
];