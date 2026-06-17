import React from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaCalendarDays, FaClock, FaDroplet } from "react-icons/fa6";
import { NavLink } from "react-router";
import Card from "../../components/shared/Card/Card";
import Table from "../../components/ui/Table/Table";
import TableHeader from "../../components/ui/Table/TableHeader";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const DonationRequests = () => {
  const axiosSecure = useAxiosSecure();

  const { data: requests = [] } = useQuery({
    queryKey: ["donation-requests"],
    queryFn: async () => {
      const res = await axiosSecure.get("/donation-requests");
      return res.data;
    },
  });

  return (
    <section className="min-h-screen bg-[#FFF8EE] px-4 py-16">
      {/* Heading */}
      <div className="text-center mb-12">
        <h2 className="heading-font text-3xl md:text-5xl font-bold text-accent">
          Blood Donation Requests
        </h2>

        <p className="mt-4 text-neutral max-w-2xl mx-auto">
          Browse active blood donation requests and help save lives by
          connecting with recipients in need.
        </p>
      </div>

      {/* Desktop Table */}
      <div className="hidden lg:block max-w-6xl mx-auto overflow-x-auto bg-white rounded-2xl shadow-md">
        <Table className="overflow-x-auto shadow-md">
          <TableHeader
            columns={[
              "Recipient",
              "Location",
              "Blood Group",
              "Date",
              "Time",
              "Actions",
            ]}
          />

          <tbody>
            {requests.map((request) => (
              <tr key={request._id}>
                <td>{request.recipientName}</td>
                <td>
                  {request.district}
                </td>
                <td>
                  <span className="badge badge-error text-white">
                    {request.bloodGroup}
                  </span>
                </td>
                <td>{request.donationDate}</td>
                <td>{request.donationTime}</td>

                <td>
                  <NavLink
                    to={`/dashboard/donation-requests/${request._id}`}
                    className="custom-btn-outline"
                  >
                    View
                  </NavLink>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:hidden">
        {requests.map((request) => (
          <Card
            key={request._id}
            className="bg-white rounded-2xl shadow-md p-6"
          >
            <h3 className="heading-font text-xl font-semibold text-accent">
              {request.recipientName}
            </h3>

            <div className="space-y-3 mt-4 text-neutral">
              <div className="flex items-center gap-2">
                <FaMapMarkerAlt className="text-primary" />
                <span>
                  {request.district}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <FaDroplet className="text-primary" />
                <span>{request.bloodGroup}</span>
              </div>

              <div className="flex items-center gap-2">
                <FaCalendarDays className="text-primary" />
                <span>{request.donationDate}</span>
              </div>

              <div className="flex items-center gap-2">
                <FaClock className="text-primary" />
                <span>{request.donationTime}</span>
              </div>
            </div>

            <div className="mt-6 flex">
              <NavLink
                to={`/dashboard/donation-requests/${request._id}`}
                className="custom-btn-outline"
              >
                View Details
              </NavLink>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default DonationRequests;
