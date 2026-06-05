import React from "react";
import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";

const Login = () => {
  const { loginUser } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleLogin = async (data) => {
    try {
      const result = await loginUser(data.email, data.password);

      console.log("Logged In User:", result.user);

      toast.success("Login Successful!");

      navigate("/dashboard");
    } catch (error) {
      console.log(error);

      toast.error(
        error.message || "Invalid email or password"
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
      <div className="card w-full max-w-md bg-base-100 shadow-xl rounded-3xl">
        <div className="card-body p-8">

          <h2 className="text-3xl font-bold text-center text-primary">
            Login
          </h2>

          <p className="text-center text-gray-500 mt-2">
            Welcome back to BloodConnect
          </p>

          <form
            onSubmit={handleSubmit(handleLogin)}
            className="mt-8 space-y-5"
          >
            {/* Email */}
            <div>
              <label className="text-sm text-gray-600">
                Email
              </label>

              <input
                type="email"
                placeholder="Enter your email"
                className="input input-bordered rounded-xl w-full mt-1"
                {...register("email", {
                  required: "Email is required",
                })}
              />

              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="text-sm text-gray-600">
                Password
              </label>

              <input
                type="password"
                placeholder="Enter your password"
                className="input input-bordered rounded-xl w-full mt-1"
                {...register("password", {
                  required: "Password is required",
                })}
              />

              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <button className="custom-btn w-full">
              <span>Login</span>
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            Don’t have an account?{" "}
            <Link
              to="/register"
              className="text-primary hover:text-secondary font-semibold hover:underline"
            >
              Register
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
};

export default Login;