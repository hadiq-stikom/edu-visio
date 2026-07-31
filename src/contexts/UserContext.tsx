"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface UserContextType {
  totalScore: number;
  completedModules: string[];
  addScore: (points: number) => void;
  markModuleCompleted: (moduleId: string) => void;
  isMounted: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [totalScore, setTotalScore] = useState(0);
  const [completedModules, setCompletedModules] = useState<string[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Load from local storage on mount
    const savedScore = localStorage.getItem('eduvisio_score');
    const savedModules = localStorage.getItem('eduvisio_completed');

    if (savedScore) {
      setTotalScore(parseInt(savedScore, 10));
    }
    if (savedModules) {
      try {
        setCompletedModules(JSON.parse(savedModules));
      } catch (e) {
        console.error('Failed to parse completed modules', e);
      }
    }
    
    setIsMounted(true);
  }, []);

  const addScore = (points: number) => {
    setTotalScore((prev) => {
      const newScore = prev + points;
      localStorage.setItem('eduvisio_score', newScore.toString());
      return newScore;
    });
  };

  const markModuleCompleted = (moduleId: string) => {
    setCompletedModules((prev) => {
      if (prev.includes(moduleId)) return prev;
      const newModules = [...prev, moduleId];
      localStorage.setItem('eduvisio_completed', JSON.stringify(newModules));
      return newModules;
    });
  };

  return (
    <UserContext.Provider value={{ totalScore, completedModules, addScore, markModuleCompleted, isMounted }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
