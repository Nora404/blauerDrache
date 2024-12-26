import { lazy } from "react";
import { RouteConfig } from "../routes";

export enum PathsWorldCaves {
    Cave = '/cave',
    CaveEntrance = '/cave-entrance',
    TreasureChamber = '/treasure-chamber',
}


const CaveNavi = lazy(() => import('../playground/world/caves/cave/CaveNavi'));
const Cave = lazy(() => import('../playground/world/caves/cave/Cave'));

const CaveEntranceNavi = lazy(() => import('../playground/world/caves/caveEntrance/CaveEntranceNavi'));
const CaveEntrance = lazy(() => import('../playground/world/caves/caveEntrance/CaveEntrance'));

const TreasureChamberNavi = lazy(() => import('../playground/world/caves/treasureChamber/TreasureChamberNavi'));
const TreasureChamber = lazy(() => import('../playground/world/caves/treasureChamber/TreasureChamber'));

export const routesWorldCaves: RouteConfig[] = [
    {
        path: PathsWorldCaves.Cave,
        element: Cave,
        navigation: CaveNavi,
    },
    {
        path: PathsWorldCaves.CaveEntrance,
        element: CaveEntrance,
        navigation: CaveEntranceNavi,
    },
    {
        path: PathsWorldCaves.TreasureChamber,
        element: TreasureChamber,
        navigation: TreasureChamberNavi,
    },
];