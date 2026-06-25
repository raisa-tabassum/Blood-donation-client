import React, { useState } from "react";
import {
  inputClass,
  selectClass,
  textareaClass,
} from "../../../styles/formStyles";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import useLocationData from "../../../hooks/useLocationData";

const CreateDonationRequest = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { districts, upazilas } = useLocationData();

  const { data: dbUser = {} } = useQuery({
    queryKey: ["user", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}`);
      return res.data;
    },
  });

  const handleRequest = async (data) => {
    console.log(data);

    const donationRequest = {
      requesterName: dbUser.name,

      recipientName: data.recipientName,
      district: data.district,
      upazila: data.upazila,
      hospitalName: data.hospitalName,
      fullAddress: data.fullAddress,
      bloodGroup: data.bloodGroup,
      donationDate: data.donationDate,
      donationTime: data.donationTime,
      requestMessage: data.requestMessage,

      donorName: null,
      donorEmail: null,
    };

    const result = await Swal.fire({
      title: "Create Donation Request?",
      text: "Please confirm your request",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Create",
    });

    if (!result.isConfirmed) return;

    const res = await axiosSecure.post("/donation-requests", donationRequest);

    if (res.data.insertedId) {
      reset();
      Swal.fire({
        icon: "success",
        title: "Donation Request Created Successfully",
        timer: 1500,
        showConfirmButton: false,
      });
      navigate("/dashboard/my-donation-request");
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="bg-white shadow-md rounded-2xl p-6 md:p-8">
        {/* Heading */}
        <div className="mb-8">
          <h2 className="heading-font text-3xl font-bold text-accent">
            Create Donation Request
          </h2>

          <p className="text-neutral mt-2">
            Fill out the information to create a blood donation request.
          </p>
        </div>

        <form onSubmit={handleSubmit(handleRequest)} className="space-y-4">
          {/* Requester Info */}
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <label className="label">
                <span className="font-medium">Requester Name</span>
              </label>

              <input
                type="text"
                value={dbUser?.name}
                readOnly
                className={inputClass}
              />
            </div>

            <div>
              <label className="label">
                <span className="font-medium">Requester Email</span>
              </label>

              <input
                type="email"
                value={dbUser?.email}
                readOnly
                className={inputClass}
              />
            </div>
          </div>

          {/* Recipient */}
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
              className={inputClass}
            />
            {errors.recipientName && (
              <p className="text-primary text-sm">
                {errors.recipientName.message}
              </p>
            )}
          </div>

          {/* District + Upazila */}
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <label className="label">
                <span className="font-medium">District</span>
              </label>

              <select
                defaultValue=""
                {...register("district", {
                  required: "District is required",
                })}
                className={selectClass}
              >
                <option value="" disabled>
                  Select District
                </option>
                {districts.map((district) => (
                  <option key={district.id} value={district.id}>
                    {district.name}
                  </option>
                ))}
              </select>
              {errors.district && (
                <p className="text-primary text-sm">
                  {errors.district.message}
                </p>
              )}
            </div>

            <div>
              <label className="label">
                <span className="font-medium">Upazila</span>
              </label>

              <select
                defaultValue=""
                {...register("upazila", {
                  required: "Upazila Name is required",
                })}
                className={selectClass}
              >
                <option value="" disabled>
                  Select Upazila
                </option>
                {upazilas.map((upazila) => (
                  <option key={upazila.id} value={upazila.name}>
                    {upazila.name}
                  </option>
                ))}
              </select>
              {errors.upazila && (
                <p className="text-primary text-sm">{errors.upazila.message}</p>
              )}
            </div>
          </div>

          {/* Hospital */}
          <div>
            <label className="label">
              <span className="font-medium">Hospital Name</span>
            </label>

            <input
              {...register("hospitalName", {
                required: "Hospital Name is required",
              })}
              className={inputClass}
            />
            {errors.hospitalName && (
              <p className="text-primary text-sm">
                {errors.hospitalName.message}
              </p>
            )}
          </div>

          {/* Address */}
          <div>
            <label className="label">
              <span className="font-medium">Full Address</span>
            </label>

            <input
              {...register("fullAddress", {
                required: "Full Address is required",
              })}
              className={inputClass}
            />
            {errors.fullAddress && (
              <p className="text-primary text-sm">
                {errors.fullAddress.message}
              </p>
            )}
          </div>

          {/* Blood Group + Date */}
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <label className="label">
                <span className="font-medium">Blood Group</span>
              </label>

              <select
                defaultValue=""
                {...register("bloodGroup", {
                  required: "Blood group is required",
                })}
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
              {errors.bloodGroup && (
                <p className="text-primary text-sm">
                  {errors.bloodGroup.message}
                </p>
              )}
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
                className={inputClass}
              />
              {errors.donationDate && (
                <p className="text-primary text-sm">
                  {errors.donationDate.message}
                </p>
              )}{" "}
            </div>
          </div>

          {/* Time */}
          <div>
            <label className="label">
              <span className="font-medium">Donation Time</span>
            </label>
            <input
              type="time"
              {...register("donationTime", {
                required: "Donation Time is required",
              })}
              className={inputClass}
            />
            {errors.donationTime && (
              <p className="text-primary text-sm">
                {errors.donationTime.message}
              </p>
            )}{" "}
          </div>

          {/* Message */}
          <div>
            <label className="label">
              <span className="font-medium">Request Message</span>
            </label>

            <textarea
              rows="5"
              {...register("requestMessage", {
                required: "Request Message is required",
              })}
              className={textareaClass}
            />
            {errors.requestMessage && (
              <p className="text-primary text-sm">
                {errors.requestMessage.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <button type="submit" className="custom-btn-primary w-full md:w-auto">
            Request Blood
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateDonationRequest;
