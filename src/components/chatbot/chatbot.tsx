import React, { useState, useRef, useEffect, useCallback } from 'react';
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';
import { useLandingPageAI } from '../../context/AIAssistant/landingPageAIContext';
import BotIcon from '../../assets/images/ai-chat.svg';
import BotOnlineIcon from '../../assets/images/chatbot/chatbot-online-icon.png';
import VirtualizedMessageList from './VirtualizedMessageList';
import TypingDots from './TypingDots';

// Icons (replace with your icon library - heroicons, lucide-react, etc.)
import { 
  XMarkIcon, 
  MinusIcon, 
  PaperAirplaneIcon,
  InformationCircleIcon 
} from '@heroicons/react/24/outline';

interface ChatbotProps {
  isAIAssistantOpen?: boolean;
  [key: string]: any;
}

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: string;
}

const Chatbot: React.FC<ChatbotProps> = (props) => {
  const { isAIAssistantOpen: _, ...rest } = props;
  
  const {
    isAIAssistantOpen,
    setIsAIAssistantOpen,
    chatData,
    typingState,
    message,
    setMessage,
    sendMessage,
    preDefinedMessages,
  } = useLandingPageAI();

  const chatContainerRef = useRef<HTMLElement | null>(null);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [minimized, setMinimized] = useState(false);

  // Robust scroll to bottom function
  const scrollToBottom = useCallback(() => {
    if (chatContainerRef.current) {
      const container = chatContainerRef.current;
      container.scrollTo({
        top: container.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [chatData, typingState, scrollToBottom]);

  // Auto-scroll to bottom when modal opens
  useEffect(() => {
    if (isAIAssistantOpen) {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      const timeouts = [0, 50, 150, 300, 500, 1000];

      timeouts.forEach((delay) => {
        scrollTimeoutRef.current = setTimeout(() => {
          scrollToBottom();
        }, delay);
      });

      if (chatContainerRef.current) {
        const resizeObserver = new ResizeObserver(() => {
          scrollToBottom();
        });

        resizeObserver.observe(chatContainerRef.current);

        return () => {
          resizeObserver.disconnect();
          if (scrollTimeoutRef.current) {
            clearTimeout(scrollTimeoutRef.current);
          }
        };
      }
    }
  }, [isAIAssistantOpen, scrollToBottom]);

  function formatUtcTo12Hour(utcTimestamp: string): string {
    const date = new Date(utcTimestamp);
    let hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    const amPm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    const formattedMinutes = minutes.toString().padStart(2, '0');
    return `${hours}:${formattedMinutes} ${amPm}`;
  }

  const handleClose = () => {
    setIsAIAssistantOpen(false);
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      sendMessage();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Add chatbot pulse animation
  useEffect(() => {
    if (!document.getElementById('chatbot-pulse-keyframes')) {
      const style = document.createElement('style');
      style.id = 'chatbot-pulse-keyframes';
      style.innerHTML = `
        @keyframes chatbotPulse {
          0% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.08); opacity: 0.85; }
          100% { transform: scale(1); opacity: 1; }
        }
      `;
      document.head.appendChild(style);
    }
  }, []);

  const parseAIMessage = (messageText: string) => {
    return (
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeKatex]}
        components={{
          p: ({ node, ...props }) => <p className="text-base" {...props} />,
          ul: ({ node, ...props }) => <ul className="pl-5" {...props} />,
          ol: ({ node, ...props }) => <ol className="pl-5" {...props} />,
          li: ({ node, ...props }) => <li {...props} />,
          a: ({ node, children, ...props }) => (
            <a
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
              {...props}
            >
              {children}
            </a>
          ),
        }}
      >
        {messageText}
      </ReactMarkdown>
    );
  };

  return (
    <>
      {/* Chatbot for wide screen */}
      <div className="hidden md:block max-w-4xl mx-auto" {...rest}>
        <div className="flex justify-center items-center w-full">
          {/* Chat section */}
          <div className="flex items-center w-full bg-white flex-col">
            {/* Chatbot header with close and minimize buttons */}
            {isAIAssistantOpen && !minimized && (
              <div className="w-full flex justify-end items-center bg-gradient-to-r from-[#034D92] to-[#0487D9] rounded-t-3xl border-t border-l border-r border-[#A6C2D4] py-2 pr-4">
                <button
                  onClick={() => setMinimized(true)}
                  className="text-white p-2 hover:bg-white/10 rounded-full transition-colors"
                  aria-label="Minimize chat"
                >
                  <MinusIcon className="w-6 h-6" />
                </button>
                <button
                  onClick={() => setIsAIAssistantOpen(false)}
                  className="text-white p-2 hover:bg-white/10 rounded-full transition-colors"
                  aria-label="Close chat"
                >
                  <XMarkIcon className="w-6 h-6" />
                </button>
              </div>
            )}

            {/* Minimized bar */}
            {isAIAssistantOpen && minimized && (
              <div
                className="w-full flex items-center justify-between bg-gradient-to-r from-[#034D92] to-[#0487D9] rounded-3xl border border-[#A6C2D4] py-2 px-5 cursor-pointer"
                onClick={() => setMinimized(false)}
              >
                <p className="text-white font-semibold text-base">
                  Yacht Agent (Click to restore)
                </p>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsAIAssistantOpen(false);
                  }}
                  className="text-white p-2 hover:bg-white/10 rounded-full transition-colors"
                  aria-label="Close chat"
                >
                  <XMarkIcon className="w-6 h-6" />
                </button>
              </div>
            )}

            {/* Main chat section */}
            {isAIAssistantOpen && !minimized && (
              <div className="flex h-[350px] w-full bg-[#F3F3F3] p-1.5 border-l border-r border-[#A6C2D4]">
                <SimpleBar
                  style={{
                    maxHeight: '100%',
                    width: '100%',
                    overflowX: 'hidden',
                  }}
                  scrollableNodeProps={{ ref: chatContainerRef }}
                >
                  <VirtualizedMessageList
                    messages={chatData.messages}
                    isLoadingHistory={false}
                    historyError={null}
                    formatUtcTo12Hour={formatUtcTo12Hour}
                    parseAIMessage={parseAIMessage}
                    isMobile={false}
                  />
                </SimpleBar>
              </div>
            )}

            {/* Typing state */}
            {typingState && isAIAssistantOpen && !minimized && (
              <div className="flex w-full px-4 py-2 border-l border-r border-[#A6C2D4] bg-[#F3F3F3]">
                <div className="w-[70%] pl-4">
                  <TypingDots />
                </div>
              </div>
            )}

            {/* Chat input */}
            {isAIAssistantOpen && !minimized && (
              <div className="flex justify-center items-center w-full bg-transparent">
                <div className="w-full bg-white border-l border-r border-[#A6C2D4] p-2.5">
                  <div className="flex items-center max-h-9 px-2.5 bg-white rounded">
                    <input
                      type="text"
                      placeholder="Type a message..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value || '')}
                      onKeyDown={handleKeyDown}
                      className="flex-1 outline-none text-base leading-6 text-[#1E1E1E] placeholder:text-[#1E1E1E] placeholder:font-normal"
                    />
                    <button
                      onClick={handleSendMessage}
                      disabled={!message.trim()}
                      className="p-2 hover:bg-[#0487D9]/8 rounded-full transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                      aria-label="Send message"
                    >
                      <PaperAirplaneIcon className="w-6 h-6 text-[#0487D9]" />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* List of button options */}
            {isAIAssistantOpen && !minimized && (
              <div className="flex flex-row justify-start items-center w-full bg-[#F3F3F3] pt-4 pb-2.5 px-5 rounded-b-3xl border-l border-r border-b border-[#A6C2D4] gap-2.5 overflow-x-auto overflow-y-hidden scrollbar-thin scrollbar-thumb-[#A6C2D4] scrollbar-track-[#F3F3F3]">
                {Array.isArray(chatData.chatSuggestions) &&
                  chatData.chatSuggestions.map((s: string, idx: number) => (
                    <button
                      key={idx}
                      onClick={() => preDefinedMessages(s)}
                      className="h-[50px] min-w-[200px] flex-shrink-0 px-2.5 py-2.5 rounded-2xl border border-[#E3E3E3] bg-white hover:bg-gray-100 transition-colors"
                    >
                      <span className="font-normal text-base leading-6 text-[#353535] text-center whitespace-nowrap">
                        {s}
                      </span>
                    </button>
                  ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Chatbot FAB for mobile screen */}
      {!isAIAssistantOpen && (
        <button
          onClick={() => setIsAIAssistantOpen(true)}
          className="md:hidden fixed bottom-4 right-1.5 z-[1300] p-0 bg-transparent shadow-none hover:scale-110 hover:opacity-90 transition-all"
          style={{ animation: 'chatbotPulse 1.5s infinite' }}
          aria-label="Open chatbot"
          {...rest}
        >
          <img
            src={BotIcon}
            alt="Chatbot Button"
            className="w-20 h-20"
          />
        </button>
      )}

      {/* Mobile Modal */}
      {isAIAssistantOpen && (
        <div className="md:hidden fixed inset-0 z-[1300] flex items-center justify-center bg-[#034D92]/24">
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-center items-center w-[97vw] max-w-[99vw] min-w-[280px] h-[92vh] max-h-[92vh] min-h-[60vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Chat section */}
            <div className="flex items-center w-full flex-col">
              {/* Header section */}
              <div className="flex w-full flex-row justify-between items-center py-2 px-3 bg-gradient-to-r from-[#034D92] to-[#0487D9]">
                <div className="flex flex-row items-center gap-2">
                  <img src={BotOnlineIcon} alt="Bot online" className="w-10 h-10" />
                  <div className="flex flex-col gap-0.5">
                    <p className="text-white text-base font-semibold">
                      Yacht Agent
                    </p>
                    <p className="text-[#E6F1FA] text-[13px]">
                      AI assistant
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsAIAssistantOpen(false)}
                  className="text-white p-2 hover:bg-white/10 rounded-full transition-colors"
                  aria-label="Close chat"
                >
                  <XMarkIcon className="w-6 h-6" />
                </button>
              </div>

              {/* List of button options */}
              <div className="flex flex-row justify-start w-full bg-[#F3F3F3] py-2.5 px-3 gap-2.5 overflow-x-auto scrollbar-none">
                {Array.isArray(chatData.chatSuggestions) &&
                  chatData.chatSuggestions.map((s: string, idx: number) => (
                    <button
                      key={idx}
                      onClick={() => preDefinedMessages(s)}
                      className="h-[50px] min-w-[200px] flex-shrink-0 px-2.5 py-2.5 rounded-2xl border border-[#E3E3E3] bg-white hover:bg-gray-100 transition-colors"
                    >
                      <span className="font-normal text-sm leading-6 text-[#353535] text-center whitespace-nowrap">
                        {s}
                      </span>
                    </button>
                  ))}
              </div>

              {/* Main chat section */}
              <div className="flex h-[55vh] w-full bg-[#F3F3F3] p-1.5">
                <SimpleBar
                  style={{
                    maxHeight: '100%',
                    width: '100%',
                    overflowX: 'hidden',
                  }}
                  scrollableNodeProps={{ ref: chatContainerRef }}
                >
                  <VirtualizedMessageList
                    messages={chatData.messages}
                    isLoadingHistory={false}
                    historyError={null}
                    formatUtcTo12Hour={formatUtcTo12Hour}
                    parseAIMessage={parseAIMessage}
                    isMobile={true}
                  />
                </SimpleBar>
              </div>

              {/* Typing state */}
              {typingState && (
                <div className="flex w-full px-4 py-2 border-l border-r border-[#A6C2D4] bg-[#F3F3F3]">
                  <div className="w-[88%] pl-4">
                    <TypingDots />
                  </div>
                </div>
              )}

              {/* Chat input */}
              <div className="flex justify-center items-center w-full bg-transparent">
                <div className="w-full bg-white p-2.5">
                  <div className="flex items-center max-h-9 px-2.5 bg-white rounded">
                    <input
                      type="text"
                      placeholder="Type a message..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value || '')}
                      onKeyDown={handleKeyDown}
                      className="flex-1 outline-none text-base leading-6 text-[#1E1E1E] placeholder:text-[#1E1E1E] placeholder:font-normal"
                    />
                    <button
                      onClick={handleSendMessage}
                      disabled={!message.trim()}
                      className="p-2 hover:bg-[#0487D9]/8 rounded-full transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                      aria-label="Send message"
                    >
                      <PaperAirplaneIcon className="w-6 h-6 text-[#0487D9]" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Footer text */}
              <div className="flex justify-center items-center w-full bg-[#F3F3F3] rounded-b-3xl p-2.5">
                <p className="flex items-center gap-1 text-xs leading-[30px] text-[#667085] whitespace-nowrap">
                  <InformationCircleIcon className="w-3.5 h-3.5 text-[#9BBAD0]" />
                  AI may make mistakes. Consider checking important info.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;