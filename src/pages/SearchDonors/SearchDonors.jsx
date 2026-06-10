import React from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaDroplet } from "react-icons/fa6";
import Card from "../../components/shared/Card/Card";

const SearchDonors = () => {
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
      <div className="bg-white shadow-lg rounded-2xl p-6 md:p-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Blood Group */}
          <select className="select select-bordered rounded-2xl w-full">
            <option disabled selected>
              Blood Group
            </option>
            <option>A+</option>
            <option>A-</option>
            <option>B+</option>
            <option>B-</option>
            <option>AB+</option>
            <option>AB-</option>
            <option>O+</option>
            <option>O-</option>
          </select>

          {/* District */}
          <select className="select select-bordered rounded-2xl w-full">
            <option disabled selected>
              District
            </option>
            <option>Dhaka</option>
            <option>Gazipur</option>
            <option>Tangail</option>
          </select>

          {/* Upazila */}
          <select className="select select-bordered rounded-2xl w-full">
            <option disabled selected>
              Upazila
            </option>
            <option>Dhamrai</option>
            <option>Savar</option>
            <option>Kaliganj</option>
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
          <Card>
              <img
                src="https://i.pravatar.cc/150?img=12"
                alt="donor"
                className="w-20 h-20 rounded-full mx-auto"
              />

              <h4 className="text-xl font-bold text-center mt-4">John Doe</h4>

              <div className="mt-4 space-y-2 text-neutral">
                <div className="flex items-center gap-2">
                  <FaDroplet className="text-primary" />
                  <span>Blood Group: A+</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaMapMarkerAlt className="text-primary" />
                  <span>Dhaka, Dhamrai</span>
                </div>
              </div>

              <button className="custom-btn-primary mt-5 w-full">
                View Profile
              </button>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SearchDonors;
