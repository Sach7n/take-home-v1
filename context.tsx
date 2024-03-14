// AppContext.tsx
import React, {createContext, useContext, useState} from 'react';

type Favorite = {
  data: object;
};

type AppContextType = {
  country: string;
  setCountry: (country: string) => void;
  fav: Favorite[];
  setFav: (data: []) => void;
  test: string[];
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

export const AppProvider: React.FC<any> = ({children}) => {
  const [country, setCountry] = useState<string>('');
  const [fav, setFav] = useState<Favorite[]>([]);
  console.log(fav);
  const test: string[] = [];
  const value: AppContextType = {
    country,
    setCountry,
    fav,
    setFav,
    test,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
