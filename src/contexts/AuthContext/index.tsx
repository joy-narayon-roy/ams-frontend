import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { User } from "../../models";
import { loginFunc, loginInterface } from "./login";
import { getTokenInfo } from "../../utilities/getTokenInfo";
import { UserArg } from "../../models/User";

interface AuthContextInterface {
  user: User | null;
  loading: boolean;
  error: boolean | string;
  logout: () => void;
  login: ({ email, password }: loginInterface) => Promise<User | null>;
}

const defaultContext = {
  user: null,
  loading: true,
  error: false,
  login: async () => null,
  logout: () => {},
} as AuthContextInterface;

const AuthContext = createContext(defaultContext);

function useAuthContext() {
  return useContext(AuthContext);
}

type AuthProviderType = {
  children: React.ReactNode;
};

function AuthProvider({ children }: AuthProviderType) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean | string>(false);
  const token = localStorage.getItem("token");

  // Logout function
  const logout = useCallback(() => {
    localStorage.removeItem("token");
    setUser(null);
    setError(false);
    setLoading(false);
  }, []);

  // Login function
  // interface errorType {
  //   message: string;
  //   status: number;
  //   token: string | null;
  //   user: User | null;
  // }
  const login = useCallback(
    async ({ email, password }: loginInterface) => {
      try {
        if (user) {
          return user;
        }
        if (token) {
          const newUser = await getTokenInfo();
          setUser(newUser);
          return newUser;
        } else {
          const { user: userInfo, token } = await loginFunc({
            email,
            password,
          });
          if (token) {
            localStorage.setItem("token", token);
          }
          if (userInfo) {
            const newUser = new User(userInfo);

            setUser(newUser);
            setLoading(false);
            setError(false);
            return newUser;
          } else {
            setLoading(false);
            setError("Unknown Error.");
            return user;
          }
        }
      } catch (err: unknown) {
        if (err instanceof Object) {
          type tE = {
            status: string | null;
            message: string | null;
            user: UserArg | null;
            token: string | null;
          };
          const newError: tE = {
            status: null,
            message: null,
            token: null,
            user: null,
            ...err,
          };
          setLoading(false);
          setError(newError.message ? newError.message : "Some Error");
          if (!token && newError.token) {
            localStorage.setItem("token", newError.token);
          }
          throw newError;
        } else {
          setLoading(false);
          setError("Some Error!");
          console.log(err);
        }
        // console.log(email, password);
        return null;
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [token]
  );

  // Token initialization
  useEffect(() => {
    if (token && !user) {
      getTokenInfo()
        .then((info) => {
          if (info) {
            setUser(info);
            setLoading(false);
          } else {
            logout(); // Clear invalid token
          }
        })
        .catch(() => {
          setError("Failed to verify token");
          logout();
        });
    } else {
      setLoading(false);
    }
  }, [user, token, logout]);

  const value = { user, loading, error, logout, login };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export { AuthContext, AuthProvider, useAuthContext };
