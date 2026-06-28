import React, { useState } from "react";
import { BiDonateHeart } from "react-icons/bi";
import Table from "../../components/ui/Table/Table";
import TableHeader from "../../components/ui/Table/TableHeader";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

const Funding = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [amount, setAmount] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const { data = {} } = useQuery({
    queryKey: ["fundings", currentPage],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/fundings?page=${currentPage}&limit=${itemsPerPage}`,
      );
      return res.data;
    },
  });
  const funds = data.funds || [];
  const totalPages = data.totalPages || 1;

  const handleGiveFund = async () => {
    if (!amount || amount < 50) {
      Swal.fire({
        icon: "warning",
        title: "Invalid Amount",
        text: "Minimum funding amount is ৳50",
      });
      return;
    }

    const fundInfo = {
      amount: Number(amount),
      donorName: user?.displayName,
    };

    const res = await axiosSecure.post("/funding-checkout-session", fundInfo);

    setIsModalOpen(false);
    window.location.href = res.data.url;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
        <div>
          <h2 className="heading-font text-3xl font-bold text-accent text-center md:text-start">
            Funding
          </h2>
          <p className="text-gray-500 mt-1">
            Support BloodConnect by contributing funds.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)} // CHANGED
          className="custom-btn-primary flex items-center gap-2"
        >
          <BiDonateHeart />
          Give Fund
        </button>
      </div>

      {/* Table */}
      <div>
      <Table className="overflow-x-auto shadow-md">
          <TableHeader columns={["No", "Name", "Amount", "Date"]} />
          <tbody>
            {funds.map((f, i) => (
              <tr key={f._id}>
                <td>{i + 1}</td>
                <td>{f.donorName}</td>
                <td className="text-primary font-semibold">৳ {f.amount}</td>
                <td>{new Date(f.fundedAt).toLocaleDateString()}</td>
              </tr>
            ))}
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

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl w-[400px]">
            <h2 className="text-xl font-bold mb-4 text-accent">Give Funding</h2>

            <input
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full border border-primary p-3 rounded-lg mb-4"
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsModalOpen(false)}
                className="custom-btn-outline"
              >
                Cancel
              </button>

              <button onClick={handleGiveFund} className="custom-btn-primary">
                Pay Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Funding;
