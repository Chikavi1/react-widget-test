import { useCallback, useState } from "react";
import { useConfig } from "../context/ConfigContext"; // Importante: usar el hook de config
import type { Message } from "../types";

interface ServerResponse {
    messages: Array<{
        sequence: number;
        kind: string;
        content: string;
        buttons?: Array<{
            id: string;
            label: string;
            url?: string;
        }>;
    }>;
    session: [];
}

export const useChat = () => {
    // Extraemos la configuración dinámica del contexto
    const { businessId, user_id } = useConfig();
    const [messages, setMessages] = useState<Message[]>([]);
    const [isTyping, setIsTyping] = useState(false);

    const sendMessage = useCallback(async (text: string) => {
        const userMsg: Message = {
            id: crypto.randomUUID(),
            text,
            sender: 'me',
            timestamp: new Date(),
            status: 'sent',
        };

        setMessages((prev) => [...prev, userMsg]);
        setIsTyping(true);

        try {
            const response = await fetch('http://localhost:3005/webhook/receive', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: {
                        type: "text",
                        content: text 
                    },
                    context: {
                        business_id: businessId, // DINÁMICO
                        user_id: user_id || "u1" // DINÁMICO
                    }
                }),
            });

            if (!response.ok) throw new Error("Error en el servidor");

            const data: ServerResponse = await response.json();

            console.log('data', data);

            const newBotMessages: Message[] = data.messages.map((m) => ({
                id: crypto.randomUUID(),
                text: m.content || "", // Algunos mensajes de botones podrían no traer texto largo
                sender: 'bot',
                timestamp: new Date(),
                status: 'sent',
                buttons: Array.isArray(m.buttons) ? m.buttons : undefined// Mapeamos los botones si existen
            }));

            setMessages((prev) => [...prev, ...newBotMessages]);

        } catch (error) {
            console.error("Error:", error);
            setMessages((prev) => [...prev, {
                id: crypto.randomUUID(),
                text: "No pude conectarme con el servidor.",
                sender: 'bot',
                timestamp: new Date(),
                status: 'sent',
            }]);
        } finally {
            setIsTyping(false);
        }
    }, [businessId, user_id]); // Dependencias para evitar closures viejos

    return { messages, isTyping, sendMessage };
};