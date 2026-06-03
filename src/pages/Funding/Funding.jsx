import React from "react";
import { BiDonateHeart } from "react-icons/bi";

const Funding = () => {
  const funds = [
    {
      id: 1,
      name: "Raisa Tabassum",
      amount: 500,
      date: "05 Jun 2026",
    },
    {
      id: 2,
      name: "John Doe",
      amount: 1000,
      date: "03 Jun 2026",
    },
    {
      id: 3,
      name: "Sarah Khan",
      amount: 300,
      date: "01 Jun 2026",
    },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-md p-6">

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
        <div>
          <h2 className="heading-font text-3xl font-bold text-accent">
            Funding
          </h2>
          <p className="text-gray-500 mt-1">
            Support BloodConnect by contributing funds.
          </p>
        </div>

        <button className="custom-btn-primary flex items-center gap-2">
          <BiDonateHeart />
          Give Fund
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="table">

          <thead>
            <tr className="text-accent">
              <th>No.</th>
              <th>Donor Name</th>
              <th>Amount</th>
              <th>Funding Date</th>
            </tr>
          </thead>

          <tbody>
            {funds.map((fund, index) => (
              <tr key={fund.id}>
                <td>{index + 1}</td>
                <td>{fund.name}</td>
                <td>
                  <span className="font-semibold text-primary">
                    ৳ {fund.amount}
                  </span>
                </td>
                <td>{fund.date}</td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
};

export default Funding;