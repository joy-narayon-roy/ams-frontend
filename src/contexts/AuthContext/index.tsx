/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useEffect, useState } from "react";
import {
  onAuthStateChanged,
  User,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signOut,
  signInWithPopup,
  createUserWithEmailAndPassword,
} from "firebase/auth";

import { auth } from "../../firebase";
import { Profile } from "../../models/Profile";
import getApiReqiest from "../../utilities/getApiRequest";

interface authReturnType {
  done: boolean;
  message: string;
}

interface AuthContextType {
  user: User | null;
  profile: Profile | null;
  loading: boolean;
  loginWithEmailPassword: ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => Promise<authReturnType | null>;
  signupWithEmailPassword: ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => Promise<authReturnType | null>;
  loginWithGoogle: () => Promise<authReturnType | null>;
  logout: () => Promise<authReturnType>;
}

function hendelAuthError(err: unknown): authReturnType {
  if (err instanceof Error) {
    // console.log(err.name);
    // console.log(err.message);

    if (err.name === "FirebaseError") {
      if (err.message === "Firebase: Error (auth/email-already-in-use).") {
        return {
          done: false,
          message: "User already exist.",
        };
      } else if (
        err.message ==
        "Firebase: Password should be at least 6 characters (auth/weak-password)."
      ) {
        return {
          done: false,
          message: "Password should be at least 6 characters.",
        };
      }
    }

    return {
      done: false,
      message: "Invalid. Provide valid infomation to login.",
    };
  }
  return {
    done: false,
    message: "Unknown error occurred.",
  };
}

const defaultAuthReturn = {
  done: false,
  message: "Error 101",
};
const defaultContext = {
  user: null,
  profile: null,
  loading: true,
  loginWithEmailPassword: async () => null,
  loginWithGoogle: async () => null,
  signupWithEmailPassword: async () => null,
  logout: async () => defaultAuthReturn,
};

const AuthContext = createContext<AuthContextType>(defaultContext);

const useAuthContext = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  async function loginWithEmailPassword({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      return {
        done: true,
        message: "Login successfull.",
      };
    } catch (err) {
      throw hendelAuthError(err);
    }
  }

  async function signupWithEmailPassword({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      return {
        done: true,
        message: "Signup Successfull.",
      };
    } catch (err) {
      throw hendelAuthError(err);
    }
  }

  async function loginWithGoogle() {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);

      return {
        done: true,
        message: "Login successfull.",
      };
    } catch (err) {
      throw hendelAuthError(err);
    }
  }

  async function logout() {
    try {
      await signOut(auth);
      return {
        done: true,
        message: "Logout successfully.",
      };
    } catch (err) {
      return hendelAuthError(err);
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const req = getApiReqiest(await currentUser.getIdToken());
        try {
          const { data } = await req.get("/profile");
          const profile = new Profile(data, currentUser);
          setUser(currentUser);
          setProfile(profile);
        } catch (err) {
          console.log(err);
          setUser(currentUser);
          setProfile(null);
        }
      } else {
        setUser(currentUser);
        setProfile(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        loading,
        loginWithEmailPassword,
        signupWithEmailPassword,
        loginWithGoogle,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { useAuthContext, AuthContext, AuthProvider };
