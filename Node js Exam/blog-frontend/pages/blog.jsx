import { useEffect, useState } from "react";
import API from "../services/api";

const blog = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    API.get("/admin/users").then(res => setUsers(res.data));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl mb-4">All Users</h1>
      {users.map(user => (
        <div key={user._id} className="bg-gray-800 text-white p-4 mb-2 rounded">
          {user.name} - {user.role}
        </div>
      ))}
    </div>
  );
};

export default blog;
