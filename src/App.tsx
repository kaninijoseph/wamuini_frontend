import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { Navbar } from "./components";
import { Home, Login, Market, Poster, SignUp } from "./containers";
import WebSocketClient from "./websocket"; // Import the WebSocketClient
import { Post } from "./types"; // Importing shared types

const App: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const websocketClient = new WebSocketClient("ws://127.0.0.1:8080", 5); // Initialize WebSocket client with a retry limit

  useEffect(() => {
    const token = localStorage.getItem("WamuiniAppAuthToken");

    // Function to fetch initial posts from the server
    const fetchPosts = async () => {
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
        setPosts(data);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      }
    };

    fetchPosts(); // Fetch initial posts
    websocketClient.connect(); // Connect to WebSocket server

    // WebSocket message handler
    const handleWebSocketMessage = (data: any) => {
      if (data.type === "NEW_POST" || data.type === "UPDATE_POST") {
        setPosts((prevPosts) => {
          const updatedPosts = prevPosts.map((post) =>
            post._id === data.post._id ? data.post : post
          );
          if (!prevPosts.find((post) => post._id === data.post._id)) {
            updatedPosts.push(data.post);
          }
          return updatedPosts;
        });
      } else if (data.type === "UPDATE_LIKE_COUNT") {
        setPosts((prevPosts) =>
          prevPosts.map((post) =>
            post._id === data.postId
              ? { ...post, likes: Array(data.likeCount).fill("like") }
              : post
          )
        );
      }
    };

    websocketClient.addMessageHandler(handleWebSocketMessage); // Add WebSocket message handler

    // Cleanup: Remove message handler and disconnect WebSocket client
    return () => {
      websocketClient.removeMessageHandler(handleWebSocketMessage);
      websocketClient.disconnect();
    };
  }, []);

  // Function to update like count for a post
  const updateLikeCount = (postId: string, likeCount: number) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post._id === postId
          ? { ...post, likes: Array(likeCount).fill("like") }
          : post
      )
    );
  };

  // Function to fetch comments for a post
  const fetchComments = async (postId: string) => {
    try {
      const response = await fetch(`/api/posts/${postId}/comments`);
      if (!response.ok) {
        throw new Error("Failed to fetch comments");
      }
      const comments = await response.json();

      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post._id === postId ? { ...post, comments } : post
        )
      );
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

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
              updateLikeCount={updateLikeCount}
              fetchComments={fetchComments}
            />
          }
        />
        <Route path="/market" element={<Market />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signUp" element={<SignUp />} />
      </Routes>
    </div>
  );
};

export default App;
