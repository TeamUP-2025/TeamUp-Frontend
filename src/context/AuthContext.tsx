"use client";
import React, { createContext, useState, useContext } from "react";
import { type AuthUser } from "~/lib/auth";

// Define the complete context type
interface AuthContextType extends AuthUser {
  isLoading: boolean;
  // Add any additional methods here if needed
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

interface AuthProviderProps {
  children: React.ReactNode;
  initialAuthState: AuthUser;
}

const AuthProvider = ({ children, initialAuthState }: AuthProviderProps) => {
  const [name, setName] = useState(initialAuthState.name);
  const [isLoggedIn, setIsLoggedIn] = useState(initialAuthState.isLoggedIn);
  const [isLoading, setIsLoading] = useState(false);

  const value: AuthContextType = {
    name,
    isLoggedIn,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export { AuthProvider, useAuth };
