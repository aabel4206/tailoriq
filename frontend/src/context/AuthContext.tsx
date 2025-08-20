import React, { createContext, useContext, useState, useEffect } from "react";

type AuthState = {
  token: string | null;
  userId: number | null;
  setAuth: (token: string | null, userId?: number | null) => void;
};

const AuthContext = createContext<AuthState>({
  token: null, userId: null, setAuth: () => {}
});

export const AuthProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem("tailoriq_token"));
  const [userId, setUserId] = useState<number | null>(() => {
    const v = localStorage.getItem("tailoriq_userId");
    return v ? Number(v) : null;
  });

  function setAuth(newToken: string | null, id: number | null = null) {
    setToken(newToken);
    setUserId(id);
    if (newToken) localStorage.setItem("tailoriq_token", newToken);
    else localStorage.removeItem("tailoriq_token");
    if (id) localStorage.setItem("tailoriq_userId", String(id));
    else localStorage.removeItem("tailoriq_userId");
  }

  return <AuthContext.Provider value={{token, userId, setAuth}}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
