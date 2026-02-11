
import React from 'react';
import BotIcon from './icons/BotIcon';

const TypingIndicator: React.FC = () => {
  return (
    <div className="flex items-end gap-3 justify-start">
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#C5A37E] flex items-center justify-center ring-2 ring-white">
            <BotIcon className="w-6 h-6 text-white p-0.5" />
        </div>
      <div className="px-4 py-3 rounded-2xl bg-white text-gray-800 rounded-bl-none shadow-md">
        <div className="flex items-center justify-center space-x-1">
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;