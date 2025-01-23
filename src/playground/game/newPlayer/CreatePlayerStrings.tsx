import { CREATURE } from "../../../data/helper/colorfullStrings";
import Talk from "../../../utility/Formatted/Talk";
import PlayerTalk from "../../../utility/PlayerTalk";

export const ChooseRaceText: React.FC = () => {
  return (
    <div className="text-left">
      <p className="mb-1">
        Ein kleines {CREATURE.blauesWesen} fliegt direkt auf dich zu. Es hält
        nur wenige Zentimeter vor deinem Kopf an und betrachtet dich kritisch.
      </p>

      <p className="mb-1">
        <PlayerTalk>"Wa-wa-wa..."</PlayerTalk> stammelst du.
        <br />
      </p>

      <p className="mb-1">
        <Talk color="rotesWesen">
          "Du beherschst anscheinend nicht unsere Sprache. Dann werde ich l a n
          g s a m reden!"
        </Talk>
        <br />
        hörst du eine Stimme hinter dir. Erschrochen drehst du dich um und
        erkennst ein {CREATURE.rotesWesen}. Es setzt sich auf deine Schulter
        wärend {CREATURE.blauesWesen} zu sprechen beginnt.
      </p>

      <p className="mb-1">
        <Talk color="blauesWesen">
          "Also, wir sind hier, um dich mit diesem Reich vertraut zu machen,
          also tust du gut daran, uns ganz genau zuzuhören"
        </Talk>
      </p>

      <p className="mb-1">
        Du nickst stumm und schenkst diesen seltsamen Wesen deine volle
        Aufmerksamkeit.
      </p>

      <p className="mb-1">
        <Talk color="rotesWesen">
          "Gut, dann fangen wir mal an. Zuerst musst du dich hier anmelden.
          Dafür brauchen wir deinen Namen, deine Herkunft und so weiter."
        </Talk>{" "}
        beginnt das {CREATURE.rotesWesen} seinen Text herunter zu rattern.
        Zeitgleich holt das {CREATURE.blauesWesen} einen Notizblock und zaubert
        eine Füllfeder aus dem Nichts heraus. Es macht sich bereit zu schreiben
        ...
      </p>
    </div>
  );
};

export const ChooseOriginText: React.FC = () => {
  return (
    <div className="text-left">
      <p className="mb-1">
        <Talk color="rotesWesen">
          "Glaubst du wir sind blind, das wir das nicht selbst schon erkannt
          haben?"{" "}
        </Talk>
        Höhnt das {CREATURE.roteWesen} während es langsam um dich herum schwebt.
        Das {CREATURE.blaueWesen} flattert zu dir und schupst das{" "}
        {CREATURE.roteWesen} weg.
      </p>
      <p className="mb-1">
        <Talk color="blauesWesen">
          "Er will nur wissen woher du kommst, zu welcher Gruppe du gehörst."
        </Talk>
      </p>
    </div>
  );
};

export const ChooseCallingText: React.FC = () => {
  return (
    <div className="text-left">
      <p className="mb-1">
        <Talk color="blauesWesen">
          "Oh wie schön! Das hatten wir schon lange nicht mehr hier."{" "}
        </Talk>
        Das {CREATURE.roteWesen} schaut ungläubig das {CREATURE.blaueWesen} an.
      </p>
      <p className="mb-1">
        <Talk color="rotesWesen">
          "Das meinst du nicht ernst oder? Von denen hier laufen doch hunderte
          herum und tun so als wären sie einzigartig und die 'Auserwählten' um
          unser reich vor den Drachen zu retten!"
        </Talk>
      </p>
      <p className="mb-1">
        <Talk color="blauesWesen">
          "Drachen sind so freundliche Wesen, niemand braucht uns vor ihnen zu
          retten. Sei doch einmal etwas freundlicher!"
        </Talk>{" "}
        sagt das {CREATURE.blaueWesen} empört. Die Beiden tauschen noch weitere
        nicht ganz so freundliche Worte aus. In der Zeit überlegst du warum es
        dich nach Lahtheim verschleppt hat. Was ist deine Berufung?
      </p>
    </div>
  );
};

export const ChooseNameText: React.FC = () => {
  return (
    <div className="text-left">
      <p className="mb-1">
        Nachdem du deine Berufung offenbart hast lassen die beiden streitenden
        Wesen von einander ab und wenden sich wieder dir zu. Das{" "}
        {CREATURE.blaueWesen} nickt zufrieden.
        <Talk color="blauesWesen">"Sehr gut, ich notiere das ..." </Talk>{" "}
        Nachdem es mit dramatischer Bewegung den letzten Strich gezogen hat, das{" "}
        {CREATURE.roteWesen} rollt mit den Augen, fragt es dich mit
        verheißungsvoller Stimme:
      </p>
      <p className="mb-1">
        <Talk color="blauesWesen">"Und wie ist dein Name?"</Talk>
      </p>
    </div>
  );
};

export const FinalText: React.FC = () => {
  return (
    <div className="text-left">
      <p className="mb-1">
        <Talk color="blauesWesen">
          "Ich habe alles notiert und werde es weiter leiten"{" "}
        </Talk>{" "}
        Das {CREATURE.blaueWesen} winkt zu jemanden am Tor zu. Kurz darauf kommt
        ein {CREATURE.geflügeltesWesen} herbei geschwebt und nimmt den
        Notizblock entgegen.
        <Talk color="blauesWesen">
          "Bring das ins Rathaus zur Bearbeitung"
        </Talk>{" "}
        <Talk color="geflügeltesWesen">"Jawohl!"</Talk> sagt das{" "}
        {CREATURE.geflügelteWesen} und schwirrt davon.
      </p>
      <p className="mb-1">
        <Talk color="rotesWesen">"Endlich vorbei und jetzt hau schon ab."</Talk>{" "}
        Beide Wesen wenden sich von dir ab und fliegen davon. Plötzlich dreht
        das {CREATURE.roteWesen} noch einmal um, schwebt zu dir und sagt mit
        einem führ ihn seltsam wirkenden Lächeln:
        <Talk color="rotesWesen">"Du solltest dem </Talk>{" "}
        {CREATURE.blauenDrachen}{" "}
        <Talk color="rotesWesen"> einen Besuch abstatten!"</Talk>
      </p>
    </div>
  );
};
