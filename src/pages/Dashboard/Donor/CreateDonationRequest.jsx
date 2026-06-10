import React from "react";
import { inputClass, selectClass, textareaClass } from "../../../styles/formStyles";

const CreateDonationRequest = () => {
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

        <form className="space-y-4">
          {/* Requester Info */}
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <label className="label">
                <span className="font-medium">Requester Name</span>
              </label>

              <input
                type="text"
                value="Raisa Tabassum"
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
                value="raisa@gmail.com"
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
              className={inputClass}
            />
          </div>

          {/* District + Upazila */}
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <label className="label">
                <span className="font-medium">District</span>
              </label>

              <select className={selectClass}>
                <option disabled selected>
                  Select District
                </option>
                <option>Dhaka</option>
                <option>Gazipur</option>
                <option>Tangail</option>
              </select>
            </div>

            <div>
              <label className="label">
                <span className="font-medium">Upazila</span>
              </label>

              <select className={selectClass}>
                <option disabled selected>
                  Select Upazila
                </option>
                <option>Dhamrai</option>
                <option>Savar</option>
                <option>Kaliganj</option>
              </select>
            </div>
          </div>

          {/* Hospital */}
          <div>
            <label className="label">
              <span className="font-medium">Hospital Name</span>
            </label>

            <input
              type="text"
              placeholder="Dhaka Medical College Hospital"
              className={inputClass}
            />
          </div>

          {/* Address */}
          <div>
            <label className="label">
              <span className="font-medium">Full Address</span>
            </label>

            <input
              type="text"
              placeholder="Zahir Raihan Rd, Dhaka"
              className={inputClass}
            />
          </div>

          {/* Blood Group + Date */}
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <label className="label">
                <span className="font-medium">Blood Group</span>
              </label>

              <select className={selectClass}>
                <option disabled selected>
                  Select Blood Group
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
            </div>

            <div>
              <label className="label">
                <span className="font-medium">Donation Date</span>
              </label>

              <input type="date" className={inputClass} />
            </div>
          </div>

          {/* Time */}
          <div>
            <label className="label">
              <span className="font-medium">Donation Time</span>
            </label>

            <input type="time" className={inputClass} />
          </div>

          {/* Message */}
          <div>
            <label className="label">
              <span className="font-medium">Request Message</span>
            </label>

            <textarea
              rows="5"
              placeholder="Explain why blood is needed..."
              className={textareaClass}
            ></textarea>
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
