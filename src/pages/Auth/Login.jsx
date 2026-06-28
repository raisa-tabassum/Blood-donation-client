import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import { inputClass } from "../../styles/formStyles";
import Card from "../../components/shared/Card/Card";

const Login = () => {
  const { loginUser } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);

  const handleLogin = async (data) => {
    setLoading(true);
    try {
      const result = await loginUser(data.email, data.password);

      console.log("Logged In User:", result.user);

      toast.success("Login Successful!");

      navigate("/dashboard");
    } catch (error) {
      console.log(error);

      toast.error(error.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FFFBF5] px-4">
      <Card className="w-full max-w-md">
        <div className="card-body p-2">
          <h2 className="heading-font text-3xl font-bold text-center text-primary">
            Login
          </h2>

          <p className="text-center text-neutral mt-2">
            Welcome back to BloodConnect
          </p>

          <form onSubmit={handleSubmit(handleLogin)} className="mt-8 space-y-5">
            {/* Email */}
            <div>
              <label className="text-sm text-neutral">Email</label>

              <input
                type="email"
                placeholder="Enter your email"
                className={inputClass}
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
              <label className="text-sm text-neutral">Password</label>

              <input
                type="password"
                placeholder="Enter your password"
                className={inputClass}
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

            <button
              type="submit"
              disabled={loading}
              className="custom-btn-primary w-full flex justify-center items-center gap-2 disabled:opacity-70"
            >
              {loading && (
                <span className="loading loading-spinner loading-sm"></span>
              )}
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="text-center text-sm text-neutral mt-6">
            Don’t have an account?{" "}
            <Link
              to="/register"
              className="text-primary hover:text-secondary font-semibold hover:underline"
            >
              Register
            </Link>
          </p>
        </div>
      </Card>
    </div>
  );
};

export default Login;
