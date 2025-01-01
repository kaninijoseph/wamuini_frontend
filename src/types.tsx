// Define reusable types for Post, Comment, PostOwner, and PostContent

export interface PostOwner {
  dp: string;
  name: string;
}

export interface PostContent {
  type: Array<"text" | "photo" | "video">;
  media: string[];
  text: string;
}

export interface Comment {
  _id: string;
  user_id: {
    username: string;
  };
  text: string;
}

export interface Post {
  _id: string;
  owner: PostOwner;
  content: PostContent;
  likes: string[];
  comments: Comment[];
}
