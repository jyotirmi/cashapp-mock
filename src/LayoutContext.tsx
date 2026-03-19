import React, { createContext, useContext, useState, useEffect } from 'react';

interface LayoutContextType {
  isMaximized: boolean;
  setIsMaximized: (val: boolean) => void;
  isAgentPanelOpen: boolean;
  setIsAgentPanelOpen: (val: boolean) => void;
  agentPanelWidth: number;
  setAgentPanelWidth: (val: number) => void;
  agentContext: string;
  setAgentContext: (val: string) => void;
  openAgentPanelWithContext: (context: string) => void;
}

const LayoutContext = createContext<LayoutContextType | undefined>(undefined);

export function LayoutProvider({ children }: { children: React.ReactNode }) {
  const [isMaximized, setIsMaximized] = useState(false);
  const [isAgentPanelOpen, setIsAgentPanelOpen] = useState(false);
  const [agentPanelWidth, setAgentPanelWidth] = useState(400);
  const [agentContext, setAgentContext] = useState('General');

  const openAgentPanelWithContext = (context: string) => {
    setAgentContext(context);
    setIsAgentPanelOpen(true);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMaximized) {
        setIsMaximized(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMaximized]);

  return (
    <LayoutContext.Provider value={{ 
      isMaximized, setIsMaximized, 
      isAgentPanelOpen, setIsAgentPanelOpen,
      agentPanelWidth, setAgentPanelWidth,
      agentContext, setAgentContext,
      openAgentPanelWithContext
    }}>
      {children}
    </LayoutContext.Provider>
  );
}

export function useLayout() {
  const context = useContext(LayoutContext);
  if (!context) throw new Error('useLayout must be used within LayoutProvider');
  return context;
}
