Dieses Template ist eslint und sonarqube freundlich
 
```typescript
import React, { createContext, useMemo, useState } from 'react';

interface MyContextType {
  str1: string;
  setStr1: React.Dispatch<React.SetStateAction<string>>;
  str2: string;
  setStr2: React.Dispatch<React.SetStateAction<string>>;
  str3: string;
  setStr3: React.Dispatch<React.SetStateAction<string>>;
  num1: number;
  setNum1: React.Dispatch<React.SetStateAction<number>>;
  num2: number;
  setNum2: React.Dispatch<React.SetStateAction<number>>;
}

// eslint-disable-next-line react-refresh/only-export-components
export const MyContext = createContext<MyContextType | undefined>(undefined);

type ChildrenType = { children: ReactNode};
export const MyProvider = ({ children }: ChildrenType) => {
  // Initialisierung der 3 Strings und 2 Zahlen
  const [str1, setStr1] = useState("Hallo");
  const [str2, setStr2] = useState("Welt");
  const [str3, setStr3] = useState("React");
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(100);

  // Der Context-Wert enthält sowohl die Werte als auch die Setter
  const value = useMemo(() => ({
    str1, setStr1, // String 1
    str2, setStr2, // String 2
    str3, setStr3, // String 3
    num1, setNum1, // Number 1
    num2, setNum2  // Number 2
  }), [str1, str2, str3, num1, num2]);

  return (
    <MyContext.Provider value={value}>
      {children}
    </MyContext.Provider>
  );
};
```
--------------------------------------------------------------------------------
```typescript
import React from 'react';
import { MyProvider } from './MyContext';
import ComponentA from './ComponentA';
import ComponentB from './ComponentB';

function App() {
  return (
    <MyProvider>
      <ComponentA />
      <ComponentB />
    </MyProvider>
  );
}

export default App;
```
--------------------------------------------------------------------------------
```typescript
import React, { useContext } from 'react';
import { MyContext } from './MyContext';

const ComponentA = () => {
  const { str1, setStr1, num1, setNum1 } = useContext(MyContext);

  return (
    <div>
      <p>{str1} - {num1}</p>
      {/* Ändert str1 und erhöht num1 */}
      <button onClick={() => {
        setStr1("Neu");
        setNum1(num1 + 1);
      }}>
        Update A
      </button>
    </div>
  );
};

export default ComponentA;
```
--------------------------------------------------------------------------------
```typescript
import React, { useContext } from 'react';
import { MyContext } from './MyContext';

const ComponentB = () => {
  const { str2, str3, num2, setStr2, setStr3, setNum2 } = useContext(MyContext);

  return (
    <div>
      <p>{str2} - {str3} - {num2}</p>
      {/* Ändert str2, str3 und erhöht num2 */}
      <button onClick={() => {
        setStr2("Updated");
        setStr3("Updated again");
        setNum2(num2 + 10);
      }}>
        Update B
      </button>
    </div>
  );
};

export default ComponentB;
```