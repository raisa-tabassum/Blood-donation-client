import { FaMoon } from "react-icons/fa";
import { useState } from "react";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import Logo from "../../../components/shared/Logo/Logo";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { HiSun } from "react-icons/hi2";

const DashboardHeader = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: dbUser = {} } = useQuery({
    queryKey: ["user", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}`);
      return res.data;
    },
  });

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
        {/* Theme Toggle */}
        <button onClick={handleTheme} className="btn btn-ghost btn-circle">
          {dark ? <HiSun /> : <FaMoon />}
        </button>

        <div className="hidden md:block text-right">
          <h4 className="font-semibold text-accent text-sm">
            {dbUser?.name || "User"}
          </h4>

          <p className="text-xs text-gray-400">Donor</p>
        </div>

        <img
          src={dbUser?.avatar || "https://i.ibb.co/4pDNDk1/avatar.png"}
          alt={dbUser?.name}
          className="w-10 h-10 rounded-full border-2 border-primary object-cover"
        />
      </div>
    </div>
  );
};

export default DashboardHeader;
