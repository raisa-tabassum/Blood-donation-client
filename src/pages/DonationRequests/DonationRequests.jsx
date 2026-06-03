import React from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaCalendarDays, FaClock, FaDroplet } from "react-icons/fa6";
import { NavLink } from "react-router";

const DonationRequests = () => {
  const requests = [
    {
      id: 1,
      recipient: "Rahim Ahmed",
      location: "Dhaka, Dhamrai",
      bloodGroup: "A+",
      date: "15 Aug 2026",
      time: "10:00 AM",
    },
    {
      id: 2,
      recipient: "Karim Hasan",
      location: "Gazipur, Kaliganj",
      bloodGroup: "O-",
      date: "18 Aug 2026",
      time: "03:30 PM",
    },
    {
      id: 3,
      recipient: "Nusrat Jahan",
      location: "Tangail, Mirzapur",
      bloodGroup: "B+",
      date: "20 Aug 2026",
      time: "09:00 AM",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      {/* Heading */}
      <div className="text-center mb-12">
        <h2 className="heading-font text-3xl md:text-5xl font-bold text-accent">
          Blood Donation Requests
        </h2>

        <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
          Browse active blood donation requests and help save lives by
          connecting with recipients in need.
        </p>
      </div>

      {/* Desktop Table */}
      <div className="hidden lg:block overflow-x-auto bg-white rounded-2xl shadow-md">
        <table className="table">
          <thead>
            <tr className="bg-red-50 text-accent">
              <th>Recipient</th>
              <th>Location</th>
              <th>Blood Group</th>
              <th>Date</th>
              <th>Time</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {requests.map((request) => (
              <tr key={request.id}>
                <td>{request.recipient}</td>
                <td>{request.location}</td>
                <td>
                  <span className="badge badge-error text-white">
                    {request.bloodGroup}
                  </span>
                </td>
                <td>{request.date}</td>
                <td>{request.time}</td>

                <td>
                  <NavLink
                    to={`/donation-request/${request.id}`}
                    className="custom-btn-primary"
                  >
                    View
                  </NavLink>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Cards style */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:hidden">
        {requests.map((request) => (
          <div
            key={request.id}
            className="bg-white rounded-2xl shadow-md p-6"
          >
            <h3 className="heading-font text-xl font-semibold text-accent">
              {request.recipient}
            </h3>

            <div className="space-y-3 mt-4 text-gray-600">
              <div className="flex items-center gap-2">
                <FaMapMarkerAlt className="text-primary" />
                <span>{request.location}</span>
              </div>

              <div className="flex items-center gap-2">
                <FaDroplet className="text-primary" />
                <span>{request.bloodGroup}</span>
              </div>

              <div className="flex items-center gap-2">
                <FaCalendarDays className="text-primary" />
                <span>{request.date}</span>
              </div>

              <div className="flex items-center gap-2">
                <FaClock className="text-primary" />
                <span>{request.time}</span>
              </div>
            </div>

            <div className="mt-6 flex">
              <NavLink
                to={`/donation-request/${request.id}`}
                className="custom-btn-primary"
              >
                View Details
              </NavLink>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default DonationRequests;
