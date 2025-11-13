import { io, Socket } from "socket.io-client";

// Environment variable with fallback
const SOCKET_URL: string = import.meta.env.REACT_APP_BACKEND_URL || "http://localhost:7000";

// Define the structure of the data received from the AI
interface AIResponseData {
  output?: string;
  [key: string]: any; // allows flexibility for future extensions
}

// Define events your socket listens for
interface ServerToClientEvents {
  "ai-response": (data: AIResponseData) => void;
  authenticated: (data: { userId: string }) => void;
  error: (error: { message: string }) => void;
  disconnect: () => void;
  connect: () => void;
}

// Define events your client emits to the server
interface ClientToServerEvents {
  authenticate: (userId: string) => void;
}

class SocketService {
  private socket: Socket<ServerToClientEvents, ClientToServerEvents> | null = null;

  /**
   * Connect to the socket server and authenticate the user
   * @param userId - unique identifier of the user
   */
  connect(userId: string): void {
    if (!userId) {
      console.error("userId is required for WebSocket connection");
      return;
    }

    this.socket = io(SOCKET_URL, {
      transports: ["websocket"],
      reconnection: true,
    });

    this.socket.on("connect", () => {
      console.log("✅ Connected to WebSocket");
      this.socket?.emit("authenticate", userId);
    });

    this.socket.on("authenticated", (data) => {
      console.log("🔐 Authenticated:", data.userId);
    });

    this.socket.on("error", (error) => {
      console.error("❌ Socket error:", error.message);
    });

    this.socket.on("disconnect", () => {
      console.log("⚠️ Disconnected from WebSocket");
    });
  }

  /**
   * Subscribe to AI response events
   * @param callback - function that handles AI response data
   */
  onAIResponse(callback: (data: AIResponseData) => void): void {
    if (this.socket) {
      this.socket.on("ai-response", callback);
    }
  }

  /**
   * Disconnect from the socket server
   */
  disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
      console.log("🔌 Disconnected socket manually");
    }
  }
}

export default new SocketService();
