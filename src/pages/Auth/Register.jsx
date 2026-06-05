import React from "react";
import { NavLink, useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import { useForm } from "react-hook-form";
// import useAxiosSecure from "../../hooks/useAxiosSecure";
import axios from "axios";
import toast from "react-hot-toast";

const Register = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const { registerUser, updateUserProfile } = useAuth();
  const navigate = useNavigate();
  // const axiosSecure = useAxiosSecure();

  const handleRegistration = async (data) => {
    try {
      const profileImg = data.avatar[0];

      // 1. Upload image to ImageBB
      const formData = new FormData();
      formData.append("image", profileImg);

      const image_API_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host_key}`;

      const imageRes = await axios.post(image_API_URL, formData);

      const photoURL = imageRes.data.data.display_url;

      // 2. Create Firebase User
      const result = await registerUser(data.email, data.password);

      // 3. Update Firebase Profile
      await updateUserProfile({
        displayName: data.name,
        photoURL,
      });

      // 4. Save User to Database
      // const userInfo = {
      //   name: data.name,
      //   email: data.email,
      //   avatar: photoURL,
      //   bloodGroup: data.bloodGroup,
      //   district: data.district,
      //   upazila: data.upazila,
      //   role: "donor",
      //   status: "active",
      //   createdAt: new Date(),
      // };

      // await axiosSecure.post("/users", userInfo);

      console.log("User Created:", result.user);

      toast.success("Registration successful!");
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className="min-h-screen bg-[#FFF5F5] flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-3xl md:text-4xl text-center font-bold text-primary mb-8">
            Registration
          </h2>

          <form
            onSubmit={handleSubmit(handleRegistration)}
            className="space-y-4"
          >
            {" "}
            {/* Name */}
            <input
              type="text"
              placeholder="Full Name"
              {...register("name", {
                required: "Name is required",
              })}
              className="input input-bordered rounded-2xl w-full"
            />
            {errors.name && (
              <p className="text-primary text-sm">{errors.name.message}</p>
            )}
            {/* Avatar File */}
            <input
              type="file"
              accept="image/*"
              {...register("avatar", {
                required: "Avatar is required",
              })}
              className="file-input file-input-bordered rounded-2xl w-full"
            />
            {errors.avatar && (
              <p className="text-red-500 text-sm">{errors.avatar.message}</p>
            )}
            {/* Blood Group */}
            <select
              {...register("bloodGroup", {
                required: "Blood Group is required",
              })}
              className="select select-bordered rounded-2xl w-full"
            >
              <option value="">Select Blood Group</option>
              <option>A+</option>
              <option>A-</option>
              <option>B+</option>
              <option>B-</option>
              <option>AB+</option>
              <option>AB-</option>
              <option>O+</option>
              <option>O-</option>
            </select>
            {/* District */}
            <select
              {...register("district", {
                required: "District is required",
              })}
              className="select select-bordered rounded-2xl w-full"
            >
              <option value="">Select District</option>
              <option value="Dhaka">Dhaka</option>
              <option value="Gazipur">Gazipur</option>
            </select>
            {/* Upazila */}
            <select
              {...register("upazila", {
                required: "Upazila is required",
              })}
              className="select select-bordered rounded-2xl w-full"
            >
              <option value="">Select Upazila</option>
              <option value="Dhaka">Dhaka</option>
              <option value="Gazipur">Gazipur</option>
            </select>
            {/* Email */}
            <input
              type="email"
              placeholder="Email Address"
              {...register("email", {
                required: "Email is required",
              })}
              className="input input-bordered rounded-2xl w-full"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
            {/* Password */}
            <input
              type="password"
              placeholder="Password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
                  message:
                    "Must contain uppercase, lowercase, number and special character",
                },
              })}
              className="input input-bordered rounded-2xl w-full"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
            {/* Confirm Password */}
            <input
              type="password"
              placeholder="Confirm Password"
              {...register("confirmPassword", {
                required: "Confirm password is required",
                validate: (value) =>
                  value === watch("password") || "Passwords do not match",
              })}
              className="input input-bordered rounded-2xl w-full"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm">
                {errors.confirmPassword.message}
              </p>
            )}
            <button className="custom-btn w-full">
              <span>Create Account</span>
            </button>
          </form>

          <p className="text-center mt-5 text-gray-600">
            Already have an account?{" "}
            <NavLink
              to="/login"
              className="text-primary hover:text-secondary font-semibold hover:underline"
            >
              Login
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
