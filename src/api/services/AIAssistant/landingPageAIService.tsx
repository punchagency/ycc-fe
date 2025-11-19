import axios, { type AxiosInstance } from "axios";
import { toast } from "sonner";

// Environment variables - CRA exposes them directly on import.meta or window
const API_URL = import.meta.env.REACT_APP_API_URL as string | undefined;
const N8N_SESSION_ID = import.meta.env.REACT_APP_N8N_SESSION_ID as string | undefined;

// Ensure API URL exists
if (!API_URL) {
  toast.error("⚠️ Missing REACT_APP_API_URL in environment variables.");
}

// Define types for chat data and messages
interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

interface ChatData {
  messages: ChatMessage[];
  chatSuggestions?: string[];
}

// Create a dedicated axios instance for AI requests
const aiAxiosInstance: AxiosInstance = axios.create({
  timeout: 600000, // 10 minutes
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Sends the latest user message from the chat to the AI backend
 * via an n8n webhook endpoint.
 */
export const getResponseFromAI = async (chat: ChatData): Promise<void> => {
  try {
    const latestUserMessage = chat.messages[chat.messages.length - 1]?.content || "";
    if (!latestUserMessage.trim()) {
      return;
    }

    // Resolve user ID or guest ID
    let userId: string | null = null;
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const parsed = JSON.parse(storedUser);
        userId = parsed?.id || parsed?._id || null;
      }
    } catch {
      // Ignore parse errors
    }

    if (!userId) {
      let guestId = localStorage.getItem("guestSessionId");
      if (!guestId) {
        guestId = `guest_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        localStorage.setItem("guestSessionId", guestId);
      }
      userId = guestId;
    }

    await aiAxiosInstance.post(
      `${API_URL}/n8n/ask`,
      {
        chatInput: latestUserMessage,
        sessionId: N8N_SESSION_ID || "",
        userId: userId || null,
      }
    );
  } catch (error) {
    console.error("❌ AI request failed:", error);
    throw error;
  }
};