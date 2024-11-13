import React, { createContext, useContext, useState } from 'react';

// Mock User type to match Firebase User interface
interface MockUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  emailVerified: boolean;
}

interface AuthContextType {
  user: MockUser | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signUpWithEmail: (email: string, password: string, name: string) => Promise<void>;
  signOut: () => Promise<void>;
  sendVerificationEmail: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<MockUser | null>(null);
  const [loading] = useState(false);

  const signInWithGoogle = async () => {
    try {
      // Mock Google sign in
      const mockUser: MockUser = {
        uid: 'mock-uid-123',
        email: 'mock@example.com',
        displayName: 'Mock User',
        emailVerified: true
      };
      setUser(mockUser);
    } catch (error) {
      console.error('Error signing in with Google:', error);
      throw error;
    }
  };

  const signInWithEmail = async (email: string, password: string) => {
    try {
      // Mock email sign in
      const mockUser: MockUser = {
        uid: 'mock-uid-123',
        email: email,
        displayName: 'Mock User',
        emailVerified: true
      };
      setUser(mockUser);
    } catch (error) {
      console.error('Error signing in with email:', error);
      throw error;
    }
  };

  const signUpWithEmail = async (email: string, password: string, name: string) => {
    try {
      // Mock email sign up
      const mockUser: MockUser = {
        uid: 'mock-uid-123',
        email: email,
        displayName: name,
        emailVerified: false
      };
      setUser(mockUser);
    } catch (error) {
      console.error('Error signing up with email:', error);
      throw error;
    }
  };

  const sendVerificationEmail = async () => {
    if (user && !user.emailVerified) {
      try {
        console.log('Mock verification email sent');
        // Update mock user to be verified
        setUser({ ...user, emailVerified: true });
      } catch (error) {
        console.error('Error sending verification email:', error);
        throw error;
      }
    }
  };

  const signOut = async () => {
    try {
      setUser(null);
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      signInWithGoogle, 
      signInWithEmail,
      signUpWithEmail,
      signOut,
      sendVerificationEmail
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
