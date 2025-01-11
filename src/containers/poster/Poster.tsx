import React, { useEffect, useState } from "react";
import { PostComponent } from "../../components";
import { Post } from "../../types"; // Importing shared types

export interface PosterProps {
  posts: Post[];
  fetchPosts: () => Promise<void>;
  websocketConnected: boolean; // Add a prop to track WebSocket status
}

const Poster: React.FC<PosterProps> = ({
  posts,
  fetchPosts,
  websocketConnected,
}) => {
  const [isWebSocketActive, setIsWebSocketActive] =
    useState(websocketConnected);

  useEffect(() => {
    setIsWebSocketActive(websocketConnected);
  }, [websocketConnected]);

  useEffect(() => {
    if (!isWebSocketActive) {
      // Fetch posts only when the WebSocket is not connected
      fetchPosts();
    }
  }, [isWebSocketActive, fetchPosts]);

  return (
    <div>
      {posts.length === 0 ? (
        <p>No posts available.</p>
      ) : (
        posts.map((post) => (
          <PostComponent
            key={post.id}
            post={{
              id: post.id,
              name: post.name,
              text: post.text,
              media: post.media,
            }}
          />
        ))
      )}
    </div>
  );
};

export default Poster;
