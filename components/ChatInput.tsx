
import React, { useState } from 'react';
import SendIcon from './icons/SendIcon';

interface ChatInputProps {
  onSendMessage: (text: string) => void;
  isLoading: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, isLoading }) => {
  const [inputText, setInputText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputText.trim() && !isLoading) {
      onSendMessage(inputText);
      setInputText('');
    }
  };

  return (
    <div className="p-4 bg-white border-t border-gray-200">
      <form onSubmit={handleSubmit} className="flex items-center space-x-3">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Wpisz swoją wiadomość..."
          className="flex-1 w-full px-4 py-2 text-gray-700 bg-gray-100 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#C5A37E] transition"
          disabled={isLoading}
        />
        <button
          type="submit"
          className={`flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full transition-colors ${
            isLoading || !inputText.trim()
              ? 'bg-gray-300 cursor-not-allowed'
              : 'bg-[#C5A37E] hover:bg-[#b59472] text-white'
          }`}
          disabled={isLoading || !inputText.trim()}
        >
          <SendIcon className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
};

export default ChatInput;