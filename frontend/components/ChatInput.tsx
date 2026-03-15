'use client';

import { useState, useRef, useEffect } from 'react';

interface ChatInputProps {
  onSend: (content: string) => void;
}

const MAX_HEIGHT = 192; // ≈ 8 lines

export default function ChatInput({ onSend }: ChatInputProps) {
  const [value, setValue] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const adjustHeight = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    textarea.style.height = 'auto';

    const newHeight = Math.min(textarea.scrollHeight, MAX_HEIGHT);
    textarea.style.height = `${newHeight}px`;

    // enable scroll after max height
    textarea.style.overflowY =
      textarea.scrollHeight > MAX_HEIGHT ? 'auto' : 'hidden';
  };

  useEffect(() => {
    adjustHeight();
  }, [value]);

  const handleSubmit = () => {
    if (!value.trim()) return;
    onSend(value);
    setValue('');

    // reset height after send
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.overflowY = 'hidden';
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="relative mx-auto w-full max-w-3xl">
      <div className="glass-input bg-zinc-900/90 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl p-2 flex items-end gap-3">
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Message Adwa ChatBot..."
          rows={1}
          className="flex-1 bg-transparent px-5 py-3.5 text-[15.5px] placeholder-zinc-400 focus:outline-none resize-none leading-tight max-h-[192px] overflow-hidden scrollbar-thin"
        />

        <button
          onClick={handleSubmit}
          disabled={!value.trim()}
          className="h-10 w-10 flex items-center justify-center rounded-2xl bg-white text-zinc-950 hover:bg-white/90 disabled:opacity-40 transition-all active:scale-95"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={3}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.874L5.999 12zm0 0h7.07"
            />
          </svg>
        </button>
      </div>

      <div className="text-center text-[10px] text-zinc-500 mt-3 tracking-widest">
        Adwa ChatBot may make mistakes • Check Important Info
      </div>
    </div>
  );
}