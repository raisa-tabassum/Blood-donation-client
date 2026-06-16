import React, { useState } from "react";
import {
  FaUserShield,
  FaUserCheck,
  FaUserSlash,
  FaHandsHelping,
  FaFilter,
} from "react-icons/fa";
import { HiDotsVertical } from "react-icons/hi";
import Table from "../../../components/ui/Table/Table";
import TableHeader from "../../../components/ui/Table/TableHeader";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [status, setStatus] = useState("");

  const { data: users = [], refetch } = useQuery({
    queryKey: ["users", status],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/users${status ? `?status=${status}` : ""}`,
      );
      return res.data;
    },
  });

  const handleRoleUpdate = async (user, role) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: `Make ${user.name} ${role}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
    });

    if (!result.isConfirmed) return;

    const res = await axiosSecure.patch(`/users/${user._id}/role`, { role });

    if (res.data.modifiedCount) {
      refetch();

      Swal.fire({
        icon: "success",
        title: `${user.name} is now ${role}`,
        timer: 1500,
        showConfirmButton: false,
      });
    }
  };

  const handleStatusUpdate = async (user, status) => {
    const res = await axiosSecure.patch(`/users/${user._id}/status`, {
      status,
    });

    if (res.data.modifiedCount) {
      refetch();

      Swal.fire({
        icon: "success",
        title: `User ${status} successfully`,
        timer: 1500,
        showConfirmButton: false,
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
        <h2 className="heading-font text-3xl font-bold text-accent">
          All Users
        </h2>

        <div className="flex items-center gap-2">
          <FaFilter className="text-primary" />
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="select select-bordered rounded-xl"
          >
            <option value="">All Users</option>
            <option value="active">Active</option>
            <option value="blocked">Blocked</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <Table className="overflow-x-auto shadow-md">
        <TableHeader
          columns={["Avatar", "Name", "Email", "Role", "Status", "Action"]}
        />
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>
                <img src={user.avatar} className="w-10 h-10 rounded-full" />
              </td>

              <td>{user.name}</td>
              <td>{user.email}</td>

              <td>
                <span
                  className={`badge text-white font-semibold ${
                    user.role === "admin"
                      ? "badge-error"
                      : user.role === "volunteer"
                        ? "badge-info"
                        : "badge-primary"
                  }`}
                >
                  {user.role}
                </span>
              </td>

              <td>
                <span
                  className={`badge text-white ${
                    user.status === "active" ? "badge-success" : "badge-error"
                  }`}
                >
                  {user.status}
                </span>
              </td>

              <td>
                <div className="dropdown dropdown-end">
                  <label tabIndex={0} className="btn btn-ghost btn-sm">
                    <HiDotsVertical className="text-lg" />
                  </label>

                  <ul
                    tabIndex={0}
                    className="dropdown-content z-1 menu p-2 shadow bg-base-100 rounded-box w-52"
                  >
                    {user.status === "active" ? (
                      <li>
                        {/* Block User */}
                        <button
                          onClick={() => handleStatusUpdate(user, "blocked")}
                        >
                          <FaUserSlash className="text-red-500" />
                          Block User
                        </button>
                      </li>
                    ) : (
                      <li>
                        {/* Unblock User */}
                        <button
                          onClick={() => handleStatusUpdate(user, "active")}
                        >
                          <FaUserCheck className="text-green-500" />
                          Unblock User
                        </button>
                      </li>
                    )}

                    {user.role !== "volunteer" && (
                      <li>
                        {/* Make Volunteer */}
                        <button
                          onClick={() => handleRoleUpdate(user, "volunteer")}
                        >
                          <FaHandsHelping className="text-blue-500" />
                          Make Volunteer
                        </button>
                      </li>
                    )}

                    {user.role !== "admin" && (
                      <li>
                        {/* Make Admin */}
                        <button onClick={() => handleRoleUpdate(user, "admin")}>
                          <FaUserShield className="text-purple-500" />
                          Make Admin
                        </button>
                      </li>
                    )}
                  </ul>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default AllUsers;
