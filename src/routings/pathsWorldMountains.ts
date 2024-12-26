import { lazy } from "react";
import { RouteConfig } from "../routes";

export enum PathsWorldMountain {
    HillCountry = '/hill-country',
    MountainBase = '/mountain-base',
    MountainPath = '/mountain-path',
    MountainPeak = '/mountain-peak',
}


const HillCountryNavi = lazy(() => import('../playground/world/mountains/hillCountry/HillCountryNavi'));
const HillCountry = lazy(() => import('../playground/world/mountains/hillCountry/HillCountry'));

const MountainBaseNavi = lazy(() => import('../playground/world/mountains/mountainBase/MountainBaseNavi'));
const MountainBase = lazy(() => import('../playground/world/mountains/mountainBase/MountainBase'));

const MountainPathNavi = lazy(() => import('../playground/world/mountains/mountainPath/MountainPathNavi'));
const MountainPath = lazy(() => import('../playground/world/mountains/mountainPath/MountainPath'));

const MountainPeakNavi = lazy(() => import('../playground/world/mountains/mountainPeak/MountainPeakNavi'));
const MountainPeak = lazy(() => import('../playground/world/mountains/mountainPeak/MountainPeak'));

export const routesWorldMountain: RouteConfig[] = [
    {
        path: PathsWorldMountain.HillCountry,
        element: HillCountry,
        navigation: HillCountryNavi,
    },
    {
        path: PathsWorldMountain.MountainBase,
        element: MountainBase,
        navigation: MountainBaseNavi,
    },
    {
        path: PathsWorldMountain.MountainPath,
        element: MountainPath,
        navigation: MountainPathNavi,
    },
    {
        path: PathsWorldMountain.MountainPeak,
        element: MountainPeak,
        navigation: MountainPeakNavi,
    },
];