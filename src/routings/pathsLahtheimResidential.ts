import { lazy } from "react";
import { RouteConfig } from "../routes";

export enum PathsLahtheimResidential {
    Alleys = '/alleys',
    House = '/house',
    Residential = '/residential',
}

const AlleysNavi = lazy(() => import('../playground/lahtheim/residential/alleys/AlleysNavi'));
const Alleys = lazy(() => import('../playground/lahtheim//residential/alleys/Alleys'));

const HouseNavi = lazy(() => import('../playground/lahtheim/residential/house/HouseNavi'));
const House = lazy(() => import('../playground/lahtheim/residential/house/House'));

const ResidentialNavi = lazy(() => import('../playground/lahtheim/residential/residential/ResidentialNavi'));
const Residential = lazy(() => import('../playground/lahtheim/residential/residential/Residential'));

export const routesLahtheimResidential: RouteConfig[] = [
    {
        path: PathsLahtheimResidential.Alleys,
        element: Alleys,
        navigation: AlleysNavi,
    },
    {
        path: PathsLahtheimResidential.House,
        element: House,
        navigation: HouseNavi,
    },
    {
        path: PathsLahtheimResidential.Residential,
        element: Residential,
        navigation: ResidentialNavi,
    },
];