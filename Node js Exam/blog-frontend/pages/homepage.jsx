import { useEffect, useState } from "react";
import API from "../services/api";

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    API.get("/posts").then(res => setPosts(res.data));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl mb-4">All Posts</h1>

      {posts.map(post => (
        <div key={post._id} className="bg-gray-800 text-white p-4 mb-4 rounded">
          <h2 className="text-xl">{post.title}</h2>
          <p>{post.content}</p>
          <p className="text-sm text-gray-400">
            Author: {post.author?.name}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Home;
