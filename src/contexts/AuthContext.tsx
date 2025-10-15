import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  studyHours: number;
  completedCourses: string[];
  certificates: string[];
}

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
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem('currentUser');
    return stored ? JSON.parse(stored) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
    } else {
      localStorage.removeItem('currentUser');
    }
  }, [user]);

  const register = async (name: string, email: string, password: string) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    if (users.find((u: any) => u.email === email)) {
      throw new Error('User already exists');
    }

    const newUser: User = {
      id: Date.now().toString(),
      name,
      email,
      studyHours: 0,
      completedCourses: [],
      certificates: [],
    };

    users.push({ ...newUser, password });
    localStorage.setItem('users', JSON.stringify(users));
    setUser(newUser);
  };

  const login = async (email: string, password: string) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const foundUser = users.find((u: any) => u.email === email && u.password === password);

    if (!foundUser) {
      throw new Error('Invalid credentials');
    }

    const { password: _, ...userWithoutPassword } = foundUser;
    setUser(userWithoutPassword);
  };

  const logout = () => {
    setUser(null);
  };

  const updateStudyHours = (hours: number) => {
    if (user) {
      const updatedUser = { ...user, studyHours: user.studyHours + hours };
      setUser(updatedUser);
    }
  };

  const completeCourse = (courseId: string) => {
    if (user && !user.completedCourses.includes(courseId)) {
      const updatedUser = {
        ...user,
        completedCourses: [...user.completedCourses, courseId],
        certificates: [...user.certificates, `CERT-${courseId}-${Date.now()}`],
      };
      setUser(updatedUser);
    }
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
