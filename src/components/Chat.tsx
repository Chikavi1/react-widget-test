import { useEffect, useRef, useState } from "react";
import { useChat } from "../hooks/useChat";
import { Send, Bot } from "lucide-react";
import { cn } from "../lib/utils";
import { useConfig } from "../context/ConfigContext";
import { InitialOptions } from "./InitialOptions";

export const Chat = () => {
  const { botName, primaryColor, initialOptions } = useConfig();
  const { messages, sendMessage, isTyping } = useChat();
  const [ onboarding, setOnboarding] = useState(true);

  // Siempre seguro (nunca undefined)
  const safeInitialOptions = initialOptions ?? [];

  const [showInitialOptions, setShowInitialOptions] = useState(true);
  const [inputText, setInputText] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto scroll
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    sendMessage(inputText);
    setInputText("");
    setShowInitialOptions(false);
    setOnboarding(false);
  };

  return (
    <div className="flex flex-col h-[750px] w-full border border-slate-200 rounded-2xl bg-white shadow-xl overflow-hidden font-sans">
      
      {/* Header */}
      <div
        className="p-4 flex items-center gap-3 text-white"
        style={{ backgroundColor: primaryColor }}
      >
        <div className="bg-white/20 p-2 rounded-full">
          <Bot size={20} />
        </div>
        <div>
          <h2 className="font-bold text-sm">{botName}</h2>
          <p className="text-xs opacity-80">En línea</p>
        </div>
      </div>

            

      {/* Mensajes */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">

        
        {/* Mensaje de bienvenida */}
        { onboarding &&  (
            <div className="mt-48">
                <p className="text-3xl font-semibold text-slate-800">
                ¡Hola!
                </p>
                <p className="text-xl text-slate-600">
                ¿En qué podemos ayudarte hoy?
                </p>
            </div>

        )}
        

        {/* Mensajes */}
        {messages.map((msg) => (
  <div
    key={msg.id}
    className={cn(
      "flex w-full flex-col gap-2",
      msg.sender === "me" ? "items-end" : "items-start"
    )}
  >
    {/* Burbuja SOLO si hay texto */}
    {msg.text && (
      <div
        className={cn(
          "max-w-[80%] p-3 rounded-2xl text-sm shadow-sm",
          msg.sender === "me"
            ? "text-white rounded-br-none"
            : "bg-white text-slate-800 border border-slate-200 rounded-bl-none"
        )}
        style={
          msg.sender === "me"
            ? { backgroundColor: primaryColor }
            : {}
        }
      >
        <p className="whitespace-pre-wrap">{msg.text}</p>

        <div
          className={cn(
            "text-[10px] mt-1 opacity-70",
            msg.sender === "me" ? "text-right" : "text-left"
          )}
        >
          {msg.timestamp.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
      </div>
    )}

    {/* Botones FUERA de la burbuja */}
    {msg.buttons && msg.buttons.length > 0 && (
      <div
        className={cn(
          "flex flex-col gap-2",
          msg.sender === "me" ? "items-end" : "items-start"
        )}
      >
        {msg.buttons.map((btn) => (
          <a
            key={btn.id}
            href={btn.url}
            target="_blank"
            rel="noopener noreferrer"
            className="
              w-fit
              px-4
              py-2.5
              rounded-xl
              font-semibold
              text-white
              shadow-sm
              transition-all
              hover:brightness-110
              active:scale-[0.98]
              no-underline
            "
            style={{ backgroundColor: primaryColor }}
          >
            {btn.label}
          </a>
        ))}
      </div>
    )}
  </div>
))}


        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white border border-slate-200 p-3 rounded-2xl rounded-bl-none shadow-sm flex gap-1">
              <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></span>
              <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
              <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
            </div>
          </div>
        )}

        <div ref={scrollRef} />
      </div>

      {/* Opciones iniciales */}
      {/* Bienvenida + Opciones iniciales */}
        {showInitialOptions &&
        safeInitialOptions.length > 0 &&
        messages.length <= 1 && (
            <div className="p-4 space-y-4">

          

            {/* Opciones */}
            <InitialOptions
                options={safeInitialOptions}
                onSelect={(option) => {
                sendMessage(option.label);
                setShowInitialOptions(false);
                setOnboarding(false);
                }}
            />
            </div>
        )}

      {/* Input */}
      <form
        onSubmit={handleSubmit}
        className="p-4 bg-white border-t border-slate-100 flex gap-2"
      >
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder={`Escribe a ${botName}...`}
          className="flex-1 bg-slate-100 border-none rounded-xl px-4 py-2 text-sm focus:ring-2 outline-none transition-all"
          style={{ "--tw-ring-color": primaryColor } as React.CSSProperties}
        />
        <button
          type="submit"
          disabled={!inputText.trim()}
          className="text-white p-2 rounded-xl hover:opacity-90 disabled:opacity-50 transition-all shadow-md"
          style={{ backgroundColor: primaryColor }}
        >
          <Send size={20} />
        </button>
      </form>
      <p className="text-xs text-slate-600 text-center pb-2">Powered by <span className="font-bold">Tentara</span> </p>
    </div>
  );
};
