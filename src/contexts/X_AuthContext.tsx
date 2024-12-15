/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {
  createContext,
  useEffect,
  useState,
  useContext,
  useCallback,
  Dispatch,
  SetStateAction,
} from "react";
import httpReq from "../utilities/httpReq";
import { User } from "../models";

export interface AuthContextInterface {
  user: User | null;
  loading: boolean;
  error: boolean | string;
  setUser: Dispatch<SetStateAction<User>>;
  logout: () => void;
  login: (args: loginInterface) => void;
}
const defaultAuthValue = {
  user: null,
  loading: true,
  error: false,
  setUser: () => {},
  logout: () => {},
  login: () => {},
} as AuthContextInterface;
const AuthContext = createContext(defaultAuthValue);

function useAuthContext() {
  return useContext(AuthContext);
}

function getTokenInfo(cb: any) {
  httpReq
    .get("/user")
    .then(({ data }) => {
      const usr = new User(data);
      cb(usr, null);
    })
    .catch((e) => {
      cb(null, e);
    });
}

interface loginInterface {
  email: string;
  password: string;
}
async function loginFunc({ email, password }: loginInterface) {
  console.log(email, password);
}

type AuthProviderType = {
  children: React.ReactNode;
};
function AuthProvider({ children }: AuthProviderType) {
  const [user, setUserState] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean | string>(false);
  const last_token: string | null = localStorage.getItem("token");

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    setUserState(null);
    setError(false);
    setLoading(false);
  }, []);

  // const login = useCallback((token: string, userData: any) => {
  //   if (token && userData) {
  //     localStorage.setItem("token", token);
  //     const userInstance = new User(userData);
  //     setUserState(userInstance);
  //   }
  // }, []);

  useEffect(() => {
    if (!user && last_token) {
      getTokenInfo((data: any, err: any) => {
        if (err) {
          setError(err);
          setUserState(null);
        } else {
          setUserState(data);
          setError(false);
        }
        setLoading(false);
      });
    } else if (!user && !last_token) {
      setLoading(false);
    }
  }, [user, last_token]);

  const setUser = useCallback((newUser: any) => {
    if (!newUser) {
      setUserState(null);
    } else {
      const usr = new User(newUser);
      setUserState(usr);
    }
    setLoading(false);
    setError(false);
  }, []);

  const value = {
    user,
    loading,
    error,
    setUser,
    logout,
    login: loginFunc,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export { AuthContext, AuthProvider, useAuthContext };
