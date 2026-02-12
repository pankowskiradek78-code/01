
import React, { useState, useEffect, useRef, useCallback } from 'react';
import type { Message } from './types';
import { Sender } from './types';
import { sendMessageToGemini } from './services/geminiService';
import ChatMessage from './components/ChatMessage';
import Header from './components/Header';
import ChatInput from './components/ChatInput';
import TypingIndicator from './components/TypingIndicator';

const SUGGESTIONS = [
  'Jakie są godziny otwarcia?',
  'Czy jest teraz jakaś promocja?',
  'Ile kosztuje manicure?',
];

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);
  
  useEffect(() => {
    // Initial greeting from the bot
    setMessages([
      {
        id: Date.now(),
        text: 'Witaj w Queen Beauty! Nazywam się Anna, wirtualna asystentka. W czym mogę Ci dzisiaj pomóc?',
        sender: Sender.Bot,
      },
    ]);
  }, []);

  const handleSendMessage = useCallback(async (inputText: string) => {
    if (!inputText.trim()) return;

    // Hide suggestions after the first message is sent
    if (showSuggestions) {
      setShowSuggestions(false);
    }

    const userMessage: Message = {
      id: Date.now(),
      text: inputText,
      sender: Sender.User,
    };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setIsLoading(true);

    try {
      const botResponseText = await sendMessageToGemini(inputText);
      const botMessage: Message = {
        id: Date.now() + 1,
        text: botResponseText,
        sender: Sender.Bot,
      };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error('Error sending message to Gemini:', error);
      const errorMessage: Message = {
        id: Date.now() + 1,
        text: 'Przepraszam, wystąpił błąd. Spróbuj ponownie później.',
        sender: Sender.Bot,
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }, [showSuggestions]);

  return (
    <div className="flex flex-col h-screen max-w-2xl mx-auto bg-white shadow-2xl rounded-lg overflow-hidden font-sans">
      <Header />
      <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-[#FDFBF8]">
        {messages.map((msg) => (
          <ChatMessage key={msg.id} message={msg} />
        ))}
        {isLoading && <TypingIndicator />}
        <div ref={messagesEndRef} />
      </div>

      {showSuggestions && (
        <div className="p-4 pt-0 flex flex-wrap justify-end gap-2">
          {SUGGESTIONS.map((suggestion) => (
            <button
              key={suggestion}
              onClick={() => handleSendMessage(suggestion)}
              className="px-4 py-2 text-sm text-[#C5A37E] bg-white border border-[#C5A37E] rounded-full hover:bg-gray-50 transition-colors"
            >
              {suggestion}
            </button>
          ))}
        </div>
      )}

      <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
    </div>
  );
};

export default App;
