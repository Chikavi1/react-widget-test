export interface ChatWidgetConfig {
  init: (containerId: string) => void;
  // Aquí podrías agregar más funciones a futuro, como:
  // open: () => void;
  // close: () => void;
}

declare global {
  interface Window {
    Chat: ChatWidgetConfig;
  }
}

export {};