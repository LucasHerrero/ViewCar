import { Reply } from "./reply.interface";
import { Message } from "./message.interface";

export interface Conversations {
    id: number;
    email: string;
    messages: Message[];
    replies: Reply[];
}
