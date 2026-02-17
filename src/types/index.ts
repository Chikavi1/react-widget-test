
export type MessageSender = 'me' | 'bot';

export interface Message{
    id: string;
    text:string;
    sender: MessageSender;
    timestamp: Date;
    status: 'sent' | 'delivered' | 'read';
    buttons?: Array<Button>;
    kind?: 'text' | 'buttons';
}

export interface Button{
    id: string;
    label: string;
    url?: string;
}

export interface ChatSession{
    id: string;
    messages: Message[];
    timestamp: Date;
    participantName: string;
    isOnline: boolean;
}

export interface InitialOption{
    id: string;
    label: string;
}

export interface ChatConfig {
  businessId: string;
  botName: string;
  welcomeMessage: string;
  primaryColor: string; // Ejemplo: '#2563eb'
  user_id?: string;
  initialOptions?: InitialOption[];
}