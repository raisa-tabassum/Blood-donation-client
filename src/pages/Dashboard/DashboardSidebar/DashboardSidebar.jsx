import { NavLink } from "react-router";
import { FaHeartbeat, FaHome, FaUser } from "react-icons/fa";
import { BiDonateHeart } from "react-icons/bi";
import { FaHandHoldingMedical, FaUsers } from "react-icons/fa6";
import useRole from "../../../hooks/useRole";
// import useRole from "../../../hooks/useRole";

const DashboardSidebar = () => {
  const { role } = useRole();

  const linkClass = ({ isActive }) =>
    `flex items-center font-semibold gap-3 px-4 py-3 rounded-lg transition-all is-drawer-close:tooltip is-drawer-close:tooltip-right
     ${isActive ? "text-primary" : "text-neutral hover:text-primary"}`;

  return (
    <aside
      className="flex min-h-full flex-col
    bg-blue-50
    is-drawer-close:w-20
    is-drawer-open:w-64 border-r border-blue-50"
    >
      <ul className=" p-4 space-y-2">
        <li>
          <NavLink
            to="/dashboard"
            end
            className={linkClass}
            data-tip="Homepage"
          >
            <FaHome className="text-accent text-lg shrink-0" />

            <span className="is-drawer-close:hidden">Homepage</span>
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/dashboard/profile"
            className={linkClass}
            data-tip="Profile"
          >
            <FaUser className="text-accent text-lg shrink-0" />

            <span className="is-drawer-close:hidden">Profile</span>
          </NavLink>
        </li>

        {role === "donor" && (
          <>
            <li>
              <NavLink
                to="/dashboard/create-donation-request"
                className={linkClass}
                data-tip="Create Request"
              >
                <FaHandHoldingMedical className="text-accent text-lg shrink-0" />

                <span className="is-drawer-close:hidden">Create Request</span>
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/dashboard/my-donation-request"
                className={linkClass}
                data-tip="My Requests"
              >
                <FaHeartbeat className="text-accent text-lg shrink-0" />

                <span className="is-drawer-close:hidden">My Requests</span>
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/dashboard/funding"
                className={linkClass}
                data-tip="Funding"
              >
                <BiDonateHeart className="text-accent text-lg shrink-0" />

                <span className="is-drawer-close:hidden">Funding</span>
              </NavLink>
            </li>
          </>
        )}

        {role === "admin" && (
          <>
            <li>
              <NavLink
                to="/dashboard/all-users"
                className={linkClass}
                data-tip="All Users"
              >
                <FaUsers className="text-accent text-lg shrink-0" />

                <span className="is-drawer-close:hidden">All Users</span>
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/dashboard/all-donation-requests"
                className={linkClass}
                data-tip="All Requests"
              >
                <FaHeartbeat className="text-accent text-lg shrink-0" />

                <span className="is-drawer-close:hidden">All Requests</span>
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/dashboard/funding"
                className={linkClass}
                data-tip="Funding"
              >
                <BiDonateHeart className="text-accent text-lg shrink-0" />

                <span className="is-drawer-close:hidden">Funding</span>
              </NavLink>
            </li>
          </>
        )}

        {role === "volunteer" && (
          <>
            <li>
              <NavLink
                to="/dashboard/all-donation-request"
                className={linkClass}
                data-tip="All Requests"
              >
                <FaHeartbeat className="text-accent text-lg shrink-0" />

                <span className="is-drawer-close:hidden">All Requests</span>
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/dashboard/funding"
                className={linkClass}
                data-tip="Funding"
              >
                <BiDonateHeart className="text-accent text-lg shrink-0" />

                <span className="is-drawer-close:hidden">Funding</span>
              </NavLink>
            </li>
          </>
        )}
      </ul>
    </aside>
  );
};

export default DashboardSidebar;
