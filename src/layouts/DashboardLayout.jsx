import { Outlet } from "react-router";
import DashboardSidebar from "../pages/Dashboard/DashboardSidebar/DashboardSidebar";
import DashboardHeader from "../pages/Dashboard/DashboardHeader/DashboardHeader";

const DashboardLayout = () => {
  return (
    <div className="drawer lg:drawer-open bg-[#FFFBF5]">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />

      {/* Main Content */}
      <div className="drawer-content flex flex-col">
        <DashboardHeader />
        <main className="p-4 md:p-6">
          <Outlet />
        </main>
      </div>

      {/* Sidebar */}
      <div className="drawer-side overflow-visible">
        <label htmlFor="my-drawer-4" className="drawer-overlay"></label>
        <DashboardSidebar />
      </div>
    </div>
  );
};

export default DashboardLayout;
