'use client';

import { useRef, useEffect, useState } from 'react';
import { useLocalStorageChat } from '@/hooks/useLocalStorageChats'; 
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import { Bot } from 'lucide-react';

export default function ChatContainer() {
  const { messages, addMessage, clearMessages, isLoaded } = useLocalStorageChat();
  const scrollRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const hasMessages = messages.length > 0;

  // Scroll to bottom function
  const scrollToBottom = (behavior: ScrollBehavior = 'auto') => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ 
        behavior, 
        block: 'end' 
      });
    }
  };

  // Scroll on initial load
  useEffect(() => {
    if (isLoaded && hasMessages) {
      // Use setTimeout to ensure DOM is ready
      setTimeout(() => {
        scrollToBottom('auto');
      }, 0);
    }
  }, [isLoaded, hasMessages]);

  // Scroll when messages change (new message added)
  useEffect(() => {
    if (hasMessages) {
      // Small delay to ensure DOM is updated with new message
      setTimeout(() => {
        scrollToBottom('smooth');
      }, 50);
    }
  }, [messages.length, hasMessages]);

  // Detect scroll for sticky header shadow/blur effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) setIsScrolled(true);
      else setIsScrolled(false);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSend = (content: string) => {
    if (!content.trim()) return;
    addMessage('user', content);

    // Simulate bot response
    setTimeout(() => {
      const responses = [
        "That's an interesting point. Here's my take...",
        "I see what you mean. Let me expand on that.",
        "Great question! Here's what I know about it.",
        "Absolutely. Here's a detailed response.",
        "Thanks for asking. This is what I think...",
      ];
      const randomReply = responses[Math.floor(Math.random() * responses.length)];
      addMessage('bot', randomReply);
    }, 650);
  };

  if (!isLoaded) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black/80 backdrop-blur-sm z-50">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 bg-zinc-500 rounded-full animate-pulse [animation-delay:0ms]"></div>
          <div className="w-3 h-3 bg-zinc-400 rounded-full animate-pulse [animation-delay:150ms]"></div>
          <div className="w-3 h-3 bg-zinc-300 rounded-full animate-pulse [animation-delay:300ms]"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative z-10 min-h-screen flex flex-col">
      {/* Fixed Navbar */}
      <header
        className={`
          fixed top-0 inset-x-0 z-50 
          h-14 flex items-center justify-between 
          px-6 md:px-10 lg:px-12 
          border-b border-white/10 
          transition-all duration-300
          ${isScrolled 
            ? 'bg-black/80 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.4)]' 
            : 'bg-black/40 backdrop-blur-sm'
          }
        `}
      >
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-xl flex items-center justify-center text-xs font-bold">
            <Bot className="w-8 h-8 text-zinc-200" strokeWidth={1.6} />
          </div>
          <span className="font-semibold tracking-tighter text-lg">AAU ChatBot</span>
        </div>

        {hasMessages && (
          <button
            onClick={clearMessages}
            className="text-xs px-4 py-1.5 rounded-full border border-white/10 hover:bg-white/5 transition-colors"
          >
            New chat
          </button>
        )}
      </header>

      {/* Messages area */}
      <div
        ref={scrollRef}
        className={`
          flex-1 overflow-y-auto
          w-full max-w-5xl mx-auto
          px-4 sm:px-6 lg:px-8
          pt-20 pb-32 md:pb-40
          scrollbar-thin space-y-8
          mb-10
          ${!hasMessages ? 'flex items-center justify-center' : ''}
        `}
      >
        {hasMessages ? (
          <>
            {messages.map((msg) => (
              <ChatMessage key={msg.id} message={msg} />
            ))}
          </>
        ) : (
          <div className="text-center max-w-md mx-auto mt-16 px-4">
            <div className="mx-auto mb-8 w-16 h-16 bg-zinc-900/80 backdrop-blur-xl border border-zinc-800 rounded-2xl flex items-center justify-center shadow-lg">
              <Bot className="w-8 h-8 text-zinc-200" strokeWidth={1.6} />
            </div>

            <h1 className="text-4xl md:text-5xl font-sans font-bold tracking-tighter mb-4 bg-gradient-to-b from-white to-zinc-400 bg-clip-text text-transparent">
              How can I help you?
            </h1>
            <p className="text-zinc-400 font-mono text-base md:text-lg">
              Ask me anything about AAU and I'll do my best to assist you.
            </p>
          </div>
        )}
      </div>

      {/* Fixed Input */}
      <div className="fixed bottom-0 left-0 right-0 z-40">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-10 pb-4 pt-2">
          <ChatInput onSend={handleSend} />
        </div>
      </div>

      {/* Invisible div to scroll to */}
            <div ref={messagesEndRef} />
    </div>
  );
}