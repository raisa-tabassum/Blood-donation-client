import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import Table from "../../../components/ui/Table/Table";
import TableHeader from "../../../components/ui/Table/TableHeader";
import { HiDotsVertical } from "react-icons/hi";

const DonorDashboardHome = () => {
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
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const {
    data: requests = [],
    isPending,
    refetch,
  } = useQuery({
    queryKey: ["my-donation-requests", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get("/my-donation-requests?limit=3");
      return res.data.requests;
    },
  });

  const recentRequests = requests.slice(0, 3);

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
        title: "Deleted Successfully",
        timer: 1500,
        showConfirmButton: false,
      });
      refetch();
    }
  };
  const handleStatusUpdate = async (id, status) => {
    const res = await axiosSecure.patch(`/donation-requests/status/${id}`, {
      status,
    });

    if (res.data.modifiedCount) {
      refetch();
    }
  };
  if (isPending) {
    return (
      <div className="flex justify-center py-20">
        <span className="loading loading-spinner text-primary loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div>
        <h2 className="text-3xl font-bold text-accent">
          Welcome, {user?.displayName}
        </h2>
        <p className="mt-2 text-neutral">
          Manage your blood donation requests and save lives.
        </p>
      </div>

      {/* Recent Requests */}
      {recentRequests.length > 0 && (
        <div className="bg-white shadow rounded-2xl">
          <div className="flex justify-between items-center p-4">
            <h2 className="heading-font text-xl md:text-3xl font-bold text-accent">
              Recent Donation Requests
            </h2>

            <button
              onClick={() => navigate("/dashboard/my-donation-requests")}
              className="btn custom-btn-outline"
            >
              View my all request
            </button>
          </div>

          <hr className="text-gray-200" />

          <div className="overflow-x-auto">
            {/* Table */}
            <Table className="shadow-md overflow-x-auto">
              <TableHeader
                columns={[
                  "Recipient",
                  "Location",
                  "Blood Group",
                  "Date",
                  "Time",
                  "Status",
                  "Donor Info",
                  "Action",
                ]}
              />

              <tbody>
                {recentRequests.length === 0 ? (
                  <tr>
                    <td
                      colSpan="8"
                      className="text-center text-lg text-primary font-semibold py-10"
                    >
                      No Donation Requests Found
                    </td>
                  </tr>
                ) : (
                  recentRequests.map((request) => (
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

                      <td>
                        {request.requestStatus === "inprogress" ? (
                          <div>
                            <p>{request.donorName}</p>
                            <p className="text-xs">{request.donorEmail}</p>
                          </div>
                        ) : (
                          "- - -"
                        )}
                      </td>

                      <td>
                        <div className="dropdown dropdown-end">
                          <label tabIndex={0} className="btn btn-ghost btn-sm">
                            <HiDotsVertical className="text-lg" />
                          </label>

                          <div className="dropdown-content bg-base-100 shadow rounded-xl p-3 w-36">
                            <div className="flex flex-col gap-1">
                              <button
                                onClick={() =>
                                  navigate(
                                    `/dashboard/donation-requests/${request._id}`,
                                  )
                                }
                                className="btn btn-sm custom-btn-outline"
                              >
                                View
                              </button>
                              {request.requestStatus === "pending" && (
                                <>
                                  <button
                                    onClick={() =>
                                      navigate(
                                        `/dashboard/donation-requests/${request._id}`,
                                      )
                                    }
                                    className="btn btn-sm btn-outline btn-info hover:text-white rounded-xl"
                                  >
                                    Edit
                                  </button>
                                  <button
                                    onClick={() => handleDelete(request._id)}
                                    className="btn btn-sm custom-btn-primary"
                                  >
                                    Delete
                                  </button>
                                </>
                              )}
                              {request.requestStatus === "inprogress" && (
                                <>
                                  <button
                                    onClick={() =>
                                      handleStatusUpdate(request._id, "done")
                                    }
                                    className="btn btn-sm btn-outline btn-success hover:text-white rounded-xl"
                                  >
                                    Done
                                  </button>

                                  <button
                                    onClick={() =>
                                      handleStatusUpdate(
                                        request._id,
                                        "canceled",
                                      )
                                    }
                                    className="btn btn-sm btn-outline btn-warning hover:text-white rounded-xl"
                                  >
                                    Cancel
                                  </button>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </Table>
          </div>
        </div>
      )}
    </div>
  );
};

export default DonorDashboardHome;
