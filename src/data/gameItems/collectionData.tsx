import SparklingText from "../../utility/Formatted/Sparkling/SparklingText";
import { Item } from "./ItemData";

export type CollectingName = 
| "RotesFragment"
| "ViolettesFragment"
| "GrünesFragment"
| "WeißesFragment"
| "BlauesFragment"
| "GelbesFragment"
| "SchwarzesFragment"
| "PinkesFragment"
| "BlassesFragment"
| "MattesFragment"
| "ZerbrochenesFragment";

export const collections: Item[] = [
  {
    name: "RotesFragment",
    label: <SparklingText color="#FF5454">Rotes Fragment</SparklingText>,
    category: "Fragmente",
    description: "„Es ist so heiß. Nur Feuer um mich herum und dieses Licht.  Ich habe versucht, es mir zu eigen zu machen. Es fühlt sich gut an.  Warum wollen die anderen nichts mit mir zu tun haben? Warum meiden sie mich?  Ich suche mir einen Ort, an dem ich willkommen bin.“",
  },
  {
    name: "ViolettesFragment",
    label: <SparklingText color="#C474FF">Violettes Fragment</SparklingText>,
    category: "Fragmente",
    description: "„Ich bin anders! Sie sind alle so schwach und erkennen es nicht.  Es interessiert sie nicht. Warum sollte ich mich mit nur einer dieser Energien begnügen?  Je mehr ich bekomme, desto mächtiger werde ich. Was könnte ich damit nur alles anstellen?“",
  },
  {
    name: "GrünesFragment",
    label: <SparklingText color="#85E66A">Grünes Fragment</SparklingText>,
    category: "Fragmente",
    description: "„Erkennst du, wie es sich verändert hat? Ich bin mir sicher,  dass es vorher winzig war und jetzt … es nimmt sich, was es braucht, aber es gibt auch ab.  Andere brauchen, was es abgibt, und geben dafür etwas zurück, das wieder andere brauchen.  Ein harmonischer Kreislauf.“",
  },
  {
    name: "WeißesFragment",
    label: <SparklingText color="#eeeeee">Weißes Fragment</SparklingText>,
    category: "Fragmente",
    description: "„Eine Richtung. Das haben sie gesagt. Alles geht in eine Richtung. Aber warum?  Man kann sich doch auch in die andere Richtung bewegen. Warum sollte ich warten oder bedauern,  etwas verpasst zu haben? Ich gehe einfach dahin, wo ich sein will.“",
  },
  {
    name: "BlauesFragment",
    label: <SparklingText color="#77C5F5">Blaues Fragment</SparklingText>,
    category: "Fragmente",
    description: "„Es entsteht ein Ungleichgewicht. Es war noch nie ausgeglichen, aber das hier könnte gefährlich werden.  Er nimmt mehr, als er sollte. Er verschlingt und vernichtet ohne Not. Einige fangen an zu verschwinden.  Ich spüre seinen Einfluss auch in mir.“",
  },
  {
    name: "GelbesFragment",
    label: <SparklingText color="#F5EA70">Gelbes Fragment</SparklingText>,
    category: "Fragmente",
    description: "„Warum erkennt sie meine Not nicht?  Ich habe schon meinen Anker verloren, und mein Geist wird immer nebliger.  Er löst sich langsam auf, und ich kann es nicht stoppen. Wenn er so weitermacht,  wird bald nur noch Dunkelheit sein. Warum tut er das? Warum hilft sie mir nicht?“",
  },
  {
    name: "SchwarzesFragment",
    label: <SparklingText color="#9698AD">Schwarzes Fragment</SparklingText>,
    category: "Fragmente",
    description: "„Mir gefällt, was er macht. Ich werde es beobachten, noch hat er mich nicht gesehen – wie denn auch?  Mir ist keine der Energien zu eigen. Ich bin Nichts, und wenn er Alles ist, wird er auch ein Nichts werden.  Er scheint die Natur dahinter nicht zu erkennen. Ich werde es genießen.“",
  },
  {
    name: "PinkesFragment",
    label: <SparklingText color="#F07DE5">Pinkes Fragment</SparklingText>,
    category: "Fragmente",
    description: "„Sie hat mich gerettet, aber ich glaube, sie versteht nicht, dass sie mich gerettet hat.  Sie versteht nicht, dass wir alle an die eine Richtung gebunden sind.  Von der Vergangenheit über die Gegenwart in Richtung Zukunft. Sie geht einfach dahin, wohin sie will.“",
  },
  {
    name: "BlassesFragment",
    label: <SparklingText color="#F5E9BA">Blasses Fragment</SparklingText>,
    category: "Fragmente",
    description: "„Er hat alles in sich aufgenommen. Es gibt nichts mehr, das noch existiert.  Ich sehe nur eine Hoffnung, um ihn aufzuhalten. Ich muss ihn mit mir nehmen – durch die Zeit.  Immer nur kurz, sodass er keinen großen Schaden anrichtet. Er darf niemals entkommen.“",
  },
  {
    name: "MattesFragment",
    label: <SparklingText color="#D6D5C8">Mattes Fragment</SparklingText>,
    category: "Fragmente",
    description: "„Sie bat mich, ihr zu helfen. Ich stimmte zu, doch ahnte ich nicht, was das genau bedeutet.  Gefangen in der Zeit – nicht nur er, sondern auch sie und ich.  Nur einen kurzen Moment darf ich existieren, kämpfen, um dann wieder zu verschwinden.  Könnte es ein grausameres Schicksal geben?“",
  },
  {
    name: "ZerbrochenesFragment",
    label: <SparklingText color="#BDBDBD">Zerbrochenes Fragment</SparklingText>,
    category: "Fragmente",
    description: "„… Finde mich! Bitte … erlöse … mich.“",
  },
];
