import React from "react";
import { PostComponent } from "../../components";
import { Post } from "../../types"; // Importing shared types

interface PosterProps {
  posts: Post[];
  updateLikeCount: (postId: string, likeCount: number) => void;
  fetchComments: (postId: string) => void;
}

const Poster: React.FC<PosterProps> = ({
  posts,
  updateLikeCount,
  fetchComments,
}) => {
  return (
    <div>
      {posts.map((post) => (
        <PostComponent
          key={post._id}
          post={post}
          updateLikeCount={updateLikeCount}
          fetchComments={fetchComments}
        />
      ))}
    </div>
  );
};

export default Poster;
