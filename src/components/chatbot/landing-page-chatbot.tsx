// components/chatbot/landing-page-chatbot.tsx
import React, { useState, useEffect, useRef, useCallback } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";

import BotModalIcon from "../../assets/images/chatbot/chatbot-modal-icon.png";
import BotOnlineIcon from "../../assets/images/chatbot/chatbot-online-icon.png";
import { getResponseFromAI } from "../../services/AIAssistant/landingPageAIService";
import socketService from "../../services/socket";
import TypingDots from "./TypingDots";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const LandingPageChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [typing, setTyping] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const chatContainerRef = useRef<HTMLDivElement>(null);

  const suggestions = [
    "What is YCC?",
    "How does YCC work?",
    "How to become a vendor?",
    "How to register as a supplier?",
    "How to become a crew member?",
    "Getting started guide",
  ];

  // Auto-scroll to bottom
  const scrollToBottom = useCallback(() => {
    if (chatContainerRef.current) {
      const scrollElement = chatContainerRef.current;
      scrollElement.scrollTop = scrollElement.scrollHeight;
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, typing, scrollToBottom]);

  // Socket & Session Setup
  useEffect(() => {
    let userId: string | null = null;

    try {
      const stored = localStorage.getItem("user");
      if (stored) {
        const parsed = JSON.parse(stored);
        userId = parsed?.id || parsed?._id || null;
      }
    } catch {}

    if (!userId) {
      userId = localStorage.getItem("guestSessionId");
      if (!userId) {
        userId = `guest_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        localStorage.setItem("guestSessionId", userId);
      }
    }

    socketService.connect(userId);

    socketService.onAIResponse((data) => {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.output || "I'm not sure how to respond." },
      ]);
      setTyping(false);
    });

    return () => socketService.disconnect();
  }, []);

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = { role: "user", content: text };
    setMessages((prev) => [...prev, userMessage]);
    setMessage("");
    setTyping(true);

    if (!isOpen) setIsOpen(true);

    try {
      await getResponseFromAI({
        messages: [...messages, userMessage],
        chatSuggestions: suggestions,
      });
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Sorry, I'm having trouble connecting right now." },
      ]);
      setTyping(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(message);
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-[1300] group"
        aria-label="Open AI Assistant"
      >
        <div className="relative">
          <div className="absolute inset-0 animate-ping rounded-full bg-[#0487D9]/30" />
          <img
            src={BotModalIcon}
            alt="AI Assistant"
            className="w-14 h-14 drop-shadow-2xl transition-all duration-300 
                     group-hover:scale-110 group-hover:rotate-12"
          />
        </div>
      </button>

      {/* Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[1400] flex items-center justify-center p-4"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="absolute inset-0 bg-[#034D92]/30 backdrop-blur-sm"
            onClick={(e) => e.stopPropagation()}
          />

          <div
            className="relative w-full max-w-4xl h-[90vh] max-h-[800px] bg-gray-50 
                       rounded-3xl shadow-2xl overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#034D92] to-[#0487D9] p-6 flex items-center justify-between text-white">
              <div className="flex items-center gap-4">
                <img src={BotOnlineIcon} alt="Online" className="w-12 h-12" />
                <div>
                  <h3 className="text-xl font-semibold">Yacht Agent</h3>
                  <p className="text-sm opacity-90">AI Assistant • Online</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white/20 rounded-full transition"
                aria-label="Close"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Suggestions */}
            <div className="flex gap-3 p-4 bg-gray-100 overflow-x-auto scrollbar-hide">
              {suggestions.map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => sendMessage(suggestion)}
                  className="px-5 py-3 bg-white border border-gray-200 rounded-2xl text-sm 
                           font-medium text-gray-700 whitespace-nowrap hover:bg-gray-50 
                           hover:border-[#0487D9] transition shadow-sm"
                >
                  {suggestion}
                </button>
              ))}
            </div>

            {/* Messages */}
            <SimpleBar className="flex-1" ref={chatContainerRef}>
              <div className="p-6 space-y-6">
                {messages.length === 0 && (
                  <div className="text-left">
                    <div className="inline-block bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
                      <p className="text-gray-700">
                        Welcome! I'm your AI assistant. Ask anything or tap a suggestion above to get started.
                      </p>
                    </div>
                  </div>
                )}

                {messages.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex ${msg.role === "assistant" ? "justify-start" : "justify-end"}`}
                  >
                    <div
                      className={`max-w-lg p-5 rounded-2xl shadow-sm border ${
                        msg.role === "assistant"
                          ? "bg-white border-gray-200 text-gray-800"
                          : "bg-gradient-to-r from-[#034D92] to-[#0487D9] text-white border-transparent"
                      }`}
                    >
                      <div className="prose prose-sm max-w-none text-gray-800">
                        <ReactMarkdown
                          remarkPlugins={[remarkGfm, remarkMath]}
                          rehypePlugins={[rehypeKatex]}
                          components={{
                            a: ({ href, children }) => (
                              <a
                                href={href as string}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#0487D9] underline hover:text-[#034D92] font-medium transition-colors"
                              >
                                {children}
                              </a>
                            ),
                          }}
                        >
                          {msg.content}
                        </ReactMarkdown>
                      </div>
                      <div className="mt-2 text-xs opacity-70 flex items-center gap-1">
                        {msg.role === "user" ? (
                          <>Read</>
                        ) : (
                          <>Yacht Agent • {new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</>
                        )}
                      </div>
                    </div>
                  </div>
                ))}

                {typing && (
                  <div className="flex justify-start">
                    <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
                      <TypingDots />
                    </div>
                  </div>
                )}
              </div>
            </SimpleBar>

            {/* Input */}
            <div className="p-4 bg-white border-t border-gray-200">
              <div className="flex gap-3 items-center max-w-4xl mx-auto">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type your message..."
                  className="flex-1 px-5 py-4 bg-gray-50 rounded-2xl outline-none 
                           focus:ring-4 focus:ring-[#0487D9]/20 focus:bg-white transition 
                           placeholder-gray-500 font-medium"
                />
                <button
                  onClick={() => sendMessage(message)}
                  disabled={!message.trim()}
                  className="p-4 bg-gradient-to-r from-[#034D92] to-[#0487D9] text-white 
                           rounded-2xl hover:shadow-xl transition disabled:opacity-50 
                           disabled:cursor-not-allowed"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Footer */}
            <div className="p-3 text-center text-xs text-gray-500 bg-gray-100">
              <span className="inline-flex items-center gap-1">
                AI may make mistakes. Consider checking important info.
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LandingPageChatbot;