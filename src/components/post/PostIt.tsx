import React, { useState } from "react";
import {
  AiOutlineLike,
  AiOutlineComment,
  AiOutlineShareAlt,
} from "react-icons/ai";
import { Post } from "../../types"; // Adjust this import based on your actual type location
import Carousel from "../carousel/Carousel"; // Assuming your Carousel component is correct
import "./post.css";

interface PostProps {
  post: Post;
}

const PostComponent: React.FC<PostProps> = ({ post }) => {
  const [isTextExpanded, setIsTextExpanded] = useState(false);

  return (
    <div className="post">
      <div className="post-header">
        <span className="post-owner">{post.name || "Unknown User"}</span>
      </div>

      {/* Conditionally render the media container */}
      {post.media && post.media.length > 0 && (
        <div className="post-media">
          <Carousel media={post.media} />
        </div>
      )}

      <div className="post-actions">
        <AiOutlineLike className="icon" title="Like" />
        <AiOutlineComment className="icon" title="Comment" />
        <AiOutlineShareAlt className="icon" title="Share" />
      </div>

      {post?.text && (
        <div className="post-text">
          <p className={isTextExpanded ? "expanded" : "collapsed"}>
            {post.text}
          </p>
          {post.text.length > 200 && (
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
