import { routesGame, routesLahtheimCenter, routesLahtheimCityLimit, routesLahtheimTrading, routesWorldCaves, routesWorldForest, routesWorldMountain, routesWorldSurroundings, routesWorldWaters } from "./routings";

export interface RouteConfig {
  path: string;
  element: React.LazyExoticComponent<React.ComponentType<any>>;
  navigation?: React.LazyExoticComponent<React.ComponentType<any>>;
}


export const routes: RouteConfig[] = [
  ...routesLahtheimCenter,
  ...routesLahtheimCityLimit,
  ...routesLahtheimTrading,
  ...routesWorldCaves,
  ...routesWorldForest,
  ...routesWorldMountain,
  ...routesWorldSurroundings,
  ...routesWorldWaters,
  ...routesGame,
];