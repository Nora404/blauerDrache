import { PlacesKeys, PLACES } from "../data/colorfullStrings";
import { GradientText } from "../utility/GradientText";
import { PathsGame } from "./pathsGame";
import { PathsLahtheimCenter } from "./pathsLahtheimCenter";
import { PathsLahtheimCityLimit } from "./pathsLahtheimCitylimit";
import { PathsLahtheimResidential } from "./pathsLahtheimResidential";
import { PathsLahtheimTrading } from "./pathsLahtheimTrading";
import { PathsWorldCaves } from "./pathsWorldCaves";
import { PathsWorldForest } from "./pathsWorldForest";
import { PathsWorldMountain } from "./pathsWorldMountains";
import { PathsWorldSurroundings } from "./pathsWorldSurroundings";
import { PathsWorldWaters } from "./pathsWorldWaters";

// Hier wird jeder Enum-Eintrag dem passenden PlacesKey (Deutsch) zugeordnet.
// Wichtig: key = Englischer Pfad, value = Name aus deiner PLACES-Definition.


// JA ich benutzte ChatGPT!!! Na und?
/*
Die Pfade in :from und :to sind ohne führenden Slash, also zum Beispiel "/north-gate" wird zu "north-gate" als Param.
Jetzt ist das Problem: dein Param from ist "north-gate", nicht "/north-gate". 
Also müsstest du, bevor du das an getPlaceLabelFromRoute übergibst, wieder ein "/" davorsetzen – 
oder du erweiterst das Mapping so, dass die Keys dort ohne Slash lauten (also "north-gate" statt "/north-gate").

Du definierst routeToPlaceKey ohne Slashes, z. B. [PathsLahtheimCityLimit.NorthGate.replace('/', '')]: 'Nordtor'. 
Dann kannst du direkt getPlaceLabelFromRoute(from) aufrufen. Das ist Geschmackssache.
*/

export const routeToPlaceKey: Record<string, PlacesKeys> = {
    // Beispiel: /start zeigt in PLACES => "Nordtor"
    [PathsGame.Start.replace('/', '')]: 'Nordtor',

    // Lahtheim City Limit
    [PathsLahtheimCityLimit.NorthGate.replace('/', '')]: 'Nordtor',
    [PathsLahtheimCityLimit.WestWall.replace('/', '')]: 'Westmauer',
    [PathsLahtheimCityLimit.EastWall.replace('/', '')]: 'Ostmauer',
    [PathsLahtheimCityLimit.SouthWall.replace('/', '')]: 'Südmauer',

    // Lahtheim Center
    [PathsLahtheimCenter.Fountain.replace('/', '')]: 'Brunnen',
    [PathsLahtheimCenter.Church.replace('/', '')]: 'Kirche',
    [PathsLahtheimCenter.Courtyard.replace('/', '')]: 'Vorplatz',
    [PathsLahtheimCenter.Graveyard.replace('/', '')]: 'Friedhof',
    [PathsLahtheimCenter.Townhall.replace('/', '')]: 'Rathaus',

    // Lahtheim Trading
    [PathsLahtheimTrading.TradingDistrict.replace('/', '')]: 'Handelsbezirk',
    [PathsLahtheimTrading.GeneralShop.replace('/', '')]: 'Krämer',
    [PathsLahtheimTrading.WeaponShop.replace('/', '')]: 'Waffenladen',
    [PathsLahtheimTrading.EquipmentShop.replace('/', '')]: 'Ausrüstungsladen',
    [PathsLahtheimTrading.Tavern.replace('/', '')]: 'Taverne',

    // Lahtheim Residential
    [PathsLahtheimResidential.Residential.replace('/', '')]: 'Wohnbezirk',
    [PathsLahtheimResidential.Alleys.replace('/', '')]: 'Gassen',
    [PathsLahtheimResidential.House.replace('/', '')]: 'Haus',

    // Welt: Höhlen
    [PathsWorldCaves.CaveEntrance.replace('/', '')]: 'Höhleneingang',
    [PathsWorldCaves.Cave.replace('/', '')]: 'Höhle',
    [PathsWorldCaves.TreasureChamber.replace('/', '')]: 'Schatzkammer',

    // Welt: Wälder
    [PathsWorldForest.Forest.replace('/', '')]: 'Wald',
    [PathsWorldForest.DarkForest.replace('/', '')]: 'Dunkelwald',
    [PathsWorldForest.ForestClearing.replace('/', '')]: 'Waldlichtung',
    [PathsWorldForest.ForestEdge.replace('/', '')]: 'Waldrand',

    // Welt: Berge
    [PathsWorldMountain.HillCountry.replace('/', '')]: 'Hügelland',
    [PathsWorldMountain.MountainBase.replace('/', '')]: 'Bergfuß',
    [PathsWorldMountain.MountainPath.replace('/', '')]: 'Bergpfad',
    [PathsWorldMountain.MountainPeak.replace('/', '')]: 'Bergspitze',

    // Welt: Umland
    [PathsWorldSurroundings.Field.replace('/', '')]: 'Feld',
    [PathsWorldSurroundings.Meadow.replace('/', '')]: 'Wiese',
    [PathsWorldSurroundings.Outhouse.replace('/', '')]: 'Toilletenhaus',
    [PathsWorldSurroundings.Path.replace('/', '')]: 'Weg',
    [PathsWorldSurroundings.Steppe.replace('/', '')]: 'Steppe',
    [PathsWorldSurroundings.Wasteland.replace('/', '')]: 'Ödland',

    // Welt: Gewässer
    [PathsWorldWaters.Lake.replace('/', '')]: 'See',
    [PathsWorldWaters.River.replace('/', '')]: 'Fluss',
    [PathsWorldWaters.Spring.replace('/', '')]: 'Quelle',
    [PathsWorldWaters.Swamp.replace('/', '')]: 'Sumpf',
};

/**
 * Optionaler Helper:
 * Gibt das JSX-Element aus PLACES zurück,
 * passend zu einem Pfad wie "/north-gate" oder "/path".
 */
export function getPlaceLabelFromRoute(route: string): JSX.Element {
    const placeKey = routeToPlaceKey[route];
    if (!placeKey) {
        <b><GradientText colors={['#ffffff']}>{route}</GradientText></b>
    }
    return PLACES[placeKey];
}

export function getPlaceNameFromRoute(route: string | undefined): PlacesKeys {
    if (!route) {
        return "Brunnen";
    }
    const placeKey = routeToPlaceKey[route];
    return placeKey || "Unbekannt";
}