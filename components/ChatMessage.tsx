
import React from 'react';
import { Message, Sender } from '../types';
import BotIcon from './icons/BotIcon';

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isBot = message.sender === Sender.Bot;

  return (
    <div className={`flex items-end gap-3 ${isBot ? 'justify-start' : 'justify-end'}`}>
      {isBot && (
         <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#C5A37E] flex items-center justify-center ring-2 ring-white">
            <BotIcon className="w-6 h-6 text-white p-0.5" />
         </div>
      )}
      <div
        className={`max-w-xs md:max-w-md px-4 py-3 rounded-2xl ${
          isBot
            ? 'bg-white text-gray-800 rounded-bl-none shadow-md'
            : 'bg-[#C5A37E] text-white rounded-br-none shadow-md'
        }`}
      >
        <p className="text-sm break-words whitespace-pre-wrap">{message.text}</p>
      </div>
    </div>
  );
};

export default ChatMessage;