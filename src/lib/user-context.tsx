"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type CustomerProfile = {
  name: string;
  email: string;
  phone: string;
  countryCode: string;
  country: string;
  company?: string;
};

type PendingCartAction = {
  item: {
    id: string;
    slug: string;
    name: string;
    price: number;
    category: string;
    image: string;
    packSize?: string;
    manufacturer?: string;
  };
  quantity: number;
} | null;

type UserContextType = {
  user: CustomerProfile | null;
  isLoggedIn: boolean;
  login: (profile: CustomerProfile) => void;
  logout: () => void;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  openAuthModal: (pendingAction?: PendingCartAction) => void;
  pendingCartAction: PendingCartAction;
  clearPendingCartAction: () => void;
};

const STORAGE_KEY = "lifecure_customer_user_v1";

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<CustomerProfile | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [pendingCartAction, setPendingCartAction] = useState<PendingCartAction>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed && parsed.name && parsed.email) {
          setUser(parsed);
        }
      }
    } catch {
      // Ignore localStorage read errors
    }
  }, []);

  const login = (profile: CustomerProfile) => {
    setUser(profile);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    } catch {
      // Ignore write errors
    }
  };

  const logout = () => {
    setUser(null);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore write errors
    }
  };

  const openAuthModal = (pendingAction?: PendingCartAction) => {
    if (pendingAction) {
      setPendingCartAction(pendingAction);
    }
    setIsAuthModalOpen(true);
  };

  const clearPendingCartAction = () => {
    setPendingCartAction(null);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        isLoggedIn: !!user,
        login,
        logout,
        isAuthModalOpen,
        setIsAuthModalOpen,
        openAuthModal,
        pendingCartAction,
        clearPendingCartAction,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
