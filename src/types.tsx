// Define reusable types for Post, Comment, PostOwner, and PostContent

export interface PostOwner {
  // dp: string;
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
  id: string;
  name: string; // User's full name
  text: string; // Post text conten
  media: { type: "image" | "video"; path: string }[]; // Array of media objects (image or video)
}
