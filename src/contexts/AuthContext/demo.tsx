import React, { createContext, useContext, useState, ReactNode } from "react";

// Define the type for the context value
interface AppContextType {
  user: string | null;
  setUser: React.Dispatch<React.SetStateAction<string | null>>;
}

// Create the context with a default value of `undefined`
const AppContext = createContext<AppContextType | undefined>(undefined);

// Define the type for the provider's props
interface AppProviderProps {
  children: ReactNode;
}

// Create the provider component
export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [user, setUser] = useState<string | null>(null);

  const value = {
    user,
    setUser,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

// Custom hook to use the AppContext
export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }

  return context;
};
