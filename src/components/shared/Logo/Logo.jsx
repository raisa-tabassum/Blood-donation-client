import React from "react";
import { MdBloodtype } from "react-icons/md";
import { Link } from "react-router";

const Logo = () => {
  return (
    <div>
      <Link to="/">
        <div className="flex items-center gap-2">
          {/* <img src={logo} alt="" /> */}
          <MdBloodtype className="text-xl md:text-4xl text-red-700"/>
          <h3 className="text-xl md:text-3xl font-bold -ms-1.5 text-secondary">BloodConnect</h3>
        </div>
      </Link>
    </div>
  );
};

export default Logo;
