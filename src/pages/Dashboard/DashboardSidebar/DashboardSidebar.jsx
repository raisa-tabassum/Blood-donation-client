import { NavLink } from "react-router";
import { FaHeartbeat, FaHome, FaUser } from "react-icons/fa";
import { BiDonateHeart } from "react-icons/bi";
import { FaHandHoldingMedical, FaUsers } from "react-icons/fa6";
// import useRole from "../../../hooks/useRole";

const DashboardSidebar = () => {
  const role = "admin";
  // const { role } = useRole();

  const linkClass = ({ isActive }) =>
    `flex items-center font-semibold gap-3 px-4 py-2 hover:bg-transparent rounded-lg transition-all
     ${isActive ? "text-primary" : "text-neutral hover:text-primary"}`;

  return (
    <aside className="min-h-full bg-blue-50 w-44 md:w-64 border-r border-base-300">
      <ul className="menu p-4 space-y-2">
        {/* Common */}
        <li>
          <NavLink to="/dashboard" end className={linkClass}>
            <FaHome className="text-accent" />
            Home
          </NavLink>
        </li>

        <li>
          <NavLink to="/dashboard/profile" className={linkClass}>
            <FaUser className="text-accent" />
            Profile
          </NavLink>
        </li>

        {/* DONOR */}
        {role === "donor" && (
          <>
            <li>
              <NavLink
                to="/dashboard/create-donation-request"
                className={linkClass}
              >
                <FaHandHoldingMedical className="text-accent" />
                Create Request
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/dashboard/my-donation-request"
                className={linkClass}
              >
                <FaHeartbeat className="text-accent" />
                My Requests
              </NavLink>
            </li>

            <li>
              <NavLink to="/dashboard/funding" className={linkClass}>
                <BiDonateHeart className="text-accent" />
                Funding
              </NavLink>
            </li>
          </>
        )}

        {/* ADMIN */}
        {role === "admin" && (
          <>
            <li>
              <NavLink to="/dashboard/all-users" className={linkClass}>
                <FaUsers className="text-accent" />
                All Users
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/dashboard/all-donation-request"
                className={linkClass}
              >
                <FaHeartbeat className="text-accent" />
                All Requests
              </NavLink>
            </li>

            <li>
              <NavLink to="/dashboard/funding" className={linkClass}>
                <BiDonateHeart className="text-accent" />
                Funding
              </NavLink>
            </li>
          </>
        )}

        {/* VOLUNTEER */}
        {role === "volunteer" && (
          <>
            <li>
              <NavLink to="/dashboard/all-requests" className={linkClass}>
                <FaHeartbeat className="text-accent" />
                All Requests
              </NavLink>
            </li>

            <li>
              <NavLink to="/dashboard/funding" className={linkClass}>
                <BiDonateHeart className="text-accent" />
                Funding
              </NavLink>
            </li>
          </>
        )}
      </ul>
    </aside>
  );
};

export default DashboardSidebar;
