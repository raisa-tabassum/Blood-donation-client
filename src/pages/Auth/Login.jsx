import React from "react";
import { Link } from "react-router";

const Login = () => {
  const handleLogin = (e) => {
    e.preventDefault();
    // Firebase auth logic
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FFF5F5] px-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">

        {/* Title */}
        <h2 className="heading-font text-3xl font-bold text-center text-accent">
          Login
        </h2>
        <p className="text-center text-gray-500 mt-2">
          Welcome back to BloodConnect
        </p>

        {/* Form */}
        <form onSubmit={handleLogin} className="mt-8 space-y-5">

          {/* Email */}
          <div>
            <label className="text-sm text-gray-600">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="input input-bordered rounded-xl w-full mt-1"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-sm text-gray-600">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="input input-bordered rounded-xl w-full mt-1"
              required
            />
          </div>

          {/* Button */}
          <button className="custom-btn w-full">
            <span>Login</span>
          </button>
        </form>

        {/* Switch page */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Don’t have an account?{" "}
          <Link to="/register" className="text-primary hover:text-secondary font-semibold hover:underline">
            Register
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Login;