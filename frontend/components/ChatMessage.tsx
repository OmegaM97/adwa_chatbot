'use client';

import { useEffect, useState } from "react";
import type { Message } from '@/types/chat';

interface ChatMessageProps {
  message: Message;
  shouldType?: boolean;
}

export default function ChatMessage({ message, shouldType = false }: ChatMessageProps) {
  const isUser = message.role === 'user';

  const [displayedText, setDisplayedText] = useState(
    // Past messages + user messages → full content immediately
    isUser || !shouldType ? message.content : ''
  );

  const [isTypingFinished, setIsTypingFinished] = useState(isUser || !shouldType);

  useEffect(() => {
    if (isUser || !shouldType) {
      setDisplayedText(message.content);
      setIsTypingFinished(true);
      return;
    }

    // Reset + start typing for new bot messages
    setDisplayedText('');
    setIsTypingFinished(false);

    let index = 0;
    const interval = setInterval(() => {
      if (index < message.content.length) {
        setDisplayedText((prev) => prev + message.content[index]);
        index++;
      } else {
        clearInterval(interval);
        setIsTypingFinished(true);
      }
    }, 5); // slightly slower → ~80 chars/sec, more natural

    return () => clearInterval(interval);
  }, [message.content, isUser, shouldType]);

  // What we show right now
  const content = isTypingFinished ? message.content : displayedText;

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} group`}>
      <div
        className={`
          max-w-[78%] px-5 py-4 rounded-3xl leading-relaxed shadow-sm
          transition-all text-[18px] md:text-[18px] font-mono
          ${isUser
            ? 'bg-white/10 text-zinc-200 rounded-tr-none'
            : 'text-zinc-100 rounded-tl-none'
          }
        `}
      >
        {isUser ? (
          // User messages → always plain text
          <span>{displayedText}</span>
        ) : isTypingFinished ? (
          // Bot message, typing done → render as HTML
          <span dangerouslySetInnerHTML={{ __html: content }} />
        ) : (
          // Bot message while typing → show plain text + cursor
          <>
            {displayedText || '\u00A0' /* prevent collapse */}
            <span className="animate-pulse">|</span>
          </>
        )}
      </div>
    </div>
  );
}