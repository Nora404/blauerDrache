## Record

Ein Record in TypeScript ist ein vordefinierter Typ, der Schlüssel-Wert-Paare definiert.

```typescript
const myRecord: Record<string, number> = {
  apple: 3,
  banana: 5,
  cherry: 8,
};
```

#### 1. Durch einen Record iterieren

Da ein Record intern ein Objekt ist, kannst du mit Object.keys, Object.values oder Object.entries durch ihn iterieren.

```typescript
Object.keys(myRecord).forEach((key) => {
  console.log(`Key: ${key}`);
});

Object.values(myRecord).forEach((value) => {
  console.log(`Value: ${value}`);
});

Object.entries(myRecord).forEach(([key, value]) => {
  console.log(`Key: ${key}, Value: ${value}`);
});
```

#### 2. Nach einem bestimmten Schlüssel suchen

Verwende den Operator in, um zu prüfen, ob ein Schlüssel existiert:

```typescript
if ("banana" in myRecord) {
  console.log("Banana exists with value:", myRecord["banana"]);
}
```

#### 3. Werte nutzen

Um die Werte eines Record zu nutzen, greifst du direkt mit dem Schlüssel darauf zu:

```typescript
const cherryCount = myRecord["cherry"];
console.log(`Cherry count: ${cherryCount}`);

const dynamicKey = "apple";
const value = myRecord[dynamicKey];
console.log(`Value of ${dynamicKey}: ${value}`);
```

#### 4. Filter oder Map auf einen Record anwenden

Da Record ein Objekt ist, kannst du ihn nicht direkt filtern oder mappen. Stattdessen kannst du die Einträge in ein Array konvertieren, die gewünschte Operation durchführen und das Ergebnis in ein neues Objekt umwandeln.

```typescript
const filteredRecord = Object.entries(myRecord)
  .filter(([key, value]) => value > 3) // Bedingung
  .reduce((acc, [key, value]) => {
    acc[key] = value; // Neuer Record
    return acc;
  }, {} as Record<string, number>);

console.log(filteredRecord);


const mappedRecord = Object.entries(myRecord)
  .map(([key, value]) => [key, value * 2]) // Werte verdoppeln
  .reduce((acc, [key, value]) => {
    acc[key] = value;
    return acc;
  }, {} as Record<string, number>);

console.log(mappedRecord);
```