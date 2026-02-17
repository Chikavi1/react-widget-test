// widget-entry.tsx
import './index.css'  
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { ConfigProvider } from './context/ConfigProvider';
import type { ChatConfig } from './types';
 
const initWidget = (containerId: string, customConfig?: Partial<ChatConfig>) => {
  const container = document.getElementById(containerId);
  
  if (!container) return;

  const finalConfig: ChatConfig = {
    botName: customConfig?.botName || 'Asistente',
    businessId: customConfig?.businessId || 'default_id',
    welcomeMessage: customConfig?.welcomeMessage || 'Hola',
    primaryColor: customConfig?.primaryColor || '#2563eb',
    user_id: customConfig?.user_id || 'u1'
  };

  const root = ReactDOM.createRoot(container);
  root.render(
    <ConfigProvider config={finalConfig}>
        <App />
    </ConfigProvider>
  );
};
window.Chat = { init: initWidget };