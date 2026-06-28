import { useState } from "react";
import { FaFilter } from "react-icons/fa";
import Table from "../../../components/ui/Table/Table";
import TableHeader from "../../../components/ui/Table/TableHeader";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useNavigate } from "react-router";

const MyDonationRequests = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [status, setStatus] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const getStatusClass = (status) => {
    switch (status) {
      case "pending":
        return "badge badge-warning text-white";

      case "inprogress":
        return "badge badge-info text-white";

      case "done":
        return "badge badge-success text-white";

      case "canceled":
        return "badge badge-error text-white";

      default:
        return "badge";
    }
  };

  const { data = {}, isPending } = useQuery({
    queryKey: ["my-donation-requests", status, currentPage],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/my-donation-requests?status=${status}&page=${currentPage}&limit=${itemsPerPage}`,
      );
      return res.data;
    },
  });

  const requests = data.requests || [];
  const totalPages = data.totalPages || 1;

  if (isPending) {
    return (
      <div className="flex justify-center py-20">
        <span className="loading loading-spinner text-primary loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <h2 className="heading-font text-2xl md:text-3xl font-bold text-accent">
          My Donation Requests
        </h2>

        <div className="flex items-center gap-2">
          <FaFilter className="text-primary" />

          <select
            value={status}
            onChange={(e) => {
              setStatus(e.target.value);
              setCurrentPage(1);
            }}
            className="select select-bordered rounded-xl"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="inprogress">In Progress</option>
            <option value="done">Done</option>
            <option value="canceled">Canceled</option>
          </select>
        </div>
      </div>
      {/* Table */}
      <Table className="shadow-md overflow-x-auto">
        <TableHeader
          columns={[
            "Recipient",
            "Location",
            "Blood Group",
            "Date",
            "Status",
            "Action",
          ]}
        />

        <tbody>
          {requests.length === 0 ? (
            <tr>
              <td
                colSpan="6"
                className="text-center text-lg text-primary font-semibold py-10"
              >
                No Donation Requests Found
              </td>
            </tr>
          ) : (
            requests.map((request) => (
              <tr key={request._id}>
                <td>{request.recipientName}</td>

                <td>
                  {request.district}, {request.upazila}
                </td>

                <td>
                  <span className="badge badge-error text-white">
                    {request.bloodGroup}
                  </span>
                </td>

                <td>{request.donationDate}</td>

                <td>
                  <span className={getStatusClass(request.requestStatus)}>
                    {request.requestStatus}
                  </span>
                </td>

                <td>
                  <button
                    onClick={() =>
                      navigate(`/dashboard/donation-requests/${request._id}`)
                    }
                    className="btn btn-sm custom-btn-outline"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>

      {/* pagination */}
      <div className="flex justify-center mt-8 gap-2 flex-wrap">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
          className="btn btn-sm"
        >
          Prev
        </button>

        {[...Array(totalPages).keys()].map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page + 1)}
            className={`btn custom-btn-outline btn-sm ${
              currentPage === page + 1 ? "btn-primary" : ""
            }`}
          >
            {page + 1}
          </button>
        ))}

        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
          className="btn btn-sm"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default MyDonationRequests;
