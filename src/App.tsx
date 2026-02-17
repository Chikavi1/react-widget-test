import { useState } from 'react';
import { Chat } from './components/Chat';
import { MessageCircle, X } from 'lucide-react'; 
import { cn } from './lib/utils';
import { ConfigProvider } from './context/ConfigProvider';

// 1. Definimos la config fuera o la recibimos por props para que sea estable
const chatConfig = {
  businessId: 'demo',
  botName: 'Hamburguesas las chidas',
  welcomeMessage: 'Hola, ¿en qué puedo ayudarte?',
  primaryColor: '#000',  
  user_id: 'u1',
  initialOptions: [
    { id: 'menu', label: 'Quiero reservar una mesa' },
    { id: 'hours', label: 'Quiero saber los horarios' },
    { id: 'pet', label: '¿Es pet friendly?' }
  ]
};

function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <ConfigProvider config={chatConfig}>
      {/* Contenedor fijo en la esquina inferior derecha */}
      <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end font-sans">
        
        {/* Ventana del Chat: 
          Cambiamos el renderizado condicional por clases de CSS 
          para NO destruir el componente y mantener los mensajes.
        */}
        <div className={cn(
          " mb-4 w-[90vw] sm:w-[400px] h-[750px] rounded-2xl shadow-2xl transition-all duration-300 transform",
          isOpen 
            ? "opacity-100 translate-y-0 scale-100 pointer-events-auto" 
            : "opacity-0 translate-y-10 scale-95 pointer-events-none"
        )}>
          <div className="relative">
            <Chat />
            
            {/* Botón para cerrar dentro de la ventana */}
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors z-10"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Botón Circular (Launcher) */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          style={!isOpen ? { backgroundColor: chatConfig.primaryColor } : {}}
          className={cn(
            "w-16 h-16 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 active:scale-95",
            isOpen 
              ? "bg-white text-slate-600 rotate-90" 
              : "text-white hover:opacity-90 shadow-blue-500/20"
          )}
        >
          {isOpen ? <X size={32} /> : <MessageCircle size={32} />}
        </button>
      </div>
    </ConfigProvider>
  );
}

export default App;