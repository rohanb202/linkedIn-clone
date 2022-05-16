import { useEffect, useState } from "react";
import Input from "./Input";
import { handlePostState, useSSRPostsState } from "../atoms/postAtom";
import { useRecoilState } from "recoil";
import Post from "./Post";

function Feed({ posts }) {
  const [realTimePost, setRealTimePost] = useState([]);
  const [handlePost, setHandlePost] = useRecoilState(handlePostState);
  const [useSSRPosts, setUseSSRPosts] = useRecoilState(useSSRPostsState);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/posts", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      setRealTimePost(data);
      setHandlePost(false);
      setUseSSRPosts(false);
    };
    fetchPosts();
  }, [handlePost]);
  //console.log(realTimePost);
  return (
    <div className="max-w-lg pb-24 space-y-6">
      <Input />
      {/* Posts */}
      {!useSSRPosts
        ? realTimePost.map((post) => <Post key={post._id} post={post} />)
        : posts.map((post) => <Post key={post._id} post={post} />)}
    </div>
  );
}

export default Feed;
