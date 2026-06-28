import useRole from "../../../hooks/useRole";
import AdminDashboardHome from "../Admin/AdminDashboardHome";
import DonorDashboardHome from "../Donor/DonorDashboardHome";

const DashboardHome = () => {
  const { role } = useRole();

  if (role === "donor") return <DonorDashboardHome />;

  if (role === "admin" || role === "volunteer") {
    return <AdminDashboardHome />;
  }

  return null;
};

export default DashboardHome;
