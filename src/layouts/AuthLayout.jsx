import React from "react";

import { Outlet } from "react-router";
import Navbar from "../components/shared/Navbar/Navbar";
import Footer from "../components/shared/Footer/Footer";

const AuthLayout = () => {
  return (
    <div className="min-h-screen max-w-7xl mx-auto]">
      <Navbar></Navbar>
      <div>
          <Outlet></Outlet>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default AuthLayout;
