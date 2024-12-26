import { lazy } from "react";
import { RouteConfig } from "../routes";

export enum PathsWorldForest {
    Forest = '/forest',
    DarkForest = '/dark-forest',
    ForestClearing = '/forest-clearing',
    ForestEdge = '/forest-edge',
}


const ForestNavi = lazy(() => import('../playground/world/forest/forest/ForestNavi'));
const Forest = lazy(() => import('../playground/world/forest/forest/Forest'));

const DarkForestNavi = lazy(() => import('../playground/world/forest/darkForest/DarkForestNavi'));
const DarkForest = lazy(() => import('../playground/world/forest/darkForest/DarkForest'));

const ForestClearingNavi = lazy(() => import('../playground/world/forest/forestClearing/ForestClearingNavi'));
const ForestClearing = lazy(() => import('../playground/world/forest/forestClearing/ForestClearing'));

const ForestEdgeNavi = lazy(() => import('../playground/world/forest/forestEdge/ForestEdgeNavi'));
const ForestEdge = lazy(() => import('../playground/world/forest/forestEdge/ForestEdge'));

export const routesWorldForest: RouteConfig[] = [
    {
        path: PathsWorldForest.Forest,
        element: Forest,
        navigation: ForestNavi,
    },
    {
        path: PathsWorldForest.DarkForest,
        element: DarkForest,
        navigation: DarkForestNavi,
    },
    {
        path: PathsWorldForest.ForestClearing,
        element: ForestClearing,
        navigation: ForestClearingNavi,
    },
    {
        path: PathsWorldForest.ForestEdge,
        element: ForestEdge,
        navigation: ForestEdgeNavi,
    },
];