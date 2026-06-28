import React, { useState } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaDroplet } from "react-icons/fa6";
import Card from "../../components/shared/Card/Card";
import useLocationData from "../../hooks/useLocationData";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const SearchDonors = () => {
  const { districts, upazilas } = useLocationData();
  const axiosSecure = useAxiosSecure();

  const [bloodGroup, setBloodGroup] = useState("");
  const [district, setDistrict] = useState("");
  const [upazila, setUpazila] = useState("");

  const { data: donors = [], isPending } = useQuery({
    queryKey: ["search-donors", bloodGroup, district, upazila],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/search-donors?bloodGroup=${bloodGroup}&district=${district}&upazila=${upazila}`,
      );
      return res.data;
    },
  });
  if (isPending) {
    return (
      <div className="flex justify-center py-20">
        <span className="loading loading-spinner text-primary loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      {/* Heading */}
      <div className="text-center mb-10">
        <h2 className="heading-font text-3xl md:text-5xl font-bold text-accent">
          Find Blood Donors
        </h2>

        <p className="mt-4 text-neutral max-w-2xl mx-auto">
          Search verified blood donors by blood group, district, and upazila to
          quickly find the help you need.
        </p>
      </div>

      {/* Search Form */}
      <div className="bg-white shadow-md rounded-2xl p-6 md:p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Blood Group */}
          <select
            value={bloodGroup}
            onChange={(e) => setBloodGroup(e.target.value)}
            className="select select-bordered rounded-2xl w-full"
          >
            <option disabled selected>
              Blood Group
            </option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
          </select>

          {/* District */}
          <select
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
            className="select select-bordered rounded-2xl w-full"
          >
            <option value="" disabled selected>
              District
            </option>
            {districts.map((district) => (
              <option key={district.id} value={district.id}>
                {district.name}
              </option>
            ))}
          </select>

          {/* Upazila */}
          <select
            value={upazila}
            onChange={(e) => setUpazila(e.target.value)}
            className="select select-bordered rounded-2xl w-full"
          >
            <option value="" disabled selected>
              Upazila
            </option>
            {upazilas.map((upazila) => (
              <option key={upazila.id} value={upazila.name}>
                {upazila.name}
              </option>
            ))}
          </select>

          {/* Search Button */}
          <button className="custom-btn-primary">Search</button>
        </div>
      </div>

      {/* Results */}
      <div className="mt-12">
        <h3 className="heading-font text-accent text-2xl font-semibold mb-6">
          Search Results
        </h3>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Card */}
          {donors.length === 0 ? (
            <p className="text-lg text-primary font-semibold ">
              No donors found
            </p>
          ) : (
            donors.map((donor) => (
              <Card key={donor._id} className="max-w-sm">
                <img
                  src={donor.avatar}
                  alt={donor.name}
                  className="w-20 h-20 rounded-full mx-auto"
                />

                <h4 className="text-xl font-bold text-center text-accent mt-4">
                  {donor.name}
                </h4>

                <div className="mt-4 space-y-3 text-neutral">
                  <div className="flex items-center gap-2">
                    <FaDroplet className="text-primary" />
                    <span>Blood Group: {donor.bloodGroup}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <FaMapMarkerAlt className="text-primary" />
                    <span>
                      {donor.district}, {donor.upazila}
                    </span>
                  </div>
                </div>

                <button className="custom-btn-outline mt-5 w-full">
                  View Profile
                </button>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchDonors;
