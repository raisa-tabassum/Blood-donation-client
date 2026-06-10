import { useState } from "react";
import { FaFilter } from "react-icons/fa";
import Table from "../../../components/ui/Table/Table";
import TableHeader from "../../../components/ui/Table/TableHeader";

const MyDonationRequests = () => {
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

        <div className="flex items-center gap-2">
          <FaFilter className="text-primary" />

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="select select-bordered rounded-xl"
          >
            <option>All Status</option>
            <option>Pending</option>
            <option>Inprogress</option>
            <option>Done</option>
            <option>Canceled</option>
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
              <td>
                <span className={getStatusClass(request.status)}>
                  {request.status}
                </span>
              </td>
              <td>
                <button className="btn btn-sm custom-btn-outline">View</button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default MyDonationRequests;
