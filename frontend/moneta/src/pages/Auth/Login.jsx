import React, { useState } from "react";
import AuthLayout from "../../components/layouts/AuthLayout";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/Inputs/Input";
import { validateEmail } from "../../utils/helper";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError("Something seems wrong with your email address");
      return;
    }
    if (!password) {
      setError("Are you sure you entered your right password?");
      return;
    }
    setError("");

    
  };
  return (
    <AuthLayout>
      <div className="lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center">
        <h3 className="text-2xl font-bold text-white">Welcome Back</h3>
        <p className="text-sm text-slate-400 mt-1 mb-6">
          Track your expenses and stay on top of your goals.
        </p>

        <form onSubmit={handleLogin}>
          <Input
            value={email}
            onChange={({ target }) => setEmail(target.value)}
            label="Email Address"
            placeholder="Enter your email"
            type="email"
            required
          />
          <Input
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            label="Password"
            placeholder="Min 8 Characters"
            type="password"
            required
          />
          {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
          <button
            type="submit"
            className="w-full bg-emerald-500 text-white py-2 px-4 rounded cursor-pointer hover:bg-emerald-600 transition"
          >
            LOGIN
          </button>
          <p className="text-sm text-slate-400 mt-4">
            New here?{" "}
            <Link to="/signup" className="text-emerald-400 hover:underline">
              Create an account
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
};

export default Login;
