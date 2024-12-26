import { routesGame, routesLahtheimCenter, routesLahtheimCityLimit } from "./routings";

export interface RouteConfig {
  path: string;
  element: React.LazyExoticComponent<React.ComponentType<any>>;
  navigation?: React.LazyExoticComponent<React.ComponentType<any>>;
}


export const routes: RouteConfig[] = [
  ...routesGame,
  ...routesLahtheimCenter,
  ...routesLahtheimCityLimit,
];