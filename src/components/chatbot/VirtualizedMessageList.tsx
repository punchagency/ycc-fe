import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from 'react';
import 'katex/dist/katex.min.css';
import BotIcon from '../../assets/images/ai-chat.svg';
import SendIcon from '../../assets/images/chatbot/send-icon.png';
import { CheckCheckIcon } from 'lucide-react';

// Configuration constants
const MESSAGES_PER_PAGE = 20;
const SCROLL_THRESHOLD = 100; // pixels from top to trigger load more

// Type definitions
interface Message {
  id?: string;
  content: string;
  role: 'user' | 'assistant';
  createdAt?: string;
  timestamp?: string;
}

interface ParsedMessage extends Message {
  id: string;
  timestamp: string;
  originalContent: string;
}

interface VirtualizedMessageListProps {
  messages?: Message[];
  isLoadingHistory?: boolean;
  historyError?: Error | null;
  onLoadMoreMessages?: ((hasMore: boolean, startIndex: number) => void) | null;
  hasMoreMessages?: boolean;
  isLoadingMore?: boolean;
  formatUtcTo12Hour: (timestamp: string) => string;
  parseAIMessage: (content: string) => React.ReactNode;
  isMobile?: boolean;
}

const VirtualizedMessageList: React.FC<VirtualizedMessageListProps> = ({
  messages = [],
  isLoadingHistory = false,
  historyError = null,
  onLoadMoreMessages = null,
  formatUtcTo12Hour,
  parseAIMessage,
  isMobile = false,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const loadMoreButtonRef = useRef<HTMLButtonElement>(null);

  // Simple pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoadingOlderMessages, setIsLoadingOlderMessages] = useState(false);

  // Memoize the parsed messages to avoid re-parsing on every render
  const parsedMessages = useMemo(() => {
    return messages.map((message, index): ParsedMessage => ({
      ...message,
      id: message.id || `msg-${index}`,
      timestamp: message.createdAt || new Date().toISOString(),
      originalContent: message.content,
    }));
  }, [messages]);

  // Calculate visible messages based on current page
  const totalMessages = parsedMessages.length;
  const startIndex = Math.max(
    0,
    totalMessages - currentPage * MESSAGES_PER_PAGE
  );
  const endIndex = totalMessages;
  const displayMessages = parsedMessages.slice(startIndex, endIndex);
  const hasMore = startIndex > 0;

  // Debug logging
  useEffect(() => {
    console.log('VirtualizedMessageList Debug:', {
      totalMessages: messages.length,
      displayMessages: displayMessages.length,
      currentPage,
      hasMore,
      startIndex,
    });
  }, [
    messages.length,
    displayMessages.length,
    currentPage,
    hasMore,
    startIndex,
  ]);

  // Update hasMoreMessages for parent component
  useEffect(() => {
    if (onLoadMoreMessages) {
      onLoadMoreMessages(hasMore, startIndex);
    }
  }, [hasMore, startIndex, onLoadMoreMessages]);

  // Load more messages
  const handleLoadMore = useCallback(async () => {
    if (isLoadingOlderMessages || !hasMore) return;

    setIsLoadingOlderMessages(true);

    try {
      // Simulate loading delay for better UX
      await new Promise((resolve) => setTimeout(resolve, 300));
      setCurrentPage((prev) => prev + 1);
    } catch (error) {
      console.error('Error loading more messages:', error);
    } finally {
      setIsLoadingOlderMessages(false);
    }
  }, [isLoadingOlderMessages, hasMore]);

  // Handle scroll to detect when user reaches top
  const handleScroll = useCallback(
    (e: React.UIEvent<HTMLDivElement>) => {
      const container = e.target as HTMLDivElement;
      const scrollTop = container.scrollTop;

      // Load more messages when user scrolls near the top
      if (scrollTop < SCROLL_THRESHOLD && hasMore && !isLoadingOlderMessages) {
        handleLoadMore();
      }
    },
    [hasMore, isLoadingOlderMessages, handleLoadMore]
  );

  // Reset to show latest messages when new messages arrive
  useEffect(() => {
    if (messages.length > 0) {
      const latestMessage = messages[messages.length - 1];
      const isNewMessage = !displayMessages.some(
        (msg) =>
          msg.id === latestMessage.id ||
          (msg.originalContent === latestMessage.content &&
            msg.role === latestMessage.role)
      );

      if (isNewMessage) {
        // Reset to show latest messages
        setCurrentPage(1);
      }
    }
  }, [messages.length, displayMessages, messages]);

  // Render loading state
  if (isLoadingHistory) {
    return (
      <div
        className={`${
          isMobile ? 'w-[88%]' : 'w-[85%]'
        } px-4 mt-4 self-start`}
      >
        <div className="flex flex-row items-start bg-white text-left w-full py-4 px-2.5 rounded-2xl border border-[#E3E3E3]">
          <p className="text-sm leading-5">
            Loading your chat history...
          </p>
        </div>
      </div>
    );
  }

  // Render error state
  if (historyError) {
    return (
      <div
        className={`${
          isMobile ? 'w-[88%]' : 'w-[85%]'
        } px-4 mt-4 self-start`}
      >
        <div className="flex flex-row items-start bg-white text-left w-full py-4 px-2.5 rounded-2xl border border-[#E3E3E3]">
          <p className="text-sm leading-5 text-[#FF6B6B]">
            Could not load chat history. Starting fresh conversation.
          </p>
        </div>
        <div className="flex flex-row items-start bg-white text-left w-full py-4 px-2.5 rounded-2xl border border-[#E3E3E3] mt-2">
          <p className="text-sm leading-5">
            Welcome! I'm your AI assistant. Ask anything or tap a suggestion
            above to get started.
          </p>
        </div>
      </div>
    );
  }

  // Render empty state
  if (messages.length === 0) {
    return (
      <div
        className={`${
          isMobile ? 'w-[88%]' : 'w-[85%]'
        } px-4 mt-4 self-start`}
      >
        <div className="flex flex-row items-start bg-white text-left w-full py-4 px-2.5 rounded-2xl border border-[#E3E3E3]">
          <p className="text-sm leading-5">
            Welcome! I'm your AI assistant. Ask anything or tap a suggestion
            above to get started.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="flex flex-col items-center w-full h-full bg-[#F3F3F3]"
      onScroll={handleScroll}
      ref={scrollContainerRef}
    >
      {/* Load More Button */}
      {hasMore && (
        <div className="w-full flex justify-center p-2.5">
          <button
            ref={loadMoreButtonRef}
            onClick={handleLoadMore}
            disabled={isLoadingOlderMessages}
            className="rounded-full border border-gray-300 text-xs min-w-[120px] px-4 py-1.5 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isLoadingOlderMessages ? (
              <span className="flex items-center justify-center gap-2">
                <svg
                  className="animate-spin h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Loading...
              </span>
            ) : (
              'Load Older Messages'
            )}
          </button>
        </div>
      )}

      {/* Messages */}
      {displayMessages.map((item, index) => (
        <div
          key={`${item.id || index}-${item.content?.slice(0, 20)}`}
          className={`flex flex-col ${
            item.role === 'assistant' ? 'self-start' : 'self-end'
          } ${isMobile ? 'w-[88%]' : 'w-[85%]'} px-4 ${
            index === displayMessages.length - 1 ? 'mb-0' : 'mb-2'
          }`}
        >
          {/* Message Header */}
          <div
            className={`flex flex-row items-center w-full ${
              item.role === 'assistant' ? 'justify-start' : 'justify-end'
            }`}
          >
            {item.role === 'assistant' && (
              <>
                <div>
                  <img src={BotIcon} alt="Chatbot Icon" />
                </div>
                <p className="font-normal text-xs leading-[30px] text-[#646464]">
                  Yacht Agent{' '}
                  {formatUtcTo12Hour(
                    item.timestamp ? item.timestamp : new Date().toISOString()
                  )}
                </p>
              </>
            )}

            {item.role === 'user' && (
              <p className="font-normal text-xs leading-[30px] text-[#646464]">
                you{' '}
                {formatUtcTo12Hour(
                  item.timestamp ? item.timestamp : new Date().toISOString()
                )}
              </p>
            )}
          </div>

          {/* Message Content */}
          <div className="w-full">
            {item.role === 'assistant' ? (
              <div className="flex flex-row items-start bg-white text-left w-full py-4 px-2.5 rounded-2xl border border-[#E3E3E3]">
                <div
                  className={`${
                    isMobile ? 'text-sm' : 'text-base'
                  } leading-5`}
                >
                  {parseAIMessage(item.originalContent)}
                </div>
              </div>
            ) : (
              <div className="flex flex-row items-end text-left bg-gradient-to-r from-[#034D92] to-[#0487D9] w-full py-4 px-2.5 rounded-2xl border border-[#E3E3E3]">
                <p
                  className={`text-white ${
                    isMobile ? 'text-sm' : 'text-base'
                  }`}
                >
                  {item.originalContent}
                </p>
              </div>
            )}
          </div>

          {/* Message Footer */}
          <div
            className={`flex flex-row items-center w-full ${
              item.role === 'assistant' ? 'justify-start' : 'justify-end'
            } gap-1.5`}
          >
            {item.role === 'assistant' && (
              <>
                <div>
                  <img
                    src={SendIcon}
                    alt="Send Icon"
                    className="w-2.5 h-2.5"
                  />
                </div>
                <p className="font-normal text-xs leading-[30px] text-[#646464]">
                  sent
                </p>
              </>
            )}

            {item.role === 'user' && (
              <p className="font-normal text-xs leading-[30px] text-[#646464] flex items-center gap-1">
                <CheckCheckIcon className="h-3 w-3" />
                Read
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default VirtualizedMessageList;