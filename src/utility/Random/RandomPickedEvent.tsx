
type WeightedEvent = {
    eventId: string;
    probability: number;
};


export function pickRandomEvent(
    eventPool: WeightedEvent[],
    chanceOfAnyEvent = 1 // default: 100%
): string | null {

    if (Math.random() > chanceOfAnyEvent) {
        return null;
    }

    const totalWeight = eventPool.reduce((sum, e) => sum + e.probability, 0);
    let r = Math.random() * totalWeight;
    for (const e of eventPool) {
        if (r < e.probability) {
            return e.eventId;
        }
        r -= e.probability;
    }

    // Fallback (wenn irgendwas schiefging)
    return eventPool[eventPool.length - 1].eventId;
}


//BENUTZEN
/*
const possibleEvents = [
  { eventId: "001StoneCoin", probability: 50 },
  { eventId: "002IrgendwasAnderes", probability: 30 },
  { eventId: "003NochWas", probability: 20 },
];

function CourtyardTreasure() {
  const [eventChainActive, setEventChainActive] = useState<string | null>(null);

  useEffect(() => {
    // Nur 40% Chance, dass überhaupt ein Event kommt
    const result = pickRandomEvent(possibleEvents, 0.4);
    setEventChainActive(result); 
  }, []);

}
*/
