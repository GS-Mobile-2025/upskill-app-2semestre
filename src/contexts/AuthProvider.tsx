import React, { useState, useEffect, ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext, User } from "../hooks/useAuth";

const STORAGE_KEY = "@skillup_user";
const ACCOUNTS_KEY = "@skillup_accounts";

interface StoredAccount {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  bio: string;
  skills: string[];
  completedCourses: number;
  yearsExperience: number;
  memberSince: string;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const userData = await AsyncStorage.getItem(STORAGE_KEY);
      if (userData) {
        setUser(JSON.parse(userData));
      }
    } catch (error) {
      console.error("Failed to load user:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      console.log("Tentando fazer login com:", email);
      const accountsData = await AsyncStorage.getItem(ACCOUNTS_KEY);
      const accounts: StoredAccount[] = accountsData ? JSON.parse(accountsData) : [];
      console.log("Contas armazenadas:", accounts.length);
      
      const account = accounts.find(
        (acc) => acc.email.toLowerCase() === email.toLowerCase() && acc.password === password
      );

      console.log("Conta encontrada:", !!account);

      if (!account) {
        throw new Error("Email ou senha inválidos");
      }

      const user: User = {
        id: account.id,
        name: account.name,
        email: account.email,
        role: account.role,
        bio: account.bio,
        photo: "",
        skills: account.skills,
        completedCourses: account.completedCourses,
        yearsExperience: account.yearsExperience,
        memberSince: account.memberSince,
      };

      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(user));
      setUser(user);
    } catch (error) {
      console.error("Erro de login:", error);
      throw error;
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    try {
      const accountsData = await AsyncStorage.getItem(ACCOUNTS_KEY);
      const accounts: StoredAccount[] = accountsData ? JSON.parse(accountsData) : [];

      const existingAccount = accounts.find((acc) => acc.email === email);
      if (existingAccount) {
        throw new Error("Email já cadastrado");
      }

      const memberSince = new Date().toLocaleDateString("pt-BR", {
        month: "short",
        year: "numeric",
      });

      const newAccount: StoredAccount = {
        id: Date.now().toString(),
        name,
        email,
        password,
        role: "Novo Membro",
        bio: "Bem-vindo ao SkillUp AI!",
        skills: [],
        completedCourses: 0,
        yearsExperience: 0,
        memberSince,
      };

      accounts.push(newAccount);
      await AsyncStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts));

      const user: User = {
        id: newAccount.id,
        name: newAccount.name,
        email: newAccount.email,
        role: newAccount.role,
        bio: newAccount.bio,
        photo: "",
        skills: newAccount.skills,
        completedCourses: newAccount.completedCourses,
        yearsExperience: newAccount.yearsExperience,
        memberSince: newAccount.memberSince,
      };

      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(user));
      setUser(user);
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    await AsyncStorage.removeItem(STORAGE_KEY);
    setUser(null);
  };

  const updateUser = async (updates: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...updates };
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedUser));
      setUser(updatedUser);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, isLoading, login, signup, logout, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}
