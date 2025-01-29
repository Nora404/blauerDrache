import { lazy } from "react";
import { RouteConfig } from "../routes";

export enum PathsLahtheimTrading {
  EquipmentShop = "/equipment-shop",
  GeneralShop = "/general-shop",
  Tavern = "/tavern",
  TradingDistrict = "/trading-district",
  WeaponShop = "/weapon-shop",
  WeaponSell = "/weapon-sell",
  WeaponBuy = "/weapon-buy",
}

const EquipmentShopNavi = lazy(
  () => import("../playground/lahtheim/trading/equipmentShop/EquipmentShopNavi")
);
const EquipmentShop = lazy(
  () => import("../playground/lahtheim//trading/equipmentShop/EquipmentShop")
);

const GeneralShopNavi = lazy(
  () => import("../playground/lahtheim/trading/generalStore/GeneralStoreNavi")
);
const GeneralShop = lazy(
  () => import("../playground/lahtheim/trading/generalStore/GeneralStore")
);

const TavernNavi = lazy(
  () => import("../playground/lahtheim/trading/tavern/TavernNavi")
);
const Tavern = lazy(
  () => import("../playground/lahtheim/trading/tavern/Tavern")
);

const TradingDistrictNavi = lazy(
  () =>
    import("../playground/lahtheim/trading/tradingDistrict/TradingDistrictNavi")
);
const TradingDistrict = lazy(
  () => import("../playground/lahtheim/trading/tradingDistrict/TradingDistrict")
);

const WeaponShopNavi = lazy(
  () => import("../playground/lahtheim/trading/weaponShop/WeaponShopNavi")
);
const WeaponShop = lazy(
  () => import("../playground/lahtheim/trading/weaponShop/WeaponShop")
);
const WeaponSell = lazy(
  () => import("../playground/lahtheim/trading/weaponShop/WeaponSell")
);
const WeaponBuy = lazy(
  () => import("../playground/lahtheim/trading/weaponShop/WeaponBuy")
);

export const routesLahtheimTrading: RouteConfig[] = [
  {
    path: PathsLahtheimTrading.EquipmentShop,
    element: EquipmentShop,
    navigation: EquipmentShopNavi,
  },
  {
    path: PathsLahtheimTrading.GeneralShop,
    element: GeneralShop,
    navigation: GeneralShopNavi,
  },
  {
    path: PathsLahtheimTrading.Tavern,
    element: Tavern,
    navigation: TavernNavi,
  },
  {
    path: PathsLahtheimTrading.TradingDistrict,
    element: TradingDistrict,
    navigation: TradingDistrictNavi,
  },
  {
    path: PathsLahtheimTrading.WeaponShop,
    element: WeaponShop,
    navigation: WeaponShopNavi,
  },
  {
    path: PathsLahtheimTrading.WeaponSell,
    element: WeaponSell,
    navigation: WeaponShopNavi,
  },
  {
    path: PathsLahtheimTrading.WeaponBuy,
    element: WeaponBuy,
    navigation: WeaponShopNavi,
  },
];
