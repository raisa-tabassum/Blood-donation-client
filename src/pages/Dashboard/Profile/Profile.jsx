import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { inputClass, selectClass } from "../../../styles/formStyles";
import useLocationData from "../../../hooks/useLocationData";

const Profile = () => {
  const { user } = useAuth();
  const [editMode, setEditMode] = useState(false);
  const axiosSecure = useAxiosSecure();

  const { data: dbUser = {}, refetch } = useQuery({
    queryKey: ["user", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}`);
      return res.data;
    },
  });

  // form state add
  const [formData, setFormData] = useState({
    name: "",
    bloodGroup: "",
    district: "",
    upazila: "",
    avatar: "",
  });
  // db data state
  useEffect(() => {
    if (dbUser?._id) {
      setFormData({
        name: dbUser?.name || "",
        bloodGroup: dbUser?.bloodGroup || "",
        district: dbUser?.district || "",
        upazila: dbUser?.upazila || "",
        avatar: dbUser?.avatar || "",
      });
    }
  }, [dbUser]);

  // common input handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // save handler add
  const handleSave = async () => {
    try {
      await axiosSecure.patch(`/users/${dbUser._id}`, formData);

      refetch();
      setEditMode(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-md p-6 md:p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="heading-font text-2xl md:text-3xl font-bold text-accent">
            My Profile
          </h2>
          <button
            onClick={editMode ? handleSave : () => setEditMode(true)}
            className="custom-btn-primary"
          >
            {editMode ? "Save Changes" : "Edit Profile"}
          </button>
        </div>

        {/* Avatar */}
        <div className="flex flex-col items-center mb-8">
          <img
            src={dbUser?.avatar}
            alt={dbUser?.name}
            className="w-32 h-32 rounded-full border-4 border-primary object-cover"
          />

          <h3 className="mt-4 text-xl font-bold text-accent">{dbUser?.name}</h3>
        </div>

        {/* Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <label className="label text-accent">
              <span className="font-medium">Name</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              defaultValue={dbUser?.name}
              disabled={!editMode}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          <div>
            <label className="label text-accent">
              <span className="font-medium">Email</span>
            </label>
            <input
              type="email"
              defaultValue={dbUser?.email}
              disabled
              className={inputClass}
            />
          </div>

          <div>
            <label className="label text-accent">
              <span className="font-medium">Blood Group</span>
            </label>

            <select
              defaultValue={dbUser?.bloodGroup}
              name="bloodGroup"
              value={formData.bloodGroup}
              disabled={!editMode}
              onChange={handleChange}
              className={selectClass}
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
            <label className="label text-accent">
              <span className="font-medium">District</span>
            </label>
            <input
              type="text"
              defaultValue="Dhaka"
              disabled={!editMode}
              className={inputClass}
            />
          </div>

          <div>
            <label className="label text-accent">
              <span className="font-medium">Upazila</span>
            </label>
            <input
              type="text"
              defaultValue="Munshiganj"
              disabled={!editMode}
              className={inputClass}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
