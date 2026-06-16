import React, { useState } from "react";
import { Link, NavLink } from "react-router";
import Logo from "../Logo/Logo";
import useAuth from "../../../hooks/useAuth";
import { TbLogout2 } from "react-icons/tb";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaMoon, FaUser } from "react-icons/fa";
import { HiSun } from "react-icons/hi2";
import { HiMenuAlt2 } from "react-icons/hi";
import { BiDonateHeart, BiSolidDashboard } from "react-icons/bi";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: dbUser = {} } = useQuery({
    queryKey: ["user", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}`);
      return res.data;
    },
  });
  console.log("dbUser:", dbUser);

  const [dark, setDark] = useState(false);
  const handleTheme = () => {
    const html = document.documentElement;
    if (dark) {
      html.setAttribute("data-theme", "light");
    } else {
      html.setAttribute("data-theme", "dark");
    }
    setDark(!dark);
  };

  const links = (
    <li>
      <NavLink
        to="/donation-requests"
        className={({ isActive }) =>
          `text-md lg:text-xl font-semibold pl-6 ${
            isActive ? "text-gray-900" : "text-accent hover:text-primary"
          }`
        }
      >
        Donation Requests
      </NavLink>
      <NavLink
        to="/search-donors"
        className={({ isActive }) =>
          `text-md lg:text-xl font-semibold pl-6 ${
            isActive ? "text-gray-900" : "text-accent hover:text-primary"
          }`
        }
      >
        Search Donors
      </NavLink>
      <NavLink
        to="/dashboard/funding"
        className={({ isActive }) =>
          `text-md lg:text-xl font-semibold pl-6 ${
            isActive ? "text-gray-900" : "text-accent hover:text-primary"
          }`
        }
      >
        Funding
      </NavLink>
    </li>
  );
  const handleLogOut = () => {
    logOut()
      .then()
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      <div className="navbar sticky w-full z-50 bg-base-100 rounded-xl">
        <div className="navbar-start">
          <div className="dropdown dropdown-hover lg:hidden">
            <div tabIndex={0} role="button" className="mx-2">
              <HiMenuAlt2 className="text-accent" />
            </div>
            <ul
              tabIndex="-1"
              className="dropdown-content menu bg-base-200 rounded-xl z-1 w-46 p-2 shadow-md"
            >
              {links}
            </ul>
          </div>
          <span>
            <Logo></Logo>
          </span>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul>{links}</ul>
        </div>
        <div className="navbar-end gap-2">
          {/* Theme Toggle */}
          <button onClick={handleTheme} className="btn btn-ghost btn-circle">
            {dark ? <HiSun /> : <FaMoon />}
          </button>
          {user ? (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-11 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  <img
                    src={
                      dbUser?.avatar || "https://i.ibb.co/4pDNDk1/avatar.png"
                    }
                    alt={dbUser?.name}
                  />
                </div>
              </div>

              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 w-56 p-3 bg-base-100 shadow-xl rounded-2xl border border-base-300 -y-2"
              >
                <li className="pb-2 border-b border-base-300">
                  <p className="font-bold text-accent text-lg cursor-default text-center">
                    {dbUser?.name}
                  </p>
                </li>

                <li>
                  <Link
                    to="/dashboard/profile"
                    className="rounded-lg text-accent font-semibold hover:bg-primary hover:text-white transition-all duration-200"
                  >
                    <FaUser />
                    Profile
                  </Link>
                </li>

                <li>
                  <Link
                    to="/dashboard"
                    className="rounded-lg text-accent font-semibold hover:bg-primary hover:text-white transition-all duration-200"
                  >
                    <BiSolidDashboard />
                    Dashboard
                  </Link>
                </li>

                <li>
                  <Link
                    to="/dashboard/funding"
                    className="rounded-lg text-accent font-semibold hover:bg-primary hover:text-white transition-all duration-200"
                  >
                    <BiDonateHeart />
                    Funding
                  </Link>
                </li>

                <li>
                  <button
                    onClick={handleLogOut}
                    className="rounded-lg text-primary font-medium text-left hover:bg-[#FCF9EA]"
                  >
                    <TbLogout2 />
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <Link to="/login" className="btn custom-btn">
              Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
