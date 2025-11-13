import axios from "axios";
const API_URL = process.env.REACT_APP_API_URL;

// Direct call to n8n webhook using frontend env vars
const N8N_WEBHOOK_URL = process.env.REACT_APP_N8N_WEBHOOK_URL;
const N8N_SESSION_ID = process.env.REACT_APP_N8N_SESSION_ID;

export const getResponseFromAI = async (chat) => {
  try {
    const latestUserMessage =
      chat.messages[chat.messages.length - 1]?.content || "";

    if (!latestUserMessage.trim()) {
      return;
    }

    // Resolve userId from chat, userContext persisted localStorage, or null
    let userId = null;
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const parsed = JSON.parse(storedUser);
        userId = parsed?.id || parsed?._id || null;
      }
    } catch (_) { }

    if (!userId) {
      let guestId = localStorage.getItem("guestSessionId");
      if (!guestId) {
        guestId = `guest_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        localStorage.setItem("guestSessionId", guestId);
      }
      userId = guestId;
    }

    await axios.post(
      `${API_URL}/n8n/ask`,
      {
        chatInput: latestUserMessage,
        sessionId: N8N_SESSION_ID || "",
        userId: userId || null,
      },
      {
        headers: { "Content-Type": "application/json" },
        timeout: 300000, // 5 minutes
      }
    );
  } catch (error) {
    throw error;
  }
};
