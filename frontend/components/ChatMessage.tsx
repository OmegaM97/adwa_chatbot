'use client';

import { useEffect, useState } from "react";
import parse from "html-react-parser";
import type { Message } from '@/types/chat';
import { Copy, Check } from "lucide-react";

interface ChatMessageProps {
  message: Message;
  shouldType?: boolean;
}

export default function ChatMessage({
  message,
  shouldType = false
}: ChatMessageProps) {
  const isUser = message.role === 'user';

  const [typedLength, setTypedLength] = useState(
    isUser || !shouldType ? message.content.length : 0
  );

  const [isFinished, setIsFinished] = useState(
    isUser || !shouldType
  );

  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (isUser || !shouldType) {
      setTypedLength(message.content.length);
      setIsFinished(true);
      return;
    }

    setTypedLength(0);
    setIsFinished(false);

    let index = 0;

    const interval = setInterval(() => {
      index++;

      if (index <= message.content.length) {
        setTypedLength(index);
      } else {
        clearInterval(interval);
        setIsFinished(true);
      }
    }, 8);

    return () => clearInterval(interval);
  }, [message.content, isUser, shouldType]);

  const visibleHTML = message.content.slice(0, typedLength);

  // 🔹 Copy handler
  const handleCopy = async () => {
    try {
      // Strip HTML → copy clean text
      const temp = document.createElement("div");
      temp.innerHTML = message.content;
      const text = temp.textContent || temp.innerText || "";

      await navigator.clipboard.writeText(text);

      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {}
  };

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} group`}>
      <div
        className={`
          relative
          max-w-[78%] px-5 py-4 rounded-3xl leading-relaxed shadow-sm
          transition-all text-[18px] font-mono
          ${isUser
            ? 'bg-white/10 text-zinc-200 rounded-tr-none'
            : 'text-zinc-100 rounded-tl-none'
          }
        `}
      >
        {isUser ? (
          <span>{message.content}</span>
        ) : (
          <>
            <span>{parse(visibleHTML)}</span>

            {!isFinished && (
              <span className="animate-pulse ml-1">▌</span>
            )}
          </>
        )}

        {/* ⭐ Copy Button */}
        <button
          onClick={handleCopy}
          className="
            absolute -bottom-6 right-2
            opacity-0 group-hover:opacity-100
            transition-opacity duration-200
            p-1.5 rounded-md
            bg-black/40 hover:bg-black/60
            backdrop-blur
          "
          aria-label="Copy message"
        >
          {copied ? (
            <Check className="w-4 h-4 text-green-400" />
          ) : (
            <Copy className="w-4 h-4 text-zinc-300" />
          )}
        </button>

      </div>
    </div>
  );
}