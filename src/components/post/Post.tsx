import React, { useState } from "react";
import {
  AiOutlineLike,
  AiOutlineMessage,
  AiOutlineShareAlt,
} from "react-icons/ai";
import { useSwipeable } from "react-swipeable";
import "./post.css";
import Carousel from "../carousel/Carousel";

interface PostOwner {
  dp: string;
  name: string;
}

interface PostContent {
  type: Array<"text" | "photo" | "video">; // Correct type definition
  media: string[]; // For photos/videos, it's an array for swipeable content
  text: string;
}

interface PostProps {
  post: {
    owner: PostOwner;
    content: PostContent;
  };
}

const Post: React.FC<PostProps> = ({ post }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTextExpanded, setIsTextExpanded] = useState(false);

  const handlers = useSwipeable({
    onSwipedLeft: () =>
      setCurrentIndex((prev) => (prev + 1) % post.content.media.length),
    onSwipedRight: () =>
      setCurrentIndex((prev) =>
        prev === 0 ? post.content.media.length - 1 : prev - 1
      ),
  });

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
        <AiOutlineLike className="icon" title="Like" />
        <AiOutlineMessage className="icon" title="Message" />
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

export default Post;
