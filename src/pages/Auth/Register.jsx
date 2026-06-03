import React from "react";
import { NavLink } from "react-router";

const Register = () => {
  return (
    <div>
      <div className="min-h-screen bg-[#FFF5F5] flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-8">
          <h2 className="heading-font text-3xl md:text-4xl text-center font-bold text-primary mb-8">
            Registration
          </h2>

          <form className="space-y-4">
            {/* Name */}
            <input
              type="text"
              placeholder="Full Name"
              className="input input-bordered rounded-2xl w-full"
            />

            {/* Email */}
            <input
              type="email"
              placeholder="Email Address"
              className="input input-bordered rounded-2xl w-full"
            />

            {/* Avatar */}
            <input
              type="file"
              className="file-input file-input-bordered rounded-2xl w-full"
            />

            {/* Blood Group */}
            <select className="select select-bordered rounded-2xl w-full">
              <option selected>
                Select Blood Group
              </option>
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
            <select className="select select-bordered rounded-2xl w-full">
              <option selected>
                Select District
              </option>
            </select>

            {/* Upazila */}
            <select className="select select-bordered rounded-2xl w-full">
              <option selected>
                Select Upazila
              </option>
            </select>

            {/* Password */}
            <input
              type="password"
              placeholder="Password"
              className="input input-bordered rounded-2xl w-full"
            />

            {/* Confirm Password */}
            <input
              type="password"
              placeholder="Confirm Password"
              className="input input-bordered rounded-2xl w-full"
            />

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
