import React, { useState } from "react";
import { Link, NavLink } from "react-router";
import Logo from "../Logo/Logo";
import useAuth from "../../../hooks/useAuth";
import { TbLogout2 } from "react-icons/tb";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaMoon } from "react-icons/fa";
import { HiSun } from "react-icons/hi2";

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
        className="text-accent hover:text-primary text-md lg:text-xl font-semibold pl-6"
      >
        Donation Requests
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
      <div className="navbar bg-base-200 shadow-md rounded-lg">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex="-1"
              className="dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
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
                className="menu menu-sm dropdown-content mt-3 w-56 p-3 bg-base-100 shadow-xl rounded-2xl border border-base-300 space-y-2"
              >
                <li className="pb-2 border-b border-base-300">
                  <p className="font-bold text-accent text-lg cursor-default text-center">
                    {dbUser?.name}
                  </p>
                </li>

                <li>
                  <Link
                    to="/dashboard"
                    className="rounded-lg text-accent font-semibold hover:bg-primary hover:text-white transition-all duration-200"
                  >
                    Dashboard
                  </Link>
                </li>

                <li>
                  <button
                    onClick={handleLogOut}
                    className="rounded-lg text-primary font-medium text-left"
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
