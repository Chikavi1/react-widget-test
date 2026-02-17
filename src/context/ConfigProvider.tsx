import React from 'react';
import { ConfigContext } from './ConfigContext';
import type { ChatConfig } from '../types';

export const ConfigProvider = ({ config, children }: { config: ChatConfig, children: React.ReactNode }) => {
  return (
    <ConfigContext.Provider value={config}>
      {children}
    </ConfigContext.Provider>
  );
};