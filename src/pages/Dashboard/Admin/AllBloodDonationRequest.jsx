import { useState } from "react";
import { FaEye, FaEdit, FaTrash, FaFilter } from "react-icons/fa";
import Table from "../../../components/ui/Table/Table";
import TableHeader from "../../../components/ui/Table/TableHeader";

const AllBloodDonationRequest = () => {
  // const getStatusClass = (status) => {
  //   switch (status) {
  //     case "pending":
  //       return "badge badge-warning text-white";

  //     case "inprogress":
  //       return "badge badge-info text-white";

  //     case "done":
  //       return "badge badge-success text-white";

  //     case "canceled":
  //       return "badge badge-error text-white";

  //     default:
  //       return "badge";
  //   }
  // };
  // const [status, setStatus] = useState("");

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
            // value={status}
            // onChange={(e) => setStatus(e.target.value)}
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
      <Table className="overflow-x-auto shadow-md">
        <TableHeader
          columns={["Recipient", "Location", "Blood Group", "Date", "Time", "Status" ," Requester", "Actions"]}
        />
        <tbody>
          <tr>
            <td>Rahim Uddin</td>
            <td>Dhaka, Dhamrai</td>
            <td>
              <span className="badge badge-error text-white">A+</span>
            </td>
            <td>15 Jun 2026</td>
            <td>10:30 AM</td>

            <td>
              {/* <span className={getStatusClass(request.status)}>
                  {request.status}
                </span> */}
              <span className="badge badge-warning text-white">Pending</span>
            </td>

            <td>Raisa Tabassum</td>

            <td>
              <div className="flex gap-2">
                <button className="btn btn-sm btn-info text-white">
                  <FaEye />
                </button>

                <button className="btn btn-sm btn-warning text-white">
                  <FaEdit />
                </button>

                <button className="btn btn-sm btn-error text-white">
                  <FaTrash />
                </button>
              </div>
            </td>
          </tr>

          <tr>
            <td>Karim Hasan</td>
            <td>Gazipur, Kaliganj</td>

            <td>
              <span className="badge badge-error text-white">O+</span>
            </td>

            <td>18 Jun 2026</td>
            <td>03:00 PM</td>

            <td>
              <span className="badge badge-success text-white">Done</span>
            </td>

            <td>Nusrat Jahan</td>

            <td>
              <div className="flex gap-2">
                <button className="btn btn-sm btn-info text-white">
                  <FaEye />
                </button>

                <button className="btn btn-sm btn-warning text-white">
                  <FaEdit />
                </button>

                <button className="btn btn-sm btn-error text-white">
                  <FaTrash />
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default AllBloodDonationRequest;
