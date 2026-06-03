import React from "react";
import { NavLink } from "react-router";
import Logo from "../Logo/Logo";

const Navbar = () => {
  const links = (
    <li>
      <NavLink
        to=""
        className="text-accent hover:text-primary text-md lg:text-xl font-semibold"
      >
        Donation Requests
      </NavLink>
    </li>
  );
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
        <div className="navbar-end">
          <NavLink to="/login">
            <button className="custom-btn">
              <span>Login</span>
            </button>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
