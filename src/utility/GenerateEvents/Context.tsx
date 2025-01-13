import React, { createContext, useContext, useState, ReactNode } from "react";

// Typen für den Kontext definieren
interface ContextType {
    // Hier die Werte und Funktionen definieren, die im Kontext verfügbar sein sollen
    exampleValue: string;
    setExampleValue: (value: string) => void;
}

// Standardwerte für den Kontext
const defaultContextValue: ContextType = {
    exampleValue: "",
    setExampleValue: () => { },
};

// Den Kontext erstellen
const MyContext = createContext<ContextType>(defaultContextValue);

// Provider-Komponente
export const MyContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [exampleValue, setExampleValue] = useState<string>("");

    return (
        <MyContext.Provider value={{ exampleValue, setExampleValue }}>
            {children}
        </MyContext.Provider>
    );
};

// Custom Hook, um den Kontext einfacher zu nutzen
export const useMyContext = () => {
    const context = useContext(MyContext);
    if (!context) {
        throw new Error("useMyContext must be used within a MyContextProvider");
    }
    return context;
};



// VERWENDUNG
// const Root: React.FC = () => {
//   return (
//     <MyContextProvider>
//       <App />
//     </MyContextProvider>
//   );
// };



//BENUTZEN
// const ExampleComponent: React.FC = () => {
//   const { exampleValue, setExampleValue } = useMyContext();
//   return (
//     <div>
//       <p>Current Value: {exampleValue}</p>
//       <button onClick={() => setExampleValue("New Value")}>Update Value</button>
//     </div>
//   );
// };

