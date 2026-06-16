import React from "react";
import Navbar from "../components/shared/Navbar/Navbar";
import { Outlet } from "react-router";
import Footer from "../components/shared/Footer/Footer";

const RootLayout = () => {
  return (
    <div className="bg-gray-100">
      <Navbar></Navbar>
      <div className="min-h-screen bg-[#F5F9FF]">
        <Outlet></Outlet>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default RootLayout;
