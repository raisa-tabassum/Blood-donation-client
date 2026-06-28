import { useState } from "react";
import { FaEye, FaTrash, FaFilter } from "react-icons/fa";
import Table from "../../../components/ui/Table/Table";
import TableHeader from "../../../components/ui/Table/TableHeader";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";

const AllBloodDonationRequest = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [status, setStatus] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const {
    data = {},
    isPending,
    refetch,
  } = useQuery({
    queryKey: ["all-blood-donation-request", status, currentPage],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/all-blood-donation-request?status=${status}&page=${currentPage}&limit=${itemsPerPage}`,
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

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Delete Request?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
    });

    if (!result.isConfirmed) return;

    const res = await axiosSecure.delete(`/donation-requests/${id}`);

    if (res.data.deletedCount) {
      Swal.fire({
        icon: "success",
        title: "Request Deleted Successfully",
        timer: 1500,
        showConfirmButton: false,
      });
      refetch();
    }
  };

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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h2 className="heading-font text-3xl font-bold text-accent">
          All Blood Donation Requests
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
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="inprogress">Inprogress</option>
            <option value="done">Done</option>
            <option value="canceled">Canceled</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <Table className="overflow-x-auto shadow-md">
        <TableHeader
          columns={[
            "Recipient",
            "Location",
            "Blood Group",
            "Date",
            "Time",
            "Status",
            " Requester",
            "Actions",
          ]}
        />
        <tbody>
          {requests.length === 0 ? (
            <tr>
              <td
                colSpan="8"
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
                <td>{request.donationTime}</td>

                <td>
                  <span className={getStatusClass(request.requestStatus)}>
                    {request.requestStatus}
                  </span>
                </td>

                <td>{request.requesterName}</td>

                <td>
                  <div className="flex gap-2">
                    <button
                      onClick={() =>
                        navigate(`/dashboard/donation-requests/${request._id}`)
                      }
                      className="btn btn-sm custom-btn-outline"
                    >
                      <FaEye />
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDelete(request._id)}
                      className="btn btn-sm custom-btn-primary"
                    >
                      <FaTrash />
                    </button>
                  </div>
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

export default AllBloodDonationRequest;
