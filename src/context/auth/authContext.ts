import { createContext } from "react";

export interface AuthContextType {
  login: (credentials: { email: string; password: string }) => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
  login: async () => {
    throw new Error("AuthContext not initialized");
  },
});
