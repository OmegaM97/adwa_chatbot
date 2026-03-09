'use client';

import { useState, useEffect } from 'react';
import type { Message } from '@/types/chat';

export function useLocalStorageChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage (SSR-safe)
  useEffect(() => {
    const saved = localStorage.getItem('chatMessages');
    if (saved) {
      try {
        setMessages(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse saved messages');
      }
    }
    setIsLoaded(true);
  }, []);

  // Persist to localStorage
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('chatMessages', JSON.stringify(messages));
    }
  }, [messages, isLoaded]);

  const addMessage = (role: 'user' | 'bot', content: string) => {
    const newMessage: Message = {
      id: Date.now().toString(36) + Math.random().toString(36).slice(2),
      role,
      content: content.trim(),
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  const clearMessages = () => {
    setMessages([]);
    localStorage.removeItem('chatMessages');
  };

  return {
    messages,
    addMessage,
    clearMessages,
    isLoaded,
  };
}