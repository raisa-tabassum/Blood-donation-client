import React from "react";
import {
  FaUserShield,
  FaUserCheck,
  FaUserSlash,
  FaHandsHelping,
} from "react-icons/fa";
import { HiDotsVertical } from "react-icons/hi";

const AllUsers = () => {
  const users = [
    {
      id: 1,
      name: "Raisa Tabassum",
      email: "raisa@gmail.com",
      role: "Donor",
      status: "Active",
      avatar: "https://i.pravatar.cc/150?img=1",
    },
    {
      id: 2,
      name: "John Doe",
      email: "john@gmail.com",
      role: "Volunteer",
      status: "Blocked",
      avatar: "https://i.pravatar.cc/150?img=2",
    },
    {
      id: 3,
      name: "Sarah Khan",
      email: "sarah@gmail.com",
      role: "Admin",
      status: "Active",
      avatar: "https://i.pravatar.cc/150?img=3",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
        <h2 className="heading-font text-3xl font-bold text-accent">
          All Users
        </h2>

        <select className="select select-bordered rounded-xl">
          <option>All Users</option>
          <option>Active</option>
          <option>Blocked</option>
        </select>
      </div>

      <div className="bg-white rounded-2xl shadow-md p-6">
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>Avatar</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th>More Actions</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-12 h-12 rounded-full"
                    />
                  </td>

                  <td>{user.name}</td>

                  <td>{user.email}</td>

                  <td>
                    <span
                      className={`badge ${
                        user.role === "Admin"
                          ? "badge-error"
                          : user.role === "Volunteer"
                            ? "badge-info"
                            : "badge-primary"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>

                  <td>
                    <span
                      className={`badge ${
                        user.status === "Active"
                          ? "badge-success"
                          : "badge-error"
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
                        className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
                      >
                        {/* Block User */}
                        <li>
                          <button>
                            <FaUserSlash className="text-red-500" />
                            Block User
                          </button>
                        </li>

                        {/* Unblock User */}
                        <li>
                          <button>
                            <FaUserCheck className="text-green-500" />
                            Unblock User
                          </button>
                        </li>

                        {/* Make Volunteer */}
                        <li>
                          <button>
                            <FaHandsHelping className="text-blue-500" />
                            Make Volunteer
                          </button>
                        </li>

                        {/* Make Admin */}
                        <li>
                          <button>
                            <FaUserShield className="text-purple-500" />
                            Make Admin
                          </button>
                        </li>
                      </ul>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AllUsers;
