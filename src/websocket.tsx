type MessageHandler = (data: any) => void;

class WebSocketClient {
  private url: string;
  private websocket: WebSocket | null;
  private messageHandlers: MessageHandler[];
  private retryCount: number;
  private maxRetries: number;
  private reconnectDelay: number;
  private stopped: boolean; // Flag to stop retries

  constructor(url: string, maxRetries = 5) {
    this.url = url;
    this.websocket = null;
    this.messageHandlers = [];
    this.retryCount = 0;
    this.maxRetries = maxRetries;
    this.reconnectDelay = 1000;
    this.stopped = false; // Initialize as false
  }

  connect(): void {
    if (this.stopped) {
      console.warn("WebSocket connection attempts have been stopped.");
      return;
    }

    if (this.retryCount >= this.maxRetries) {
      console.error(
        `Max retries reached (${this.maxRetries}). Not attempting further.`
      );
      this.stopped = true; // Stop further connection attempts
      return;
    }

    console.log(`Connecting to WebSocket server at ${this.url}...`);
    this.websocket = new WebSocket(this.url);

    this.websocket.onopen = () => {
      console.log("Connected to WebSocket server");
      this.retryCount = 0; // Reset retry count on successful connection
    };

    this.websocket.onmessage = (event: MessageEvent) => {
      try {
        const data = JSON.parse(event.data);
        this.messageHandlers.forEach((handler) => handler(data));
      } catch (error) {
        console.error("Error parsing WebSocket message:", error);
      }
    };

    this.websocket.onclose = (event: CloseEvent) => {
      console.warn(
        `WebSocket disconnected (code: ${event.code}, reason: ${event.reason})`
      );
      this.retryConnection();
    };

    this.websocket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };
  }

  private retryConnection(): void {
    if (this.stopped) return;

    this.retryCount++;
    if (this.retryCount < this.maxRetries) {
      const delay = this.retryCount * this.reconnectDelay;
      console.log(
        `Retrying connection (${this.retryCount}/${this.maxRetries}) in ${delay}ms...`
      );
      setTimeout(() => this.connect(), delay);
    } else {
      console.error(
        `Max retries reached (${this.maxRetries}). Stopping reconnection attempts.`
      );
      this.stopped = true; // Stop further retries
    }
  }

  disconnect(): void {
    console.log("Manually stopping WebSocket and retries.");
    this.stopped = true; // Ensure retries stop
    if (this.websocket) {
      this.websocket.close();
      this.websocket = null;
    }
  }

  addMessageHandler(handler: MessageHandler): void {
    if (!this.messageHandlers.includes(handler)) {
      this.messageHandlers.push(handler);
    }
  }

  removeMessageHandler(handler: MessageHandler): void {
    this.messageHandlers = this.messageHandlers.filter((h) => h !== handler);
  }

  sendMessage(message: any): void {
    if (this.websocket && this.websocket.readyState === WebSocket.OPEN) {
      try {
        this.websocket.send(JSON.stringify(message));
      } catch (error) {
        console.error("Failed to send WebSocket message:", error);
      }
    } else {
      console.warn("WebSocket is not open. Unable to send message.");
    }
  }
}

export default WebSocketClient;
