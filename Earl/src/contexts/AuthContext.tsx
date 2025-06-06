import React, { createContext, useContext, useEffect, useState } from 'react';

interface User {
  id: string;
  email: string;
  displayName?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate checking for existing auth token
    const checkAuth = async () => {
      const token = localStorage.getItem('authToken');
      if (token) {
        // In a real app, you'd validate the token with Firebase
        setUser({
          id: '1',
          email: 'earl@example.com',
          displayName: 'Earl'
        });
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    // Mock login - replace with Firebase auth
    if (email === 'earl@example.com' && password === 'password') {
      const mockUser = {
        id: '1',
        email: 'earl@example.com',
        displayName: 'Earl'
      };
      setUser(mockUser);
      localStorage.setItem('authToken', 'mock-token');
    } else {
      throw new Error('Invalid credentials');
    }
  };

  const logout = async () => {
    setUser(null);
    localStorage.removeItem('authToken');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};