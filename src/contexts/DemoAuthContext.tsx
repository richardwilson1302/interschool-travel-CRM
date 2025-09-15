import React, { createContext, useContext, useState } from 'react';

interface User {
  id: string;
  email: string;
}

interface DemoAuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const DemoAuthContext = createContext<DemoAuthContextType | undefined>(undefined);

export function DemoAuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>({
    id: 'demo-user',
    email: 'demo@interschooltravel.com'
  });
  const [loading] = useState(false);

  const signIn = async (email: string, password: string) => {
    // Demo mode - always succeed
    setUser({
      id: 'demo-user',
      email: email
    });
  };

  const signUp = async (email: string, password: string) => {
    // Demo mode - always succeed
    setUser({
      id: 'demo-user',
      email: email
    });
  };

  const signOut = async () => {
    setUser(null);
  };

  return (
    <DemoAuthContext.Provider value={{ user, loading, signIn, signUp, signOut }}>
      {children}
    </DemoAuthContext.Provider>
  );
}

export function useDemoAuth() {
  const context = useContext(DemoAuthContext);
  if (context === undefined) {
    throw new Error('useDemoAuth must be used within a DemoAuthProvider');
  }
  return context;
}