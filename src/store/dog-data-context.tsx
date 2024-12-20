import React, { createContext, useState, ReactNode, useEffect } from "react";
import { DogData } from "../models/DogData";
import { Preferences } from "../services/preferences";

export const DogDataContext = createContext<
  | {
      dog: DogData | undefined;
      setDog: (dog: DogData) => void;
    }
  | undefined
>({
  dog: undefined,
  setDog: () => {},
});

export default function DogDataContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [dog, setDog] = useState<DogData | undefined>(undefined);

  return (
    <DogDataContext.Provider value={{ dog, setDog }}>
      {children}
    </DogDataContext.Provider>
  );
}
