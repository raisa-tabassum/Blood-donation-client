import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { FaHeartbeat, FaUsers } from "react-icons/fa";
import { BiDonateHeart } from "react-icons/bi";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const AdminDashboardHome = () => {
  const COLORS = [
    "#F59E0B", // pending
    "#3B82F6", // in progress
    "#10B981", // done
    "#EF4444", // canceled
  ];
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: stats = {}, isPending } = useQuery({
      queryKey: ["admin-stats"],
      queryFn: async () => {
          const res = await axiosSecure.get("/admin-stats");
      return res.data;
    },
});
console.log(stats);
  if (isPending) {
    return (
      <div className="flex justify-center py-20">
        <span className="loading loading-spinner text-primary loading-lg"></span>
      </div>
    );
  }
  const pieData = [
    { name: "Pending", value: stats?.statusStats?.pending || 0 },
    { name: "In Progress", value: stats?.statusStats?.inprogress || 0 },
    { name: "Done", value: stats?.statusStats?.done || 0 },
    { name: "Canceled", value: stats?.statusStats?.canceled || 0 },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div>
        <h2 className="text-3xl font-bold text-accent">
          Welcome, {user?.displayName}
        </h2>
        <p className="mt-2 text-neutral">
          Manage blood donation requests and save lives.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Donors */}
        <div className="bg-base-100 shadow-lg rounded-2xl p-6 border border-base-300 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-neutral">Total Donors</p>
              <h2 className="text-4xl font-bold text-primary mt-2">
                {stats.totalDonors || 0}
              </h2>
            </div>

            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
              <FaUsers className="text-2xl text-primary" />
            </div>
          </div>

          <p className="mt-4 text-sm text-gray-400">
            Active blood donors in system
          </p>
        </div>

        {/* Total Funding */}
        <div className="bg-base-100 shadow-lg rounded-2xl p-6 border border-base-300 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-neutral">Total Funding</p>
              <h2 className="text-4xl font-bold text-secondary mt-2">
                ৳ {stats.totalFunding || 0}
              </h2>
            </div>

            <div className="w-14 h-14 rounded-2xl bg-secondary/10 flex items-center justify-center">
              <BiDonateHeart className="text-2xl text-secondary" />
            </div>
          </div>

          <p className="mt-4 text-sm text-gray-400">Funds collected so far</p>
        </div>

        {/* Requests */}
        <div className="bg-base-100 shadow-lg rounded-2xl p-6 border border-base-300 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-neutral">Blood Requests</p>
              <h2 className="text-4xl font-bold text-accent mt-2">
                {stats.totalRequests || 0}
              </h2>
            </div>

            <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center">
              <FaHeartbeat className="text-2xl text-accent" />
            </div>
          </div>

          <p className="mt-4 text-sm text-gray-400">
            Total donation requests created
          </p>
        </div>

        {/* Pie Chart */}
        <div className="bg-base-100 rounded-2xl shadow-lg p-6 md:col-span-3">
          <h2 className="text-2xl font-bold mb-6 text-accent">
            Donation Requests Overview
          </h2>

          <div className="w-full h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  cx="50%"
                  cy="50%"
                  outerRadius={130}
                  label
                >
                  {pieData.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>

                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardHome;
