import React, { useState } from "react";
import {
  AiOutlineLike,
  AiOutlineComment,
  AiOutlineShareAlt,
} from "react-icons/ai";
import { useSwipeable } from "react-swipeable";
import "./post.css";
import Carousel from "../carousel/Carousel";
import WebSocketClient from "../../websocket";
import { Post } from "../../types"; // Importing shared types

interface PostProps {
  post: Post;
  updateLikeCount: (postId: string, likeCount: number) => void;
  fetchComments: (postId: string) => void;
}

const PostComponent: React.FC<PostProps> = ({
  post,
  updateLikeCount,
  fetchComments,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTextExpanded, setIsTextExpanded] = useState(false);
  const websocketClient = new WebSocketClient("ws://localhost:8080");

  const handlers = useSwipeable({
    onSwipedLeft: () =>
      setCurrentIndex((prev) => (prev + 1) % post.content.media.length),
    onSwipedRight: () =>
      setCurrentIndex((prev) =>
        prev === 0 ? post.content.media.length - 1 : prev - 1
      ),
  });

  const handleLike = () => {
    websocketClient.connect();
    websocketClient.addMessageHandler((data: any) => {
      if (data.type === "UPDATE_LIKE_COUNT" && data.postId === post._id) {
        updateLikeCount(post._id, data.likeCount);
        websocketClient.disconnect();
      }
    });
    websocketClient.sendMessage({ type: "LIKE_POST", postId: post._id });
  };

  const handleCommentClick = () => {
    fetchComments(post._id);
  };

  return (
    <div className="post">
      {/* Post Header */}
      <div className="post-header">
        <img src={post.owner.dp} alt="dp" className="post-dp" />
        <span className="post-owner">{post.owner.name}</span>
      </div>

      {/* Media Container: Image and Video */}
      {(post.content.type.includes("photo") ||
        post.content.type.includes("video")) && (
        <Carousel media={post.content.media} />
      )}

      {/* Post Actions */}
      <div className="post-actions">
        <AiOutlineLike className="icon" title="Like" onClick={handleLike} />
        <AiOutlineComment
          className="icon"
          title="Comment"
          onClick={handleCommentClick}
        />
        <AiOutlineShareAlt className="icon" title="Share" />
      </div>

      {/* Text Container */}
      {post.content.text && (
        <div className="post-text">
          <p className={isTextExpanded ? "expanded" : "collapsed"}>
            {post.content.text}
          </p>
          {post.content.text.length > 200 && (
            <button
              className="toggle-text"
              onClick={() => setIsTextExpanded(!isTextExpanded)}
            >
              {isTextExpanded ? "Less" : "More"}
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default PostComponent;
