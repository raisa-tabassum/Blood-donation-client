import { FaMoon, FaSun } from "react-icons/fa";
import { useState } from "react";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import Logo from "../../../components/shared/Logo/Logo";

const DashboardHeader = () => {
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

  return (
    <div className="navbar bg-white shadow-sm px-4 md:px-6">
      {/* Mobile Menu */}
      <div className="flex-none lg:hidden flex items-center">
        <label
          htmlFor="dashboard-drawer"
          className="mr-2 flex items-center justify-center"
        >
          <HiOutlineMenuAlt3 className="text-accent text-2xl hover:text-secondary" />
        </label>
      </div>

      {/* Title */}
      <div className="flex-1">
        <Logo></Logo>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-4">
        {/* DaisyUI Theme Toggle */}
        <button onClick={handleTheme} className="btn btn-ghost btn-circle">
          {dark ? <FaSun /> : <FaMoon />}
        </button>

        <div className="hidden md:block text-right">
          <h4 className="font-semibold text-sm">Raisa Tabassum</h4>
          <p className="text-xs text-gray-500">Donor</p>
        </div>

        <img
          src="https://i.pravatar.cc/150?img=12"
          alt="user"
          className="w-10 h-10 rounded-full border-2 border-primary"
        />
      </div>
    </div>
  );
};

export default DashboardHeader;
