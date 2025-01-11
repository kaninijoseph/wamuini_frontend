import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { Navbar } from "./components";
import { Home, Login, Market, Poster, SignUp, EmailVerify } from "./containers";
import { Post } from "./types"; // Importing shared types
import { io, Socket } from "socket.io-client"; // Import socket.io-client
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const App: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [socket, setSocket] = useState<Socket | null>(null); // Manage socket connection
  const [websocketConnected, setWebsocketConnected] = useState(false); // Track WebSocket connection status

  // Function to fetch initial posts from the server
  const fetchPosts = async () => {
    const token = localStorage.getItem("WamuiniAppAuthToken");

    try {
      const response = await fetch("http://localhost:3000/api/posts/fetch", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log(data);

      const posts: Post[] = data.map((post: any) => ({
        id: post.id,
        name: post.name, // Extract name from user_id
        text: post.text,
        media: post.media,
      }));

      setPosts(posts);
    } catch (error) {
      console.error("Failed to fetch posts:", error);
    }
  };

  // Fetch initial posts and manage WebSocket connection
  useEffect(() => {
    fetchPosts(); // Fetch posts

    // Connect to the socket.io server
    const socketInstance = io("http://localhost:3000", {
      transports: ["websocket"], // Specify the transport to be WebSocket
    });

    setSocket(socketInstance);

    // WebSocket message handler
    const handleWebSocketMessage = (data: any) => {
      if (data.type === "NEW_POST") {
        setPosts((prevPosts) => [data.post, ...prevPosts]); // Add new post to the beginning
      } else if (data.type === "UPDATE_POST") {
        setPosts((prevPosts) =>
          prevPosts.map((post) =>
            post.id === data.post._id ? { ...post, ...data.post } : post
          )
        );
      }
    };

    // WebSocket connection status handlers
    socketInstance.on("connect", () => {
      console.log("WebSocket connected:", socketInstance.id);
      setWebsocketConnected(true); // Set connection status to true
    });

    socketInstance.on("disconnect", () => {
      console.log("WebSocket disconnected");
      setWebsocketConnected(false); // Set connection status to false
    });

    // Listen to messages from the server
    socketInstance.on("message", handleWebSocketMessage);

    // Cleanup: Remove message handler and disconnect WebSocket client
    return () => {
      socketInstance.off("message", handleWebSocketMessage); // Remove listener
      socketInstance.disconnect(); // Disconnect from the server
      console.log("WebSocket disconnected");
    };
  }, []);

  return (
    <div className="body">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/posts"
          element={
            <Poster
              posts={posts}
              fetchPosts={fetchPosts} // Pass fetchPosts function to Poster component
              websocketConnected={websocketConnected} // Pass WebSocket status
            />
          }
        />
        <Route path="/market" element={<Market />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/api/users/:id/verify/:token" element={<EmailVerify />} />
        <Route path="*" element={<h1>404 Page Not Found</h1>} />
      </Routes>
    </div>
  );
};

export default App;
