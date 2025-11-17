import React, {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";
import type { ReactNode, Dispatch, SetStateAction } from "react";
// import { getResponseFromAI } from "../../services/AIAssistant/landingPageAIService";
import socketService from "../../services/socket";

// Define message type
interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

// Define chat data structure
interface ChatData {
  messages: ChatMessage[];
  chatSuggestions: string[];
}

// Define context value type
interface LandingPageAIContextType {
  isAIAssistantOpen: boolean;
  setIsAIAssistantOpen: Dispatch<SetStateAction<boolean>>;
  chatData: ChatData;
  setChatData: Dispatch<SetStateAction<ChatData>>;
  typingState: boolean;
  setTypingState: Dispatch<SetStateAction<boolean>>;
  message: string;
  setMessage: Dispatch<SetStateAction<string>>;
  sendMessage: () => void;
  getResponse: (previousChatData: ChatData) => Promise<void>;
  preDefinedMessages: (predefinedMessage: string) => void;
}

// Define provider props
interface LandingPageAIProviderProps {
  children: ReactNode;
}

// Create context with default undefined
const LandingPageAIContext = createContext<LandingPageAIContextType | undefined>(undefined);

// Hook to use context safely
// eslint-disable-next-line react-refresh/only-export-components
export const useLandingPageAI = (): LandingPageAIContextType => {
  const context = useContext(LandingPageAIContext);
  if (!context) {
    throw new Error("useLandingPageAI must be used within a LandingPageAIProvider");
  }
  return context;
};

export const LandingPageAIProvider: React.FC<LandingPageAIProviderProps> = ({ children }) => {
  const [isAIAssistantOpen, setIsAIAssistantOpen] = useState<boolean>(false);
  const [chatData, setChatData] = useState<ChatData>({
    messages: [],
    chatSuggestions: [
      "What is YCC?",
      "How does YCC work?",
      "How to become a vendor?",
      "How to register as a supplier?",
      "How to become a crew member?",
      "Getting started guide",
    ],
  });
  const [typingState, setTypingState] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    let userId: string | null = null;

    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const parsed = JSON.parse(storedUser);
        userId = parsed?.id || parsed?._id || null;
      }
    } catch {
      // ignore parsing errors
    }

    if (!userId) {
      let guestId = localStorage.getItem("guestSessionId");
      if (!guestId) {
        guestId = `guest_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        localStorage.setItem("guestSessionId", guestId);
      }
      userId = guestId;
    }

    socketService.connect(userId);

    socketService.onAIResponse((data: { output?: string }) => {
      setChatData((prev) => ({
        ...prev,
        messages: [
          ...prev.messages,
          { role: "assistant", content: data.output || "Sorry, I didn't get that." },
        ],
      }));
      setTypingState(false);
    });

    return () => socketService.disconnect();
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const getResponse = async (previousChatData: ChatData): Promise<void> => {
    try {
      // await getResponseFromAI(previousChatData);
    } catch {
      setChatData((prev) => ({
        ...prev,
        messages: [
          ...prev.messages,
          { role: "assistant", content: "Sorry, I couldn't connect to the AI service." },
        ],
      }));
      setTypingState(false);
    }
  };

  const sendMessage = (): void => {
    if (!message.trim()) return;

    if (!isAIAssistantOpen) {
      setIsAIAssistantOpen(true);
    }

    setTypingState(true);
    const nextChatData: ChatData = {
      ...chatData,
      messages: [...chatData.messages, { role: "user", content: message }],
    };

    setChatData(nextChatData);
    setMessage("");
    getResponse(nextChatData);
  };

  const preDefinedMessages = (predefinedMessage: string): void => {
    if (!predefinedMessage.trim()) return;

    if (!isAIAssistantOpen) {
      setIsAIAssistantOpen(true);
    }

    setTypingState(true);
    const nextChatData: ChatData = {
      ...chatData,
      messages: [...chatData.messages, { role: "user", content: predefinedMessage }],
    };

    setChatData(nextChatData);
    getResponse(nextChatData);
  };

  return (
    <LandingPageAIContext.Provider
      value={{
        isAIAssistantOpen,
        setIsAIAssistantOpen,
        chatData,
        setChatData,
        typingState,
        setTypingState,
        message,
        setMessage,
        sendMessage,
        getResponse,
        preDefinedMessages,
      }}
    >
      {children}
    </LandingPageAIContext.Provider>
  );
};

export default LandingPageAIContext;
