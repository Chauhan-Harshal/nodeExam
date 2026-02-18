import { useState, useContext } from "react";
import API from "../services/api";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    const res = await API.post("/auth/login", form);
    setUser(res.data.user);
    navigate("/");
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="bg-gray-900 p-6 rounded text-white">
        <input
          type="email"
          placeholder="Email"
          className="block mb-3 p-2 w-64 text-black"
          onChange={e => setForm({...form, email: e.target.value})}
        />
        <input
          type="password"
          placeholder="Password"
          className="block mb-3 p-2 w-64 text-black"
          onChange={e => setForm({...form, password: e.target.value})}
        />
        <button className="bg-blue-500 px-4 py-2 rounded">Login</button>
      </form>
    </div>
  );
};

export default Login;
