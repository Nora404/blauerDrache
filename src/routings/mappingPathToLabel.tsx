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
    [PathsLahtheimCityLimit.WestWall]: 'Westmauer',
    [PathsLahtheimCityLimit.EastWall]: 'Ostmauer',
    [PathsLahtheimCityLimit.SouthWall]: 'Südmauer',

    // Lahtheim Center
    [PathsLahtheimCenter.Fountain]: 'Brunnen',
    [PathsLahtheimCenter.Church]: 'Kirche',
    [PathsLahtheimCenter.Courtyard]: 'Vorplatz',
    [PathsLahtheimCenter.Graveyard]: 'Friedhof',
    [PathsLahtheimCenter.Townhall]: 'Rathaus',

    // Lahtheim Trading
    [PathsLahtheimTrading.TradingDistrict]: 'Handelsbezirk',
    [PathsLahtheimTrading.GeneralShop]: 'Krämer',
    [PathsLahtheimTrading.WeaponShop]: 'Waffenladen',
    [PathsLahtheimTrading.EquipmentShop]: 'Ausrüstungsladen',
    [PathsLahtheimTrading.Tavern]: 'Taverne',

    // Lahtheim Residential
    [PathsLahtheimResidential.Residential]: 'Wohnbezirk',
    [PathsLahtheimResidential.Alleys]: 'Gassen',
    [PathsLahtheimResidential.House]: 'Haus',

    // Welt: Höhlen
    [PathsWorldCaves.CaveEntrance]: 'Höhleneingang',
    [PathsWorldCaves.Cave]: 'Höhle',
    [PathsWorldCaves.TreasureChamber]: 'Schatzkammer',

    // Welt: Wälder
    [PathsWorldForest.Forest]: 'Wald',
    [PathsWorldForest.DarkForest]: 'Dunkelwald',
    [PathsWorldForest.ForestClearing]: 'Waldlichtung',
    [PathsWorldForest.ForestEdge]: 'Waldrand',

    // Welt: Berge
    [PathsWorldMountain.HillCountry]: 'Hügelland',
    [PathsWorldMountain.MountainBase]: 'Bergfuß',
    [PathsWorldMountain.MountainPath]: 'Bergpfad',
    [PathsWorldMountain.MountainPeak]: 'Bergspitze',

    // Welt: Umland
    [PathsWorldSurroundings.Field]: 'Feld',
    [PathsWorldSurroundings.Meadow]: 'Wiese',
    [PathsWorldSurroundings.Outhouse]: 'Toilletenhaus',
    [PathsWorldSurroundings.Path.replace('/', '')]: 'Weg',
    [PathsWorldSurroundings.Steppe]: 'Steppe',
    [PathsWorldSurroundings.Wasteland]: 'Ödland',

    // Welt: Gewässer
    [PathsWorldWaters.Lake]: 'See',
    [PathsWorldWaters.River]: 'Fluss',
    [PathsWorldWaters.Spring]: 'Quelle',
    [PathsWorldWaters.Swamp]: 'Sumpf',
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