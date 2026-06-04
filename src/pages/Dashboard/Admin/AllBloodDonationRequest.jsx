import { FaEye, FaEdit, FaTrash, FaFilter } from "react-icons/fa";

const AllBloodDonationRequest = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h2 className="heading-font text-3xl font-bold text-accent">
          All Blood Donation Requests
        </h2>

        <div className="flex items-center gap-2">
          <FaFilter className="text-primary" />

          <select className="select select-bordered rounded-xl">
            <option>All Status</option>
            <option>Pending</option>
            <option>Inprogress</option>
            <option>Done</option>
            <option>Canceled</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-2xl shadow">
        <table className="table">
          <thead>
            <tr className="text-primary">
              <th>Recipient</th>
              <th>Location</th>
              <th>Blood Group</th>
              <th>Date</th>
              <th>Time</th>
              <th>Status</th>
              <th>Requester</th>
              <th>Actions</th>
            </tr>
          </thead>

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
                <span className="badge badge-warning">Pending</span>
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
                <span className="badge badge-success">Done</span>
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
        </table>
      </div>
    </div>
  );
};

export default AllBloodDonationRequest;
