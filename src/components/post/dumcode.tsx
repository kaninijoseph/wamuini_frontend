import React from "react";
import { Post } from "..";

// Dummy Data for Display
const dummyPosts = [
  {
    owner: {
      dp: "https://via.placeholder.com/150",
      name: "User 1",
    },
    content: {
      type: "text" as "text", // Explicit type assertion
      text: "This is a simple text post to demonstrate how the layout works. It is long enough that we can test the expand/less functionality.",
      media: [],
    },
  },
  {
    owner: {
      dp: "https://via.placeholder.com/150",
      name: "User 2",
    },
    content: {
      type: "photo" as "photo", // Explicit type assertion
      text: "Here is a photo post. Swipe to see the media.",
      media: [
        "https://via.placeholder.com/600x400/0000FF/808080?Text=Image+1",
        "https://via.placeholder.com/600x400/FF0000/FFFFFF?Text=Image+2",
        "https://via.placeholder.com/600x400/00FF00/FFFFFF?Text=Image+3",
      ],
    },
  },
  {
    owner: {
      dp: "https://via.placeholder.com/150",
      name: "User 3",
    },
    content: {
      type: "video" as "video", // Explicit type assertion
      text: "This is a video post. Swipe to see the video content.Make sure your Post component (where you display the media) is correctly set up to handle images and videos as per the carousel functionality. If you're still facing issues with the carousel not functioning as expected, you can integrate and debug it in the Post component as previously outlined",
      media: [
        "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
        "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
      ],
    },
  },
  {
    owner: {
      dp: "https://via.placeholder.com/150",
      name: "User 4",
    },
    content: {
      type: "photo" as "photo", // Explicit type assertion
      text: "This is another photo post. Swipe to see the media.",
      media: [
        "https://via.placeholder.com/600x400/FF5733/FFFFFF?Text=Image+4",
        "https://via.placeholder.com/600x400/DAF7A6/FFFFFF?Text=Image+5",
      ],
    },
  },
  {
    owner: {
      dp: "https://via.placeholder.com/150",
      name: "User 5",
    },
    content: {
      type: "video" as "video", // Explicit type assertion
      text: "This is another video post. Swipe to see the video content. crazy shit do happen and there's nothing that we can do",
      media: [
        "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
        "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
      ],
    },
  },
];

const App: React.FC = () => {
  return (
    <div className="App">
      {/* {dummyPosts.map((post, index) => (
        <Post key={index} post={post} />
      ))} */}
    </div>
  );
};

export default App;
