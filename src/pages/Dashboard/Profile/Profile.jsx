import { useState } from "react";

const Profile = () => {
  const [editMode, setEditMode] = useState(false);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-md p-6 md:p-8">

        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="heading-font text-2xl md:text-3xl font-bold text-accent">
            My Profile
          </h2>
          <button
            onClick={() => setEditMode(!editMode)}
            className="custom-btn-primary"
          >
            {editMode ? "Save Changes" : "Edit Profile"}
          </button>
        </div>

        {/* Avatar */}
        <div className="flex flex-col items-center mb-8">
          <img
            src="https://i.pravatar.cc/200"
            alt="Profile"
            className="w-32 h-32 rounded-full border-4 border-primary object-cover"
          />
          <h3 className="mt-4 text-xl font-bold text-accent">
            Raisa Tabassum
          </h3>
        </div>

        {/* Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

          <div>
            <label className="label">
              <span className="font-medium">Name</span>
            </label>
            <input
              type="text"
              defaultValue="Raisa Tabassum"
              disabled={!editMode}
              className="input input-bordered w-full"
            />
          </div>

          <div>
            <label className="label">
              <span className="font-medium">Email</span>
            </label>
            <input
              type="email"
              defaultValue="raisa@gmail.com"
              disabled
              className="input input-bordered w-full bg-base-200"
            />
          </div>

          <div>
            <label className="label">
              <span className="font-medium">Blood Group</span>
            </label>

            <select
              disabled={!editMode}
              className="select select-bordered w-full"
            >
              <option>A+</option>
              <option>A-</option>
              <option>B+</option>
              <option>B-</option>
              <option>AB+</option>
              <option>AB-</option>
              <option>O+</option>
              <option>O-</option>
            </select>
          </div>

          <div>
            <label className="label">
              <span className="font-medium">District</span>
            </label>
            <input
              type="text"
              defaultValue="Dhaka"
              disabled={!editMode}
              className="input input-bordered w-full"
            />
          </div>

          <div>
            <label className="label">
              <span className="font-medium">Upazila</span>
            </label>
            <input
              type="text"
              defaultValue="Munshiganj"
              disabled={!editMode}
              className="input input-bordered w-full"
            />
          </div>

        </div>
      </div>
    </div>
  );
};

export default Profile;