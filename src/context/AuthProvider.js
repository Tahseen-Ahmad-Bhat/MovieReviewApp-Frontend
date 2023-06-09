import React, { createContext, useEffect, useState } from "react";
import { getIsAuth, signInUser } from "../api/auth";
import { useNavigate } from "react-router-dom";
import { useNotification } from "../hooks";

export const AuthContext = createContext();

const defaultAuthInfo = {
  profile: null,
  isLoggedIn: false,
  isPending: false,
  error: "",
};

export default function AuthProvider({ children }) {
  const [authInfo, setAuthInfo] = useState({ ...defaultAuthInfo });

  const navigate = useNavigate();

  const { updateNotification } = useNotification();

  const handleLogin = async (email, password) => {
    setAuthInfo({ ...authInfo, isPending: true });

    // const navigate = useNavigate()
    const { error, user } = await signInUser({ email, password });
    if (error) {
      updateNotification("error", error);

      return setAuthInfo({ ...authInfo, isPending: false, error });
    }

    navigate("/", { replace: true });

    setAuthInfo({
      profile: { ...user },
      isLoggedIn: true,
      isPending: false,
      error: "",
    });

    // console.log("Even after navigating");

    localStorage.setItem("auth-token", user.token);
  };

  const isAuth = async () => {
    const token = localStorage.getItem("auth-token");
    if (!token) return;

    setAuthInfo({ ...authInfo, isPending: true });
    const { error, user } = await getIsAuth(token);
    if (error) {
      updateNotification("error", error);
      return setAuthInfo({ ...authInfo, isPending: false, error });
    }

    setAuthInfo({
      profile: { ...user },
      isLoggedIn: true,
      isPending: false,
      error: "",
    });
  };

  const handleLogout = () => {
    localStorage.removeItem("auth-token");
    setAuthInfo({ ...defaultAuthInfo });
    navigate("auth/sign-in");
  };

  useEffect(() => {
    isAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{ authInfo, handleLogin, handleLogout, isAuth }}
    >
      {children}
    </AuthContext.Provider>
  );
}
