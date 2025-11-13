import { createContext, useContext, useState, useEffect } from "react";
import { getResponseFromAI } from "../../services/AIAssistant/dashboardPageAIService";
import { fetchChatHistory } from "../../services/AIAssistant/chatHistoryService";
import { useUser } from "../userContext";
import socketService from "../../services/socket";

const DashboardAIContext = createContext();

export const useDashboardAI = () => {
  return useContext(DashboardAIContext);
};

export const DashboardAIProvider = ({ children }) => {
  const { user } = useUser();

  const userId = user?.id || user?._id || null;
  const [isAIAssistantOpen, setIsAIAssistantOpen] = useState(false);
  const [chatData, setChatData] = useState({
    _id: "",
    userId: userId,
    messages: [],
    chatSuggestions: [],
  });
  const [typingState, setTypingState] = useState(false);
  const [message, setMessage] = useState("");
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);
  const [historyError, setHistoryError] = useState(null);

  // Load chat history when modal opens
  useEffect(() => {
    const loadChatHistory = async () => {
      if (isAIAssistantOpen && userId && chatData.messages.length === 0) {
        setIsLoadingHistory(true);
        setHistoryError(null);

        try {
          const result = await fetchChatHistory(userId);

          if (result.success && result.chatData) {
            setChatData((prevData) => ({
              ...prevData,
              _id: result.chatData._id,
              messages: result.chatData.messages || [],
              chatSuggestions:
                result.chatData.chatSuggestions || prevData.chatSuggestions,
            }));
          } else if (!result.success) {
            //console.warn("Could not load chat history:", result.error);
            setHistoryError(result.error);
          }
        } catch (error) {
          setHistoryError("Failed to load chat history");
        } finally {
          setIsLoadingHistory(false);
        }
      }
    };

    loadChatHistory();
  }, [isAIAssistantOpen, userId]);

  // Update userId in chatData when user changes
  useEffect(() => {
    setChatData((prevData) => ({
      ...prevData,
      userId: userId,
    }));
  }, [userId]);

  // WebSocket integration
  useEffect(() => {
    if (userId) {
      socketService.connect(userId);

      socketService.onAIResponse((data) => {
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
    }
  }, [userId]);

  const sendMessage = () => {
    if (!message.trim()) return;
    if (!isAIAssistantOpen) {
      setIsAIAssistantOpen(true);
    }
    setTypingState(true);
    let previousChatData = chatData;
    previousChatData.messages.push({ role: "user", content: message });
    setChatData(previousChatData);
    getResponse(previousChatData);
    setMessage("");
  };

  const getResponse = async (previousChatData) => {
    try {
      await getResponseFromAI(previousChatData);
    } catch (error) {
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

  const preDefinedMessages = (predefinedMessage) => {
    if (!predefinedMessage.trim()) return;
    if (!isAIAssistantOpen) {
      setIsAIAssistantOpen(true);
    }
    setTypingState(true);
    let previousChatData = chatData;
    previousChatData.messages.push({
      role: "user",
      content: predefinedMessage,
    });
    setChatData(previousChatData);
    getResponse(previousChatData);
  };

  return (
    <DashboardAIContext.Provider
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
        isLoadingHistory,
        historyError,
      }}
    >
      {children}
    </DashboardAIContext.Provider>
  );
};

export default DashboardAIContext;
