import { useState } from "react";

const MyDonationRequests = () => {
  const getStatusClass = (status) => {
    switch (status) {
      case "pending":
        return "badge badge-warning";

      case "inprogress":
        return "badge badge-info";

      case "done":
        return "badge badge-success";

      case "canceled":
        return "badge badge-error";

      default:
        return "badge";
    }
  };
  const [status, setStatus] = useState("");

  const requests = [
    {
      id: 1,
      recipient: "Rahim Uddin",
      location: "Dhaka, Dhamrai",
      bloodGroup: "A+",
      date: "10 June 2026",
      status: "pending",
    },
    {
      id: 2,
      recipient: "Karim Hasan",
      location: "Gazipur, Kaliganj",
      bloodGroup: "B+",
      date: "15 June 2026",
      status: "done",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <h2 className="heading-font text-2xl md:text-3xl font-bold text-accent">
          My Donation Requests
        </h2>

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="select select-bordered w-full md:w-56 rounded-xl"
        >
          <option value="">All Status</option>
          <option value="pending">Pending</option>
          <option value="inprogress">In Progress</option>
          <option value="done">Done</option>
          <option value="canceled">Canceled</option>
        </select>
      </div>
      <div className="bg-white rounded-2xl shadow-md p-6">
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr className="text-primary">
                <th>Recipient</th>
                <th>Location</th>
                <th>Blood Group</th>
                <th>Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {requests.map((request) => (
                <tr key={request.id}>
                  <td>{request.recipient}</td>

                  <td>{request.location}</td>

                  <td>{request.bloodGroup}</td>

                  <td>{request.date}</td>

                  <td>
                    <span className={getStatusClass(request.status)}>
                      {request.status}
                    </span>
                  </td>

                  <td>
                    <button className="btn btn-sm btn-outline btn-primary">
                      View Details
                    </button>
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

export default MyDonationRequests;
