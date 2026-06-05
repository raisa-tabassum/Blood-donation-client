import { useState } from "react";
import useAuth from "../../../hooks/useAuth";

const Profile = () => {
  const { user } = useAuth();
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
            src={user?.photoURL}
            alt={user?.displayName}
            className="w-32 h-32 rounded-full border-4 border-primary object-cover"
          />

          <h3 className="mt-4 text-xl font-bold text-accent">
            {user?.displayName}
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
              defaultValue={user?.displayName}
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
              defaultValue={user?.email}
              disabled
              className="input input-bordered w-full bg-base-200"
            />
          </div>

          <div>
            <label className="label">
              <span className="font-medium">Blood Group</span>
            </label>

            <select
              defaultValue={user?.bloodGroup}
              disabled={!editMode}
              className="select select-bordered w-full"
            >
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
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
