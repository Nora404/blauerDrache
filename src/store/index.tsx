// stores/index.ts
import React, { createContext, useContext } from "react";
import { RootStore } from "./rootStore";

const rootStore = new RootStore();

const StoreContext = createContext<RootStore>(rootStore);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <StoreContext.Provider value= { rootStore } > { children } </StoreContext.Provider>
  );
};

export const useRootStore = () => useContext(StoreContext);
