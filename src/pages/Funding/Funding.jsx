import React from "react";
import { BiDonateHeart } from "react-icons/bi";
import Table from "../../components/ui/Table/Table";
import TableHeader from "../../components/ui/Table/TableHeader";

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

        <button className="custom-btn-primary flex items-center gap-2">
          <BiDonateHeart />
          Give Fund
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto shadow-md">
        <Table>
          <TableHeader columns={["No", "Name", "Amount", "Date"]} />
          <tbody>
            {funds.map((f, i) => (
              <tr key={f.id}>
                <td>{i + 1}</td>
                <td>{f.name}</td>
                <td className="text-primary font-semibold">৳ {f.amount}</td>
                <td>{f.date}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default Funding;
