import { createContext, useContext } from 'react';
import type { ChatConfig } from '../types';

export const ConfigContext = createContext<ChatConfig | null>(null);

export const useConfig = () => {
  const context = useContext(ConfigContext);
  if (context === null) {
    // Esto nos confirmará si el Provider no está llegando
    console.error("DEBUG: useConfig fue llamado pero el contexto es NULL");
    throw new Error("useConfig debe usarse dentro de ConfigProvider");
  }
  return context;
};