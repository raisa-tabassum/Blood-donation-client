import { Outlet } from "react-router";
import DashboardSidebar from "../pages/Dashboard/DashboardSidebar/DashboardSidebar";
import DashboardHeader from "../pages/Dashboard/DashboardHeader/DashboardHeader";

const DashboardLayout = () => {
  return (
    <div className="drawer lg:drawer-open bg-[#FFF5F5]">
      <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />

      {/* Main Content */}
      <div className="drawer-content flex flex-col">
        <DashboardHeader />
        <main className="p-4 md:p-6">
          <Outlet />
        </main>
      </div>

      {/* Sidebar */}
      <div className="drawer-side">
        <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
        <DashboardSidebar />
      </div>
    </div>
  );
};

export default DashboardLayout;
