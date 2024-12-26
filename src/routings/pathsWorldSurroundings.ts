import { lazy } from "react";
import { RouteConfig } from "../routes";

export enum PathsWorldSurroundings {
    Field = '/field',
    Meadow = '/meadow',
    Outhouse = '/outhouse',
    Path = '/path',
    Steppe = '/steppe',
    Wasteland = '/wasteland',
}


const FieldNavi = lazy(() => import('../playground/world/surroundings/field/FieldNavi'));
const Field = lazy(() => import('../playground/world/surroundings/field/Field'));

const MeadowNavi = lazy(() => import('../playground/world/surroundings/meadow/MeadowNavi'));
const Meadow = lazy(() => import('../playground/world/surroundings/meadow/Meadow'));

const OuthouseNavi = lazy(() => import('../playground/world/surroundings/outhouse/OuthouseNavi'));
const Outhouse = lazy(() => import('../playground/world/surroundings/outhouse/Outhouse'));

const PathNavi = lazy(() => import('../playground/world/surroundings/path/PathNavi'));
const Path = lazy(() => import('../playground/world/surroundings/path/Path'));

const SteppeNavi = lazy(() => import('../playground/world/surroundings/steppe/SteppeNavi'));
const Steppe = lazy(() => import('../playground/world/surroundings/steppe/Steppe'));

const WastelandNavi = lazy(() => import('../playground/world/surroundings/wasteland/WastelandNavi'));
const Wasteland = lazy(() => import('../playground/world/surroundings/wasteland/Wasteland'));

export const routesWorldSurroundings: RouteConfig[] = [
    {
        path: PathsWorldSurroundings.Field,
        element: Field,
        navigation: FieldNavi,
    },
    {
        path: PathsWorldSurroundings.Meadow,
        element: Meadow,
        navigation: MeadowNavi,
    },
    {
        path: PathsWorldSurroundings.Outhouse,
        element: Outhouse,
        navigation: OuthouseNavi,
    },
    {
        path: PathsWorldSurroundings.Path,
        element: Path,
        navigation: PathNavi,
    },
    {
        path: PathsWorldSurroundings.Steppe,
        element: Steppe,
        navigation: SteppeNavi,
    },
    {
        path: PathsWorldSurroundings.Wasteland,
        element: Wasteland,
        navigation: WastelandNavi,
    },
];