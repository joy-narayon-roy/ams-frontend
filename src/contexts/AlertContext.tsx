/* eslint-disable react-refresh/only-export-components */
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
} from "react";

type AlertType = "success" | "failed";

interface Alert {
  id: string;
  type: AlertType;
  message: string;
}

interface AlertContextType {
  alerts: Alert[];
  addAlert: (type: AlertType, message: string) => void;
  removeAlert: (id: string) => void; // New function
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export const AlertProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [alerts, setAlerts] = useState<Alert[]>([]);

  const addAlert = useCallback((type: AlertType, message: string) => {
    const id = crypto.randomUUID();
    const newAlert = { id, type, message };
    setAlerts((prevAlerts) => [...prevAlerts, newAlert]);

    // Remove the alert automatically after 5 seconds
    setTimeout(() => {
      setAlerts((prevAlerts) => prevAlerts.filter((alert) => alert.id !== id));
    }, 5000);
  }, []);

  const removeAlert = useCallback((id: string) => {
    setAlerts((prevAlerts) => prevAlerts.filter((alert) => alert.id !== id));
  }, []);

  return (
    <AlertContext.Provider value={{ alerts, addAlert, removeAlert }}>
      {children}
    </AlertContext.Provider>
  );
};

export const useAlert = (): AlertContextType => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error("useAlert must be used within an AlertProvider");
  }
  return context;
};
