import { useEffect, useState } from "react";
import API from "../services/api";

const Dashboard = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    API.get("/posts/my").then(res => setPosts(res.data));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl mb-4">My Posts</h1>
      {posts.map(post => (
        <div key={post._id} className="bg-gray-800 text-white p-4 mb-4 rounded">
          {post.title}
        </div>
      ))}
    </div>
  );
};

export default Dashboard;
