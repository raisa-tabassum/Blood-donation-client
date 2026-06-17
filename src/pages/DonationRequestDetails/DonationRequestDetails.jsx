import React, { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useForm } from "react-hook-form";
import {
  inputClass,
  selectClass,
  textareaClass,
} from "../../styles/formStyles";
import useAuth from "../../hooks/useAuth";

const DonationRequestDetails = () => {
  const { user } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const [isEditing, setIsEditing] = useState(false);
  const { register, handleSubmit } = useForm();

  const {
    data: request = {},
    refetch,
    isPending,
  } = useQuery({
    queryKey: ["donation-request", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/donation-requests/${id}`);
      return res.data;
    },
  });

  const isOwner = user?.email === request.requesterEmail;

  const getStatusClass = (status) => {
    switch (status) {
      case "pending":
        return "badge badge-warning text-white";

      case "inprogress":
        return "badge badge-info text-white";

      case "done":
        return "badge badge-success text-white";

      case "canceled":
        return "badge badge-error text-white";

      default:
        return "badge";
    }
  };

  const handleDonate = async () => {
    const result = await Swal.fire({
      title: "Donate Blood?",
      text: "Are you sure you want to donate blood for this request?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Donate",
    });

    if (!result.isConfirmed) return;
    const res = await axiosSecure.patch(`/donation-requests/donate/${id}`);
    // console.log(res.data);
    if (res.data.modifiedCount) {
      Swal.fire({
        icon: "success",
        title: "Donation Confirmed",
        timer: 1500,
        showConfirmButton: false,
      });
      refetch();
    }
  };

  const handleStatusUpdate = async (status) => {
    const res = await axiosSecure.patch(`/donation-requests/status/${id}`, {
      status,
    });

    if (res.data.modifiedCount) {
      Swal.fire({
        icon: "success",
        title: `Request ${status}`,
        timer: 1500,
        showConfirmButton: false,
      });
      refetch();
    }
  };

  const handleDelete = async () => {
    const result = await Swal.fire({
      title: "Delete Request?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
    });

    if (!result.isConfirmed) return;

    const res = await axiosSecure.delete(`/donation-requests/${id}`);

    if (res.data.deletedCount) {
      Swal.fire({
        icon: "success",
        title: "Request Deleted Successfully",
        timer: 1500,
        showConfirmButton: false,
      });

      navigate("/dashboard/my-donation-request");
    }
  };

  const handleUpdate = async (data) => {
    const res = await axiosSecure.patch(`/donation-requests/${id}`, data);
    if (res.data.modifiedCount) {
      Swal.fire({
        icon: "success",
        title: "Request Updated Successfully",
        timer: 1500,
        showConfirmButton: false,
      });
      setIsEditing(false);
      refetch();
    }
  };

  if (isPending) {
    return (
      <div className="flex justify-center py-20">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h2 className="heading-font text-3xl font-bold text-accent">
          Donation Request Details
        </h2>

        <p className="text-neutral mt-2">
          View complete information about this blood donation request.
        </p>
      </div>

      {/* Main Card */}
      <form
        onSubmit={handleSubmit(handleUpdate)}
        className="bg-base-100 rounded-2xl shadow-md p-8 border border-base-300"
      >
        {/* Status */}
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-accent text-xl font-semibold">
            Request Information
          </h3>

          <span className={getStatusClass(request.requestStatus)}>
            {request.requestStatus}
          </span>
        </div>

        {/* Info Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <p className="text-neutral font-medium">Requester Name</p>

            <p className="font-semibold text-accent">{request.requesterName}</p>
          </div>

          <div>
            <p className="text-neutral font-medium">Requester Email</p>

            <p className="font-semibold text-accent">
              {request.requesterEmail}
            </p>
          </div>

          <div>
            <label className="label">
              <span className="font-medium">Recipient Name</span>
            </label>

            <input
              type="text"
              placeholder="Recipient Name"
              {...register("recipientName", {
                required: "Recipient Name is required",
              })}
              defaultValue={request.recipientName}
              readOnly={!isEditing}
              className={inputClass}
            />
          </div>

          <div>
            <label className="label">
              <span className="font-medium">Blood Group</span>
            </label>

            <select
              {...register("bloodGroup", {
                required: "Blood group is required",
              })}
              defaultValue={request.bloodGroup}
              disabled={!isEditing}
              className={selectClass}
            >
              <option value="" disabled>
                Select Blood Group
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
          </div>

          <div>
            <label className="label">
              <span className="font-medium">District</span>
            </label>

            <select
              {...register("district", {
                required: "District is required",
              })}
              defaultValue={request.district}
              disabled={!isEditing}
              className={selectClass}
            >
              <option value="" disabled>
                Select District
              </option>
              <option value="Dhaka">Dhaka</option>
              <option>Gazipur</option>
              <option>Tangail</option>
            </select>
          </div>

          <div>
            <label className="label">
              <span className="font-medium">Upazila</span>
            </label>

            <select
              {...register("upazila", {
                required: "Upazila Name is required",
              })}
              defaultValue={request.upazila}
              disabled={!isEditing}
              className={selectClass}
            >
              <option value="" disabled>
                Select Upazila
              </option>
              <option value="Dhamrai">Dhamrai</option>
              <option>Savar</option>
              <option>Kaliganj</option>
            </select>
          </div>

          <div>
            <label className="label">
              <span className="font-medium">Hospital Name</span>
            </label>

            <input
              {...register("hospitalName", {
                required: "Hospital Name is required",
              })}
              defaultValue={request.hospitalName}
              readOnly={!isEditing}
              className={inputClass}
            />
          </div>

          <div>
            <label className="label">
              <span className="font-medium">Donation Date</span>
            </label>
            <input
              type="date"
              min={new Date().toISOString().split("T")[0]}
              {...register("donationDate", {
                required: "Donation Date is required",
              })}
              defaultValue={request.donationDate}
              readOnly={!isEditing}
              className={inputClass}
            />
          </div>

          <div>
            <label className="label">
              <span className="font-medium">Donation Time</span>
            </label>
            <input
              type="time"
              {...register("donationTime", {
                required: "Donation Time is required",
              })}
              defaultValue={request.donationTime}
              readOnly={!isEditing}
              className={inputClass}
            />
          </div>

          <div>
            <p className="text-sm text-neutral">Donor</p>

            <p className="font-semibold text-accent my-3">
              {request.donorName || "Not Assigned Yet"}
            </p>
          </div>
        </div>

        {/* Address */}
        <div className="mt-4">
          <label className="label">
            <span className="font-medium">Full Address</span>
          </label>

          <input
            {...register("fullAddress", {
              required: "Full Address is required",
            })}
            defaultValue={request.fullAddress}
            readOnly={!isEditing}
            className={inputClass}
          />
        </div>

        {/* Message */}
        <div className="mt-4">
          <label className="label">
            <span className="font-medium">Request Message</span>
          </label>

          <textarea
            rows="5"
            {...register("requestMessage", {
              required: "Request Message is required",
            })}
            defaultValue={request.requestMessage}
            readOnly={!isEditing}
            className={textareaClass}
          />
        </div>

        {/* Action Buttons */}
        {/* Pending & Not Owner */}
        {request.requestStatus === "pending" && !isOwner && (
          <div className="mt-8">
            <button
              type="button"
              onClick={handleDonate}
              className="custom-btn-primary"
            >
              Donate
            </button>
          </div>
        )}

        {/* Pending & Owner */}
        {!isEditing && request.requestStatus === "pending" && isOwner && (
          <div className="flex gap-3 mt-8">
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="btn custom-btn-outline"
            >
              Edit
            </button>

            <button
              type="button"
              onClick={handleDelete}
              className="btn custom-btn-primary"
            >
              Delete
            </button>
          </div>
        )}
        {isEditing && (
          <div className="flex gap-3 mt-8">
            <button type="submit" className="custom-btn-primary">
              Save Changes
            </button>

            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="btn custom-btn-outline"
            >
              Cancel
            </button>
          </div>
        )}
        {/* Inprogress & Owner */}
        {request.requestStatus === "inprogress" && isOwner && (
          <div className="flex gap-3 mt-10">
            <button
              type="button"
              onClick={() => handleStatusUpdate("done")}
              className="btn btn-success text-white"
            >
              Mark As Done
            </button>

            <button
              type="button"
              onClick={() => handleStatusUpdate("canceled")}
              className="btn btn-warning"
            >
              Cancel
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default DonationRequestDetails;
