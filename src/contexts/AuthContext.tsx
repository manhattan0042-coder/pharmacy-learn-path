import React, { createContext, useContext, useState, useEffect } from 'react';
import { repositoryFactory } from '@/data/repositories/RepositoryFactory';
import { User } from '@/data/models/User';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  updateStudyHours: (hours: number) => void;
  completeCourse: (courseId: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const userRepo = repositoryFactory.getUserRepository();

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    const currentUser = await userRepo.getCurrentUser();
    setUser(currentUser);
  };

  const register = async (name: string, email: string, password: string) => {
    const newUser = await userRepo.register(name, email, password);
    setUser(newUser);
  };

  const login = async (email: string, password: string) => {
    const loggedInUser = await userRepo.login(email, password);
    setUser(loggedInUser);
  };

  const logout = async () => {
    await userRepo.logout();
    setUser(null);
  };

  const updateStudyHours = async (hours: number) => {
    await userRepo.updateStudyHours(hours);
    await loadUser();
  };

  const completeCourse = async (courseId: string) => {
    await userRepo.completeCourse(courseId);
    await loadUser();
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, updateStudyHours, completeCourse }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
